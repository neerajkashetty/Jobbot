import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TypingAnimation from "../utils/TypingText";
import Image from "next/image";
import { ChartNoAxesCombined } from "lucide-react";
import { MouseEventHandler } from "react";

export default function Intro() {
  const xpcnt = useSpring(0, { bounce: 0 });
  const ypcnt = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  const rotateX = useTransform(ypcnt, [-0.5, 0.5], ["-18deg", "18deg"]);
  const rotateY = useTransform(xpcnt, [-0.5, 0.5], ["-18deg", "18deg"]);

  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;
    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    scale.set(2.07);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    xpcnt.set(0);
    ypcnt.set(0);
  };

  const handleMouseEvent: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerHeight, containerWidth } =
      getMousePosition(e);

    xpcnt.set(currentMouseX / containerWidth - 0.5);
    ypcnt.set(currentMouseY / containerHeight - 0.5);
  };

  return (
    <div className="relative flex flex-col md:flex-row  justify-center items-center bg-blend-saturation h-full">
      <div className="h-full gap-6 w-1/2 flex flex-col justify-center items-center">
        <div className="h-1/3 w-full">
          <motion.button className="rounded-md flex gap-1 flex-row items-center justify-center h-1/6 w-1/4 border border-blue-300 text-center left-10 relative font-bold">
            The
            <h3 className="text-blue-500"> #1 </h3>
            Resume Builder
          </motion.button>
          <motion.h1
            animate={{ y: 50 }}
            whileHover={{ scale: 1.2 }}
            dragConstraints={{ left: -100, right: 100 }}
            className="text-xl md:text-6xl text-center cursor-pointer font-bold "
          >
            Create a Impressive Resume with AI For
          </motion.h1>
        </div>
        <TypingAnimation
          classname="font-bold text-xl md:text-6xl relative "
          text="F u l l , S t a c k , D e v e l o p e r . U I / U X , D e s i g n e r"
        />
        <span className="text-2xl font-semibold text-gray-400 inline">
          {" "}
          Use the Ai to make your job search easier by using the<br></br> custom
          resume builder you land the jobs with 10x faster
        </span>
        <div className="flex flex-col gap-10 w-1/2 h-1/6 text-white ">
          <button className="w-1/2 h-1/2 rounded-3xl  font-extrabold bg-blue-400 p-1">
            Build My Resume
          </button>
        </div>
      </div>
      <h1 className="w-0.5 h-full" />
      <div className="h-full w-1/2 flex justify-center bg-gray-100 dark:bg-transparent">
        <motion.div
          onMouseMove={handleMouseEvent}
          onMouseEnter={handleMouseEnter}
          whileHover={{ scale: 1.04 }}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="m-4 h-4/5 w-3/5 top-10 flex relative rounded-lg "
        >
          <Image
            src={"/images/resume.png"}
            alt="resume"
            width="500"
            height="40"
            className="p-6 rounded-lg bg-white "
          ></Image>
        </motion.div>
        <div className="w-1/12 h-1/5 flex flex-col items-center p-2 shadow-md bg-white rounded-lg  absolute top-80 right-96 mr-40">
          <div className="font-bold justify-center text-black">200K+</div>
          <ChartNoAxesCombined className="w-full h-full text-blue-500" />
          <span className="text-xs text-gray-400 font-semibold">
            people get hired
          </span>
        </div>
      </div>
    </div>
  );
}
