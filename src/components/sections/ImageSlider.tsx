"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  { id: 1, color: "bg-alto", width: "w-[822px]", label: "Office View" },
  { id: 2, color: "bg-ash", width: "w-[392px]", label: "Collaboration" },
  { id: 3, color: "bg-alto", width: "w-[392px]", label: "Focus" },
  { id: 4, color: "bg-ash", width: "w-[822px]", label: "Teamwork" },
];

export const ImageSlider = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="h-[538px] flex items-center bg-gallery overflow-hidden">
      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing w-full h-[461px]"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-10 px-page-padding"
        >
          {IMAGES.map((img) => (
            <motion.div
              key={img.id}
              className={`${img.color} ${img.width} h-[461px] flex-shrink-0 relative group`}
            >
              <div className="absolute inset-0 bg-mine-shaft/0 group-hover:bg-mine-shaft/5 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
                {img.label}
              </div>
            </motion.div>
          ))}
          {/* Duplicating for longer scroll feel */}
          {IMAGES.map((img) => (
            <motion.div
              key={`dup-${img.id}`}
              className={`${img.color} ${img.width} h-[461px] flex-shrink-0 relative group`}
            >
              <div className="absolute inset-0 bg-mine-shaft/0 group-hover:bg-mine-shaft/5 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
                {img.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
