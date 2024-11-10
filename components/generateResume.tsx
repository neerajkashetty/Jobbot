import { ArrowLeft, ArrowRight } from "lucide-react";
import Example from "./combobox";
import { people, output } from "../utils/data";
import { JobInformation } from "../app/actions/jobinfo";
import { useState } from "react";

export function GenerateResume() {
  const [jobtitle, setJobTitle] = useState<any>("");
  const [skills, setSkills] = useState<string>("");
  const [FirstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");

  return (
    <div className=" flex md:flex-row  h-screen flex-col ">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between ">
        <div className="w-full justify-between h-full flex ">
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
          <p>Paste the job description below</p>
          <textarea
            placeholder="Job Description Here please"
            className="w-full h-[20rem] bg-gray-200/40 p-2 rounded-lg"
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
          ></textarea>
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
              onClick={() =>
                JobInformation(jobtitle, "React", FirstName, LastName)
              }
              className="bg-blue-400 p-2 rounded-lg font-semibold"
            >
              Create Content
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="flex text-md border h-1/12 justify-between w-full p-2.5  items-end ">
          <span className="cursor-pointer hover:border-b p-2  font-bold ">
            Preview
          </span>
        </div>
        <div className="bg-gray-100 h-5/6 items-center m-6 rounded-lg "></div>
      </div>
    </div>
  );
}
