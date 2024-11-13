"use server";
import Groq from "groq-sdk";
import { checkdb } from "./personaldetails";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();
  const username = session?.user?.name ?? "";

  const data = await checkdb(username);

  console.log(session?.user?.name);

  const Education = JSON.stringify(data.eduction);
  const PersonalDetails = data.user;
  const Experience = JSON.stringify(data.experience);

  console.log(Experience);

  const advancedPrompt = `
You are a helpful resume generator that creates a professional resume in JSON format. Based on the provided input, structure the resume into sections such as Summary, Education, Experience, Skills, Certifications, and Personal Details. The format should be clean, organized, and well-structured. Below are the details provided:

Job Title: ${resumeParams.jobtitle}
Job Description: ${resumeParams.jobdescription}
Relevant Skills: ${resumeParams.skills.join(", ")}
Experience: ${resumeParams.experience.join(", ")}

Here is the personal and education information:
- Personal Details: 
  - Name: ${resumeParams.Firstname} ${resumeParams.Lastname}
  - Location: ${data.user?.location}
  - LinkedIn: ${data.user?.linkedin}
  - GitHub: ${data.user?.github}
  - Phone: ${data.user?.phone}
  
- Education: 
  - Degree: ${Education}

- Professional Experience:
  - ${Experience}


**Important Instruction:**
1. For **previous work experience**, please keep the **company name** and **period** (duration) unchanged. Only modify the **description** of the job role to align with the **new job description** provided above. The description should reflect the responsibilities and skills needed for the new job title, while still being true to the nature of the role the candidate performed.
2. For each **job description**, ensure it highlights relevant **skills** and **achievements** that would make the candidate a great fit for the job they are applying for, while still reflecting the core responsibilities they performed in the previous role.


Format the resume as a JSON object with the following structure:
{
  "Summary": "A brief professional summary highlighting the key skills and experience based on the job description and the candidate's background.",
  "Education": [
    {
      "Degree": "Bachelor's in Computer Science",
      "University": "XYZ University",
      "Year": "2022",
      "CGPA": 3.8
    }
  ],
  "Experience": [
    {
      "Job Title": "Software Engineer",
      "Company": "if company is specified in the above details put it or leave empty",
      "Description": "Developed web applications using React and Node.js, collaborated with cross-functional teams to deliver scalable solutions.",
      "Period": "2021-2023"
    }
  ],
  "Projects": [
    {
      "Project Title": "E-commerce Web Application",
      "Description": "Developed a full-stack e-commerce application using React, Node.js, and MongoDB. Integrated payment gateway and designed user-friendly interfaces.",
      "Technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe API"]
    }
  ],
  "Certifications": [
    {
      "Name": "AWS Certified Solutions Architect",
      "Issuing Organization": "Amazon Web Services",
      "Year": "2022"
    }
  ],
  "Skills": [
    "JavaScript", "React", "Node.js", "MongoDB", "Git", "AWS", "Communication", "Teamwork"
  ]
}

Be sure to:
1. Provide a professional summary that emphasizes key strengths and skills.
2. Ensure each section is clear and well-structured.
3. For experience and education, use the most relevant details to match the job title and description.
4. Include soft skills such as communication, leadership, adaptability in the skills section.

If certain certifications or skills aren’t explicitly listed, feel free to add plausible skills or achievements that would strengthen the candidate's profile for this role. Aim to make the resume stand out in a competitive job market.`;

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
        content: advancedPrompt,
      },
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" },
  });
  console.log(chat.choices);
  return chat.choices;
}
