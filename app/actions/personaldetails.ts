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
  education: any,
  username: string,
  title: string,
  company: string,
  description: string,
  Period: number
) {
  try {
    // Log all the incoming data
    console.log("Received data:");
    console.log({
      firstname,
      Lastname,
      phone,
      linkedin,
      location,
      github,
      education,
      username,
      title,
      company,
      description,
      Period,
    });

    console.log("Education type:", typeof education);
    console.log("Education data:", education);

    // Check if education is an array
    if (Array.isArray(education)) {
      console.log("Education array length:", education.length);
    } else {
      console.log("Education is not an array");
    }

    const response = await client.personalDetails.create({
      data: {
        firstname,
        Lastname,
        phone,
        linkedin,
        location,
        github,
        education,
      },
    });

    console.log("Personal details saved:", response);

    await client.experience.create({
      data: {
        username,
        title,
        company,
        description,
        Period,
      },
    });

    console.log("Experience saved");

    return true;
  } catch (e) {
    console.error("Error occurred:", e);
    return e;
  }
}
