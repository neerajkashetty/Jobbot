import { ChartNoAxesCombined, Timer, BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <div className=" w-full h-1/4 absolute flex flex-row">
      <div className="bg-white w-1/2 justify-evenly flex flex-row">
        <div className=" w-1/4 flex justify-center items-center flex-col">
          <div className="p-1">
            <div className="flex flex-row items-center">
              <ChartNoAxesCombined className="w-8 h-8 text-blue-700" />
              <h1 className="text-3xl font-bold">+65%</h1>
            </div>
          </div>
          <div className="">
            <h4 className="relative text-xs  text-gray-500 font-semibold">
              Better chance of Job
            </h4>
          </div>
        </div>
        <div className=" w-1/4 flex justify-center items-center flex-col">
          <div className="p-1">
            <div className="flex flex-row items-center">
              <BriefcaseBusiness className="w-8 h-8 text-blue-700" />
              <h1 className="text-3xl font-bold">20 Days</h1>
            </div>
          </div>
          <div className="">
            <h4 className="relative text-xs text-center  text-gray-500 font-semibold">
              Avg time to get hired
            </h4>
          </div>
        </div>

        <div className=" w-1/4 flex justify-center items-center flex-col">
          <div className="p-1">
            <div className="flex flex-row items-center">
              <Timer className="w-8 h-8 text-blue-700" />
              <h1 className="text-3xl font-bold">3min.</h1>
            </div>
          </div>
          <div className="">
            <h4 className="relative text-xs text-center   text-gray-500 font-semibold">
              Avg Time to create your resume
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-1/2"></div>
    </div>
  );
}
