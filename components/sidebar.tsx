import {
  PanelRight,
  House,
  StickyNote,
  Star,
  Settings,
  Notebook,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Dashboard from "./Dashboard";

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [isdashboard, setDashBoard] = useState(false);
  const [selected, setSelected] = useState("");

  const handleDashboard = () => {
    setDashBoard(true);
    setSelected("Dashboard");
  };

  return (
    <motion.nav
      layout
      style={{
        width: open ? "280px" : "fit-content",
        transition: "width 0.3s ease",
      }}
      className="h-full overflow-y-hidden flex flex-col gap-6 p-2 bg-white border-r border-slate-200"
    >
      <div className="flex flex-row justify-between font-bold p-2 ">
        {open && (
          <div className="flex flex-row">
            <h1 className=" hover:cursor-pointer text-blue-500">CUSTOM </h1>
            RESUME
            <Image src={"/images/pdf.png"} alt="pdf" width={30} height={30} />
          </div>
        )}
        <PanelRight
          className="hover:cursor-pointer "
          onClick={() => setOpen(!open)}
        />
      </div>
      <Options
        Icon={House}
        title="Home"
        open={open}
        selected={selected}
        onSelect={setSelected}
      />
      <Options
        Icon={StickyNote}
        title="Cover Letters"
        open={open}
        selected={selected}
        onSelect={setSelected}
      />
      <motion.div
        layout
        onClick={handleDashboard}
        className={`font-bold ${
          selected === "Dashboard" ? "bg-gray-200" : ""
        }  justify-start flex group flex-row gap-4 cursor pointer p-2  rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer`}
      >
        <Notebook />
        {open && <motion.div layout>Dashboard</motion.div>}
      </motion.div>
      <Options
        Icon={Star}
        title="Websites"
        open={open}
        selected={selected}
        onSelect={setSelected}
      />
      {open && (
        <div>
          <div className="invisible md:visible relative top-10 ml-4  w-4/5 rounded-t-lg items-center bg-pink-700/10 blur-xs flex gap-4 p-3 justify-center flex-col">
            <div className="h-1/2 w-full bg-white p-4 font-semibold rounded-t-lg flex flex-col shadow-xl gap-2">
              <div className="flex flex-row gap-5 justify-between items-center">
                Basic Plan{" "}
                <span className="w-1/3 h-1/6 bg-pink-100 rounded-lg p-1 text-xs font-bold">
                  4/10
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-lg"></div>
              <div className="w-4/5 h-2 bg-gray-200 rounded-lg"></div>
              <div className="w-4/6 h-2 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="invisible md:visible relative  ml-4 font-semibold w-4/5 items-center rounded-b-lg shadow-lg bg-gray-200 blur-xs flex gap-1 p-3 justify-center flex-col">
            <span>Trail ends in next few days</span>
            <span className="text-gray-400">
              Your on the free trail right now{" "}
            </span>
          </div>
        </div>
      )}
      <Options
        Icon={Settings}
        title="Settings"
        open={open}
        selected={selected}
        onSelect={setSelected}
      />
      <Dashboard
        onDashBoard={isdashboard}
        FDashBoard={setDashBoard}
        onSelect={setSelected}
      />
    </motion.nav>
  );
};

interface OptionProps {
  Icon: any;
  title: string;
  open?: any;
  selected: string;
  onSelect: (title: string) => void;
}

const Options = ({ Icon, title, open, selected, onSelect }: OptionProps) => {
  return (
    <motion.div
      layout
      onClick={() => onSelect(title)}
      className={`font-bold ${
        selected === title ? "bg-gray-200" : ""
      }  justify-start flex group flex-row gap-4 cursor pointer p-2  rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer`}
    >
      <Icon />
      {open && <motion.div layout>{title}</motion.div>}
    </motion.div>
  );
};
