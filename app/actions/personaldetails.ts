"use server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function checkdb(username: string) {
  const user = await client.personalDetails.findFirst({
    where: { firstname: username },
  });

  if (!user) {
    return false;
  }
  return true;
}

export async function personalInfo(
  firstname: string,
  Lastname: string,
  phone: number,
  linkedin: string,
  location: string,
  github: string
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
      },
    });
    return true;
  } catch (e) {
    return e;
  }
}
