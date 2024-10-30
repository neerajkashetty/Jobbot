import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  classname: string;
}

export default function TypingAnimation({
  text,
  classname,
}: TypingAnimationProps): JSX.Element {
  const words = text.split(" ");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + "" + words[index]);
        if (words[index] === ".") {
          setDisplayedText("");
        } else if (words[index] === ",") {
          setDisplayedText((prev) => displayedText + " ");
        }
        setIndex(index + 1);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [index, words]);

  return (
    <motion.div animate={{ color: "#ae54cd" }} className={classname}>
      <span className="flex flex-row">
        <motion.h1> {displayedText}</motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: 40 }}
          className="w-4 h-10 bg-blue-600"
        >
          |
        </motion.span>
      </span>
    </motion.div>
  );
}
