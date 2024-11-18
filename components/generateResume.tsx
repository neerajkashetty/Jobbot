import { ArrowLeft, ArrowRight } from "lucide-react";
import Example from "./combobox";
import { people, output } from "../utils/data";
import { useState } from "react";
import { resume, ResumeParams } from "../app/actions/ai";
import { Preview } from "./preview";
import { Dialog } from "./Dialog";

export function GenerateResume() {
  const [jobtitle, setJobTitle] = useState<any>("");
  const [jobdescription, setJobDescription] = useState<any>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [FirstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");
  const [resumedata, setResumeData] = useState<any>();

  const Generate = async () => {
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
    <div className=" flex md:flex-row  h-screen flex-col ">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between ">
        <div className="w-full justify-between h-1/12 flex ">
          <div className="flex p-2 gap-2 ">
            <span className="p-2 bg-gray-200/10 shadow-md rounded-lg cursor-pointer border">
              <ArrowLeft />
            </span>
            <span className="p-2 bg-gray-200/10 shadow-md rounded-lg cursor-pointer border">
              <ArrowRight />
            </span>
          </div>
          <div className="flex text-md max-h-full justify-between w-4/5 md:w-1/2 items-end ">
            <span className="cursor-pointer hover:border-b p-2 border-b-red-300 text-blue-500 font-bold ">
              Fill in
            </span>
            <span className="cursor-pointer hover:border-b p-2  border-b-red-300 text-blue-500 font-bold ">
              Design
            </span>
            <span className="cursor-pointer hover:border-b p-2 border-b-red-300 text-blue-500 font-bold ">
              Proofreading
            </span>
          </div>
        </div>
        <div className="h-full flex flex-col gap-8 p-2 border">
          <div>
            <h1 className="font-bold text-xl text-center">
              Generate Your Resume{" "}
            </h1>
            {/* need to give another ai component as its there on the wireframe */}
          </div>
          <h1 className="font-bold">Content</h1>
          <div>
            <p className="font-bold ">Job Title</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              placeholder="Job title"
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
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
          <div className="flex flex-row w-full gap-2 p-2">
            <div className="flex-col gap-2 w-full flex">
              <h1 className="text-sm font-medium">First Name</h1>
              <input
                placeholder="First Name"
                className="w-full bg-gray-100 rounded-lg p-2"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex-col gap-2 w-full flex">
              <h1 className="text-sm font-medium">Last Name</h1>
              <input
                placeholder="Last Name"
                className="w-full bg-gray-100 rounded-lg p-2"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
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
        resumedata={resumedata}
        Firstname={FirstName}
        Lastname={LastName}
        Email=""
      />
      <Dialog />
    </div>
  );
}
