import { ArrowLeft, ArrowRight } from "lucide-react";

export function GenerateResume() {
  return (
    <div className="h-full  flex md:flex-row  flex-col ">
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
        <div className="h-full flex flex-col gap-8 p-2 border overflow-y-scroll">
          <div>
            <h1 className="font-bold text-xl text-center">
              Generate Your Resume{" "}
            </h1>
            {/* need to give another ai component as its there on the wireframe */}
          </div>
          <h1 className="font-bold">Content</h1>
          <p>Paste the job description below</p>
          <textarea
            placeholder="place your job description"
            className="w-full h-[20rem] bg-gray-200/40 p-2 rounded-lg"
          ></textarea>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">
              Which skills should be focused?
            </h1>
          </div>
        </div>
      </div>
      <div className="w-1/2">Second half</div>
    </div>
  );
}
