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

console.log(
  process.env.AWS_Access_Key!,
  process.env.AWS_Secret_Access_Key!,
  process.env.AWS_REGION!,
  "awkjaskjdn"
);
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // Create a temporary file to store the uploaded content
    const tempFilePath = path.join(
      process.cwd(),
      "uploads",
      `${Date.now()}-upload`
    );

    // Ensure uploads directory exists
    if (!fs.existsSync(path.dirname(tempFilePath))) {
      fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
    }

    // Stream request body to file
    const fileStream = fs.createWriteStream(tempFilePath);
    const reader = req.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fileStream.write(value);
    }
    fileStream.end();

    // Wait for file writing to complete
    await new Promise((resolve) => fileStream.on("finish", resolve));

    // Get original filename from Content-Disposition header
    const contentDisposition = req.headers.get("content-disposition");
    const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/i);
    const originalFilename = filenameMatch
      ? filenameMatch[1]
      : `upload-${Date.now()}`;

    // Upload file to S3
    const bucketName = process.env.AWS_BUCKET_NAME!;
    const objectKey = `resumes/${Date.now()}_${path.basename(
      originalFilename
    )}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: fs.createReadStream(tempFilePath),
      ContentType: "application/pdf",
    });

    await s3Client.send(command);

    // Generate S3 file URL
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;

    // Save file metadata to database
    await prisma.resume.create({
      data: {
        userId: "1", // Replace with actual user ID logic
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
