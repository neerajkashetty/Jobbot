import { ArrowLeft, ArrowRight } from "lucide-react";

export function GenerateResume() {
  return (
    <div className="h-full  flex md:flex-row  flex-col scroll">
      <div className="w-full md:w-1/2  border flex justify-between">
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
      <div className="w-1/2">Second half</div>
    </div>
  );
}
