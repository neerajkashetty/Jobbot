"use server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function checkdb(username: string) {
  const user = await client.personalDetails.findFirst({
    where: { firstname: username },
  });

  const eduction = await client.education.findMany({
    where: { username: username },
  });

  const experience = await client.experience.findMany({
    where: { username: username },
  });

  console.log(user, "sadsad");
  if (!user) {
    return {
      success: false,
    };
  }
  return {
    success: true,
    eduction,
    experience,
    user,
  };
}

export async function personalInfo(
  firstname: string,
  Lastname: string,
  phone: number,
  linkedin: string,
  location: string,
  github: string,
  education: object,
  username: string,
  title: string,
  company: string,
  description: string,
  Period: number
) {
  try {
    await client.personalDetails.create({
      data: {
        firstname,
        Lastname,
        linkedin,
        location,
        github,
        phone,
        education,
      },
    });

    await client.experience.create({
      data: {
        username,
        title,
        company,
        description,
        Period,
      },
    });

    return true;
  } catch (e) {
    return e;
  }
}
