"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const RevealText = ({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: RevealTextProps) => {
  return (
    <div className={cn("overflow-hidden inline-block", className)}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth reveal
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
