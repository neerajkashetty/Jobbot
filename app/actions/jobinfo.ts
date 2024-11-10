"use server";

import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export async function JobInformation(
  jobtitle: string,
  Skills: string,
  Firstname: string,
  Lastname: string
) {
  try {
    console.log(jobtitle);
    await client.jobInformation.create({
      data: {
        jobtitle,
        Skills,
        Firstname,
        Lastname,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
