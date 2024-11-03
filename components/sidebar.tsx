import { PanelRight, House, StickyNote, NotebookPen, Star } from "lucide-react";
import Image from "next/image";

export const SideBar = () => {
  return (
    <div className="h-full flex flex-col justify-end w-full md:w-1/6 ">
      <div className="invisible md:visible  h-full bg-gray-100/10 flex gap-4 p-4 justify-center flex-col">
        <div className="flex flex-row justify-between text-blue-500">
          <div className="flex flex-row">
            <h1 className="font-bold hover:cursor-pointer">CUSTOM RESUME</h1>
            <Image src={"/images/pdf.png"} alt="pdf" width={30} height={30} />
          </div>
          <PanelRight className="hover:cursor-pointer" />
        </div>
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <House className="w-5 group-hover:text-blue-800 " />
          <div>Home</div>
        </div>{" "}
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <StickyNote className="w-5 group-hover:text-blue-800" />
          <div>Cover Letters</div>
        </div>
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <NotebookPen className="w-5 group-hover:text-blue-800" />
          <div>Resumes</div>
        </div>
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <Star className="w-5 group-hover:text-blue-800" />
          <div>Websites</div>
        </div>
      </div>
      <div className="invisible md:visible  h-full bg-gray-100/10 flex gap-4 p-4 justify-center flex-col">
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <House className="w-5 group-hover:text-blue-800 " />
          <div>Home</div>
        </div>{" "}
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <StickyNote className="w-5 group-hover:text-blue-800" />
          <div>Cover Letters</div>
        </div>
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <NotebookPen className="w-5 group-hover:text-blue-800" />
          <div>Resumes</div>
        </div>
        <div className="font-bold justify-start flex group flex-row gap-4 cursor pointer p-2 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer">
          <Star className="w-5 group-hover:text-blue-800" />
          <div>Websites</div>
        </div>
      </div>
    </div>
  );
};
