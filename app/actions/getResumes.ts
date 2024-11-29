"use server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getResumes(userid: string) {
  try {
    const resumes = await client.resume.findMany({
      where: { userId: userid },
    });
    console.log(resumes);
    return {
      success: true,
      resumes,
    };
  } catch (error) {
    console.error("Error Retrieving the Resumes", error);
  }
}
