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
    const tempFilePath = path.join(
      process.cwd(),
      "uploads",
      `${Date.now()}-upload`
    );

    const formData = await req.formData();

    const jobTitle = formData.get("jobTitle") as string;
    if (!fs.existsSync(path.dirname(tempFilePath))) {
      fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
    }

    const fileStream = fs.createWriteStream(tempFilePath);
    const reader = req.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fileStream.write(value);
    }
    fileStream.end();

    await new Promise((resolve) => fileStream.on("finish", resolve));

    const contentDisposition = req.headers.get("content-disposition");
    const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/i);
    const originalFilename = filenameMatch
      ? filenameMatch[1]
      : `upload-${Date.now()}`;

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

    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;

    await prisma.resume.create({
      data: {
        userId: "1",
        pdfUrl: fileUrl,
        jobTitle: "Full Stack Developer",
      },
    });

    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
