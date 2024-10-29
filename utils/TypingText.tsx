import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
}

export default function TypingAnimation({
  text,
}: TypingAnimationProps): JSX.Element {
  const words = text.split(" ");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + " " + words[index]);
        setIndex(index + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [index, words]);

  return <div>{displayedText}</div>;
}
