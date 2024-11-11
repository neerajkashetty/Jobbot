"use server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 4,
});

const userInput =
  "I have 5 years of experience in software development, with expertise in JavaScript and React.";
const prompt = `Generate a resume summary based on the following information: ${userInput}`;

export async function resume() {
  await client.chat.completions.create();
}
