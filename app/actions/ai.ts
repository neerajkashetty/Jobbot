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

  const Education = JSON.stringify(data?.eduction);
  const PersonalDetails = data.user;
  const Experience = JSON.stringify(data.experience);

  console.log(Experience);

  const advancedPrompt = `
  You are a helpful and professional resume generator that creates a detailed, structured resume in JSON format based on the provided inputs. Use the details below to populate sections like Summary, Education, Experience, Skills, Certifications, and Personal Details. Ensure the format is clean, professional, and tailored to the job description.
  
  ### Candidate's Information:
  - **Job Title:** ${resumeParams.jobtitle}
  - **Job Description:** ${resumeParams.jobdescription}
  - **Relevant Skills:** ${resumeParams.skills.join(", ")}
  - **Experience:** ${resumeParams.experience.join(", ")}
  - **Personal Details:**
    - Name: ${resumeParams.Firstname} ${resumeParams.Lastname}
    - Location: ${data.user?.location || "Location not provided"}
    - LinkedIn: ${data.user?.linkedin || "LinkedIn not provided"}
    - GitHub: ${data.user?.github || "GitHub not provided"}
    - Phone: ${data.user?.phone || "Phone not provided"}
  
  ### Instructions:
  1. **Summary**:
     - Write a concise, compelling summary of the candidate's experience, emphasizing key achievements, skills, and alignment with the provided job description.
     - Highlight the candidate's years of experience, expertise in relevant technologies, and soft skills if applicable.
  
  2. **Experience**:
     - Generate a list of roles and achievements, starting with their most recent experience.
     - If only one experience is provided, generate **additional plausible roles** with FAANG or top-tier companies to showcase diverse experience.
     - For each role:
       - Include **5-7 bullet points for each job** that combine:
         - Responsibilities and accomplishments from the candidate’s past experience.
         - New responsibilities that align with the job description.
       - Use measurable outcomes where possible (e.g., "Reduced downtime by 20%", "Increased system efficiency by 30%").
       - Format the period as "Month Year to Month Year" (e.g., "Jul 2015 to Jan 2020"). If not available, generate a realistic range.
  
  3. **Skills**:
     - Categorize into the following:
       - **Programming Languages**: Include all coding and scripting languages the candidate is proficient in (e.g., JavaScript, Python, etc.).
       - **Web Technologies**: Add libraries, frameworks, and front-end/back-end tools (e.g., React, Next.js, etc.).
       - **Databases and Cloud**: Include databases, cloud platforms, and services (e.g., MongoDB, AWS).
       - **Dev Tools & Core Competencies**: Include tools, methodologies, and technical proficiencies (e.g., Git, Docker, CI/CD, Agile).
       - **Other Technologies**: Add specialized or advanced technologies (e.g., Kafka, Event Hubs, etc.).
     - Dynamically suggest additional skills based on the job description if missing.
  
  4. **Education**:
     - Include the candidate’s highest degree and institution.
     - Format as:
       - ${Education}
  
  5. **Certifications**:
     - List any provided certifications. If none are given, suggest relevant certifications based on the job description.
  
  6. **Projects**:
     - Suggest **1-2 projects** that demonstrate the candidate’s technical skills, with:
       - Project Title.
       - A short description of the project.
       - Tools and technologies used (e.g., React, Node.js, AWS).
  
  ### Output Format Example:
  {
    "Summary": "A professional summary of the candidate.",
    "Education": [
      {
        "Degree": "Master's in Information Technology",
        "University": "University of Cincinnati",
        "Year": "2022",
        "CGPA": 4.0
      }
    ],
    "Experience": [
      {
        "Job Title": "Software Engineer",
        "Company": "Amazon",
        "Description": [
          "Designed scalable web applications using React and Node.js.",
          "Reduced downtime by 20% by optimizing code quality.",
          "Collaborated with cross-functional teams to deliver cloud-based solutions."
        ],
        "Period": "Jul 2015 to Jan 2020"
      }
    ],
    "Skills": {
      "Programming Languages": ["Java", "JavaScript", "Python", "SQL"],
      "Web Technologies": ["React", "Next.js", "Spring Boot"],
      "Databases and Cloud": ["Postgres", "Azure", "MongoDB"],
      "Dev Tools & Core Competencies": ["Git", "Docker", "CI/CD", "Agile"],
      "Other Technologies": ["Kafka", "Event Hub"]
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
        "Description": "Developed a scalable e-commerce platform using React and AWS.",
        "Technologies": ["React", "AWS", "Postgres"]
      }
    ],
    "Personal Details": {
      "Name": "John Doe",
      "Location": "Cincinnati, OH",
      "LinkedIn": "linkedin.com/in/johndoe",
      "GitHub": "github.com/johndoe",
      "Phone": "+1 123-456-7890"
    }
  }
  
  ### Important:
  - Make the output concise, well-structured, and visually clean.
  - Incorporate realistic and measurable details.
  - Ensure each section highlights the candidate's strengths and aligns with the job description.
  - Provide a comprehensive and competitive resume for the given role.
  `;

  const chat = await client.chat.completions.create({
    temperature: 1,

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
