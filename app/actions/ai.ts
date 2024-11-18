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
    
  
  **Important Instructions:**
  1. For **previous work experience**, include the **period** in the format: "Month Year to Month Year" (e.g., "Jul 2004 to Jan 2015"). If only the year is available, format it as "Year-Year" (e.g., "2004-2015").
  2. Ensure that the **skills** section is categorized as follows:
     - **Languages and Runtime Env:** List all programming languages, scripting languages, and runtime environments the candidate is proficient in (e.g., JavaScript, Python, Node.js, SQL, etc.).
     - **Frameworks and Packages:** Include all libraries, frameworks, and packages (e.g., React, Next.js, Redux, Tailwind CSS, etc.).
     - **Databases and Cloud:** List all database technologies and cloud platforms (e.g., MySQL, MongoDB, PostgreSQL, AWS S3, etc.).
     - **Other Technologies:** Include tools, methodologies, or technologies not covered in the above categories (e.g., Git, Docker, CI/CD, Agile, etc.).
  3. Provide the **description** for each job as bullet points, with at least **5 key points**. Highlight specific responsibilities, achievements, and skills relevant to the new job description provided above. Use metrics or outcomes wherever applicable.
  4. For the **Skills** section, ensure all items are extracted from the provided details, job description, and plausible technical proficiencies based on the candidate's profile.
  5. Generate Some Fake Experience with FAANG if the array only has one entry  
  
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
        "Description": [
          "- Developed web applications using React and Node.js.",
          "- Collaborated with cross-functional teams to deliver scalable solutions.",
          "- Reduced downtime by 30% through code optimization.",
          "- Implemented CI/CD pipelines, improving deployment efficiency by 40%.",
          "- Mentored junior developers and conducted code reviews."
        ],
        "Period": "Jul 2004 to Jan 2015"
      }
    ],
    "Skills": {
      "Languages and Runtime Env": ["JavaScript", "Python", "TypeScript", "PHP", "Node.js", "SQL", "GraphQL", "Shell Script"],
      "Frameworks and Packages": ["React", "Next.js", "jQuery", "Apollo Client", "Express.js", "Redux Toolkit", "HTML", "Tailwind CSS", "Jest"],
      "Databases and Cloud": ["MySQL", "MongoDB", "PostgreSQL", "Amazon Web Services (AWS S3, EC2, EB, Lambda)"],
      "Other Technologies": ["Git", "Linux", "Docker", "CI/CD", "Agile", "OOP", "SDLC", "Postman"]
    },
    "Certifications": [
      {
        "Name": "AWS Certified Solutions Architect",
        "Issuing Organization": "Amazon Web Services",
        "Year": "2022"
      }
    ],
    "Projects": [
      {
        "Project Title": "E-commerce Web Application",
        "Description": "Developed a full-stack e-commerce application using React, Node.js, and MongoDB. Integrated payment gateway and designed user-friendly interfaces.",
        "Technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe API"]
      }
    ]
  }
  
  Be sure to:
  1. Provide a professional summary that emphasizes key strengths and skills.
  2. Ensure each section is clear and well-structured.
  3. For experience and education, use the most relevant details to match the job title and description.
  4. If required, generate plausible project details, company names, or periods to make the resume appear complete and competitive.
  `;

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
