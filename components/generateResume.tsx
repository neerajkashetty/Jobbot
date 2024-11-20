import Example from "./combobox";
import { people, output } from "../utils/data";
import { useState, useRef } from "react";
import { resume, ResumeParams } from "../app/actions/ai";
import { Preview } from "./preview";
import { Dialog } from "./Dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import z from "zod";
import { GenerateResumeSchema } from "../app/schemas/generateresume.schema";

export function GenerateResume() {
  const [jobtitle, setJobTitle] = useState<any>("");
  const [jobdescription, setJobDescription] = useState<any>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [FirstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");
  const [resumedata, setResumeData] = useState<any>();
  const pdfRef = useRef<any>();
  const [errors, setErrors] = useState<z.ZodError<GenerateResumeSchema> | null>(
    null
  );

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
    const formData = {
      jobtitle,
      jobdescription,
    };

    console.log(formData);

    const result = GenerateResumeSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation errors:", result.error.format());
      console.log(result.error);
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

      console.log(parsedData);
    } catch (error) {
      console.error("Failed to parse the resume data:", error);
    }
    console.log(resumedata);
  };

  return (
    <div className=" flex md:flex-row h-4/5 flex-col">
      <div className="w-full md:w-1/2 flex flex-col  justify-between ">
        <div className="h-full flex flex-col gap-8 p-2 border overflow-y-scroll">
          <div>
            <h1 className="font-bold text-xl text-center">
              Generate Your Resume{" "}
            </h1>
          </div>
          <h1 className="font-bold">Content</h1>
          <div>
            <p className="font-bold ">Job Title</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              placeholder="Job title"
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
            {errors?.formErrors.fieldErrors.jobtitle && (
              <p className="text-red-500 text-sm">
                {errors.formErrors.fieldErrors.jobtitle[0]}
              </p>
            )}
          </div>
          <div>
            <p>Paste the job description below</p>
            <textarea
              placeholder="Job Description Here please"
              className="w-full h-full bg-gray-200/40 p-2 rounded-lg"
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
            ></textarea>
            {errors?.formErrors.fieldErrors.jobdescription && (
              <p className="text-red-500 text-sm">
                {errors.formErrors.fieldErrors.jobdescription[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 p-2">
            <h1 className="text-sm font-medium">
              Which skills should be focused?
            </h1>
            <div className="p-2 relative">
              <Example people={people} />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <h1 className="text-sm font-medium">
              How creative should the output be?
            </h1>
            <div className="p-2 relative">
              <Example people={output} />
            </div>
          </div>

          <div className="w-full flex  justify-center items-center">
            <button
              onClick={() => Generate()}
              className="bg-blue-400 p-2 rounded-lg font-semibold"
            >
              Create Content
            </button>
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
