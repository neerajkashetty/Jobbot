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
  "Summary": "A brief professional summary highlighting key skills and experience.",
  "Education": [
    {
      "Degree": "Bachelor of Science in Computer Science",
      "Institution": "University Name",
      "Year": "2020 - 2024",
      "GPA": "3.8"
    }
  ],
  "Experience": [
    {
      "Job Title": "Senior Database Administrator",
      "Company": "ABC Corporation",
      "Duration": "2018 - Present",
      "Description": "Designed, developed, and implemented database solutions using Microsoft Dynamics, SQL Server, and ASP.NET. Configured and customized applications, including forms, charts, and dashboards. Collaborated with cross-functional teams to deliver high-quality solutions.",
      "Skills": ["Microsoft Dynamics", "SQL Server", "ASP.NET", "C#", "Azure DevOps", "Visual Studio"]
    },
    {
      "Job Title": "Database Administrator",
      "Company": "PQR Corporation",
      "Duration": "2015 - 2018",
      "Description": "Implemented and maintained database solutions using Microsoft Dynamics and SQL Server. Developed and deployed custom plugins and business rules. Utilized Azure DevOps and Visual Studio for development and deployment.",
      "Skills": ["Microsoft Dynamics", "SQL Server", "Azure DevOps", "Visual Studio"]
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
    },
    {
      "Name": "Microsoft Certified: Azure Administrator",
      "Issuing Organization": "Microsoft",
      "Year": "2021"
    }
  ],
  "Skills": [
    "Microsoft Dynamics",
    "SQL Server",
  
  ]
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
