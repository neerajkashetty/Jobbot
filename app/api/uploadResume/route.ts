import { NextRequest, NextResponse } from "next/server";
import { IncomingMessage } from "http";
import formidable from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert NextRequest to IncomingMessage
const convertNextRequest = (req: NextRequest): IncomingMessage => {
  // Create a custom Readable stream that mimics Socket interface
  const readableStream = new Readable({
    read() {
      req.body?.pipeTo(
        new WritableStream({
          write: (chunk) => {
            this.push(chunk);
          },
          close: () => {
            this.push(null);
          },
        })
      );
    },
  });

  // Create IncomingMessage with a dummy socket
  const incomingMessage = new IncomingMessage({
    // Provide minimal socket-like object to satisfy type requirements
    on: () => {},
    removeListener: () => {},
    end: () => {},
  } as any);

  incomingMessage.headers = Object.fromEntries(req.headers.entries());
  incomingMessage.method = req.method;
  incomingMessage.push = readableStream.push.bind(readableStream);
  incomingMessage.read = readableStream.read.bind(readableStream);

  return incomingMessage;
};
// Helper to parse form data using formidable
const parseForm = async (
  req: NextRequest
): Promise<{ fields: any; files: any }> => {
  const incomingMessage = convertNextRequest(req);
  const form = formidable({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(incomingMessage, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req);

    const file = files.file;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const tempFilePath = file.filepath;

    // Upload file to S3
    const bucketName = process.env.AWS_BUCKET_NAME!;
    const objectKey = `resumes/${Date.now()}_${path.basename(
      file.originalFilename
    )}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: fs.createReadStream(tempFilePath),
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    // Generate S3 file URL
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;

    // Save file metadata to database
    await prisma.resume.create({
      data: {
        userId: "1", // Replace with your user ID logic
        pdfUrl: fileUrl,
        jobTitle: "full",
      },
    });

    // Clean up temporary file
    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
