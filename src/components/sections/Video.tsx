"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Video = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate video loading for demo (actual load should use onCanPlay)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-[1080px] w-full flex items-center justify-center bg-gallery overflow-hidden">
      <div className="relative w-[902px] h-full bg-alto flex items-center justify-center">
        {/* Loader Overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-alto flex items-center justify-center"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 192 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-[#949494]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsLoaded(true)}
          className="w-full h-full object-cover grayscale"
        >
          {/* Using a placeholder video URL since local file.mp4 doesn't exist yet */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-curves-of-light-3174-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};
