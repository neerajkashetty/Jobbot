"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex-col text-3xl min-h-screen items-center justify-center bg-black top-10">
      <Player
        autoplay
        loop
        src={"/images/Loader.json"}
        style={{ height: "400px", width: "400px" }}
      />
      <motion.h1
        initial={{ scale: 0, y: 1 }}
        animate={{ scale: 1, y: 0 }}
        className="font-bold text-center text-gray-300 items-center justify-center"
      >
        We are getting things Ready...
      </motion.h1>
    </div>
  );
}
