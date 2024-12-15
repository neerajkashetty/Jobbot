import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_Access_Key!,
    secretAccessKey: process.env.AWS_Secret_Access_Key!,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      return NextResponse.json(
        { error: "Boundary not found" },
        { status: 400 }
      );
    }

    const decoder = new TextDecoder();
    const reader = req.body!.getReader();

    let rawData = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      rawData += decoder.decode(value);
    }

    const parts = rawData.split(`--${boundary}`);
    let jobTitle = "";
    let fileData: Uint8Array | null = null;

    for (const part of parts) {
      if (part.includes("Content-Disposition")) {
        if (part.includes('name="jobtitle"')) {
          jobTitle = part.split("\r\n\r\n")[1]?.trim() || "";
        } else if (part.includes('name="file"')) {
          const fileStartIndex = part.indexOf("\r\n\r\n") + 4;
          const fileEndIndex = part.lastIndexOf("--") - 2;
          const fileContent = part.substring(fileStartIndex, fileEndIndex);
          fileData = new Uint8Array(Buffer.from(fileContent, "binary"));
        }
      }
    }

    if (!fileData) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const tempFilePath = path.join(
      process.cwd(),
      "uploads",
      `${Date.now()}-upload`
    );
    if (!fs.existsSync(path.dirname(tempFilePath))) {
      fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
    }

    fs.writeFileSync(tempFilePath, fileData);

    const bucketName = process.env.AWS_BUCKET_NAME!;
    const objectKey = `resumes/${Date.now()}_uploadedFile.pdf`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: fs.createReadStream(tempFilePath),
      ContentType: "application/pdf",
    });

    await s3Client.send(command);

    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;

    await prisma.resume.create({
      data: {
        userId: "1",
        pdfUrl: fileUrl,
        jobTitle,
      },
    });

    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
