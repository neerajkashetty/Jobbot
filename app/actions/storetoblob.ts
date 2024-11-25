import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const db = new PrismaClient();

export async function saveResumePDF(
  pdfBlob: Blob,
  jobTitle: string,
  userId: string
) {
  try {
    // Upload PDF to storage
    const { url } = await put(`resumes/${Date.now()}.pdf`, pdfBlob, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Save to database
    const resume = await db.resume.create({
      data: {
        jobTitle,
        userId,
        pdfUrl: url,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getUserResumes(userId: string) {
  try {
    const resumes = await db.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return resumes;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw new Error("Failed to fetch resumes");
  }
}

export async function getResumeById(id: string) {
  try {
    const resume = await db.resume.findUnique({
      where: { id },
    });

    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }
}
