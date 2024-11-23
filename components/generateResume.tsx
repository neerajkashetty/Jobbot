import { useState, useRef } from "react";
import { Preview } from "./preview";
import { Dialog } from "./Dialog";
import Example from "./combobox";
import { people, output } from "../utils/data";
import { resume, ResumeParams } from "../app/actions/ai";
import { GenerateResumeSchema } from "../app/schemas/generateresume.schema";
import type { ZodError } from "zod";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function GenerateResume() {
  const [jobtitle, setJobTitle] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [resumedata, setResumeData] = useState<any>();
  const [errors, setErrors] = useState<ZodError<GenerateResumeSchema> | null>(
    null
  );
  const pdfRef = useRef<HTMLDivElement>(null);

  // Previous handler functions remain the same
  const hanldeDownload = async () => {
    if (!pdfRef.current) {
      console.error("PDF Reference not found");
      return;
    }

    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Resume.pdf");
  };

  const Generate = async () => {
    const formData = { jobtitle, jobdescription };
    const result = GenerateResumeSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation errors:", result.error.format());
      setErrors(result.error);
      alert("Please check your input and try again.");
      return;
    }

    const resumeParams: ResumeParams = {
      jobtitle,
      skills: ["React", "Node", "typescript"],
      Firstname: FirstName,
      Lastname: LastName,
      experience: [
        "5 years of experience in the software design and development",
      ],
      jobdescription,
    };

    const resumeData = await resume(resumeParams);
    const final = resumeData[0].message.content ?? "";

    try {
      const parsedData = JSON.parse(final);
      setResumeData(parsedData);
    } catch (error) {
      console.error("Failed to parse the resume data:", error);
    }
  };

  return (
    <div className="flex md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col border">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h1 className="font-bold text-xl text-center">
                Generate Your Resume
              </h1>
            </div>

            <div>
              <h1 className="font-bold mb-4">Content</h1>

              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-2">Job Title</p>
                  <input
                    className="w-full p-2 rounded-lg bg-gray-100"
                    placeholder="Job title"
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  {errors?.formErrors.fieldErrors.jobtitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.formErrors.fieldErrors.jobtitle[0]}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2">Paste the job description below</p>
                  <textarea
                    placeholder="Job Description Here please"
                    className="w-full h-32 bg-gray-200/40 p-2 rounded-lg"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  {errors?.formErrors.fieldErrors.jobdescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.formErrors.fieldErrors.jobdescription[0]}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-2">
                    Which skills should be focused?
                  </h2>
                  <div className="relative">
                    <Example people={people} />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-2">
                    How creative should the output be?
                  </h2>
                  <div className="relative">
                    <Example people={output} />
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={Generate}
                    className="bg-blue-400 px-6 py-2 rounded-lg font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    Create Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Preview
        ref={pdfRef}
        resumedata={resumedata}
        Firstname={FirstName}
        Lastname={LastName}
        Email=""
        generate={hanldeDownload}
      />

      <Dialog />
    </div>
  );
}
