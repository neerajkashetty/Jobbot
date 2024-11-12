"use server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 4,
});

export interface ResumeParams {
  jobtitle: string;
  skills: string[];
  Firstname: string;
  Lastname: string;
  experience: string[];
  jobdescription: string;
}

export async function resume(resumeParams: ResumeParams) {
  const advancedprompt = `Generate a professional resume for the following job application . Use the provided job description, highlighted skills, and any relevant soft skills to create an impressive and customized resume.
                          Structure of the resume in JSON OBJECT where the keys should be like 
                         {
                          Summary: "",
                          Education: "" if more than one {
                          "",""
                          }
                          Experience: {
                          "", ""
                          }
                          etc...
                          }

                          Here are the key details:
                          Job Title: ${resumeParams.jobtitle}
                          Experience: ${resumeParams.experience}
                          Job Description: ${resumeParams.jobdescription}
                          Relevant Skills: ${
                            resumeParams.skills
                          } [List specific skills relevant to the job, e.g., JavaScript, leadership, critical thinking]
                          Soft Skills: [List soft skills like communication, teamwork, adaptability]
                          Certifications (optional): ${
                            resumeParams.experience
                              ? resumeParams.experience
                              : "List certifications, if any, e.g., AWS Certified, PMP, etc."
                          }
                          Name: ${resumeParams.Firstname} ${
    resumeParams.Lastname
  }

                          Focus on making the candidate’s profile match the job description. If certain certifications or skills aren’t explicitly listed, feel free to add plausible skills or achievements to make the candidate’s profile stronger for this role. Highlight each section, especially areas where the candidate's skills align closely with the job requirements.
                          Organize the resume in a clear format, including sections for Summary, Skills, Professional Experience, Education, Certifications, and any relevant accomplishments or projects.`;

  const chat = await client.chat.completions.create({
    temperature: 0.5,

    messages: [
      {
        role: "assistant",
        content:
          " You are a helful resume generator giving the JSON OBJECT as the output",
      },
      {
        role: "user",
        content: advancedprompt,
      },
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" },
  });
  console.log(chat.choices);
  return chat.choices;
}
