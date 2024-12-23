"use-client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  return (
    <div className=" h-1/12 w-full flex  justify-around relative ">
      <div className="flex flex-row w-1/2 justify-between">
        <div className="text-sm md:text-2xl  font-serif flex items-center ">
          <h1 className="text-blue-400">Custom</h1>Resume
          <Image
            src={"/images/pdf.png"}
            alt="Neeraj"
            width={"60"}
            height={"60"}
            className="w-6 h-6 md:w-10 md:h-10 "
          />
        </div>
        <div className="text-xs md:visible invisible md:text-lg font-bold group hover:cursor-pointer text-center items-center md:mr-20 ">
          <h6 className="font-mono group-hover:bg-black p-1 rounded-lg">
            Resumes Generated
          </h6>
        </div>
      </div>
      <div className="flex flex-row w-1/2 justify-between bg-gray-100 dark:bg-transparent">
        <div className="flex font-bold group hover:cursor-pointer md:visible invisible text-center items-center">
          <a
            href="signin"
            className="font-mono group-hover:bg-black p-1 rounded-lg text-blue-500"
          >
            Login
          </a>
        </div>
        <Theme />
      </div>
    </div>
  );
}

export function Theme() {
  const { theme, setTheme } = useTheme();
  const ToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="flex items-center gap-2">
      <Moon className="dark:text-blue-500 text-black" />

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
      <Sun className="text-blue-500 dark:text-black" />
    </div>
  );
}
