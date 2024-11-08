import { ArrowLeft, ArrowRight } from "lucide-react";
import Example from "./combobox";

export function GenerateResume() {
  const people = [
    { id: 1, name: "MERN Stack" },
    { id: 2, name: ".Net specific" },
    { id: 3, name: "Deveops " },
    { id: 4, name: "Javascript" },
    { id: 5, name: "Azure" },
  ];

  return (
    <div className=" flex md:flex-row  flex-col ">
      <div className="w-full md:w-1/2  border flex flex-col justify-between ">
        <div className="w-full justify-between  border flex ">
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
              <Example people={people} />
            </div>
          </div>
          <div className="flex flex-row w-full gap-2 p-2">
            <div className="flex-col gap-2 w-full flex">
              <h1 className="text-sm font-medium">First Name</h1>
              <input
                placeholder="firstname"
                className="w-full bg-gray-300 rounded-lg p-2"
              ></input>
            </div>
            <div className="flex-col gap-2 w-full flex">
              <h1 className="text-sm font-medium">Last Name</h1>
              <input
                placeholder="firstname"
                className="w-full bg-gray-300 rounded-lg p-2"
              ></input>
            </div>
          </div>
          <div className="w-full flex  justify-center items-center">
            <button className="bg-blue-300 p-2 rounded-lg">
              Create Content
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="flex text-md border h-1/12 justify-between w-full p-3  items-end ">
          <span className="cursor-pointer hover:border-b p-2  font-bold ">
            Preview
          </span>
        </div>
      </div>
    </div>
  );
}
