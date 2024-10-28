"use-client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const ToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="bg-gray-400 opacity-100 h-1/12 w-full flex justify-between fixed">
      <div className="text-2xl  font-serif flex items-center">
        CustomResume
        <Image
          src={"/images/pdf.png"}
          alt="Neeraj"
          width={"60"}
          height={"60"}
        />
      </div>
      <div className="flex text-white font-bold group hover:cursor-pointer text-center items-center">
        <h6 className="font-mono group-hover:bg-black p-1 rounded-lg">
          Resumes Generated
        </h6>
      </div>
      <div className="flex text-white font-bold group hover:cursor-pointer text-center items-center">
        <h6 className="font-mono group-hover:bg-black p-1 rounded-lg">Saved</h6>
      </div>
      <div className="flex text-white font-bold group hover:cursor-pointer text-center items-center">
        <h6 className="font-mono group-hover:bg-black p-1 rounded-lg">Login</h6>
      </div>
      <div className="flex items-center gap-2">
        <Sun className="text-blue-500 dark:text-black" />
        <div className="relative inline-block w-11 h-5 ">
          <input
            onClick={() => ToggleTheme()}
            defaultChecked
            id="switch-component"
            type="checkbox"
            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
          />
          <label className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border  border-slate-300 shadow-sm transition-transform duration-400 peer-checked:translate-x-7 peer-checked:border-slate-800 cursor-pointer"></label>
        </div>
        <Moon className="dark:text-blue-500 text-black" />
      </div>
    </div>
  );
}
