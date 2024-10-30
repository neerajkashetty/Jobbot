"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";

export default function Cover() {
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
  );
}
