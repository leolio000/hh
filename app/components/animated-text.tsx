"use client";

import { useState, useEffect } from "react";

interface AnimatedTextProps {
  texts: string[];
  interval?: number;
}

export default function AnimatedText({ texts, interval = 2000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className="relative inline-block">
      <span className="block transition-all duration-500 ease-out">
        {texts[currentIndex]}
      </span>
    </span>
  );
} 