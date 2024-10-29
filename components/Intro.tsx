import { motion } from "framer-motion";
import TypingAnimation from "../utils/TypingText";

export default function Intro() {
  return (
    <div className="relative flex flex-row  justify-center items-center bg-blend-saturation h-3/4">
      <div className="h-full w-1/2  flex justify-center items-center">
        <div className="h-1/2 w-full">
          <motion.button
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
            }}
            className="rounded-md flex gap-1 flex-row items-center justify-center h-1/6 w-1/4 border border-blue-300 text-center left-10 relative font-bold"
          >
            The
            <h3 className="text-blue-500"> #1 </h3>
            Resume Builder
          </motion.button>

          <motion.h1
            animate={{ y: 50 }}
            whileHover={{ scale: 1.2 }}
            dragConstraints={{ left: -100, right: 100 }}
            className="text-xl md:text-6xl text-center cursor-pointer font-bold  "
          >
            Create an Impressive Resume with AI For
          </motion.h1>
          <TypingAnimation text="F u l l S t a c k D e v e l p e r" />
        </div>
      </div>
      <h1 className="w-0.5 h-full bg-red-500" />
      <div className="h-full w-1/2 bg-green-50">Hi Neerajk</div>
    </div>
  );
}
