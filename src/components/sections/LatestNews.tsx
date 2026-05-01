"use client";

import React from "react";
import { RevealText } from "@/components/common/RevealText";
import { DoubleButton } from "@/components/common/DoubleButton";
import { cn } from "@/lib/utils";

const ARTICLES = [
  {
    category: "Article",
    date: "3 Feb 2024",
    readTime: "4 Min Read",
    title: "Why Strong Brand Identity Is Important in Web Design",
    color: "bg-alto",
  },
  {
    category: "Article",
    date: "3 Mar 2024",
    readTime: "4 Min Read",
    title: "The Benefits of Aligning Your Team with Your Business Objectives",
    color: "bg-ash",
  },
];

export const LatestNews = () => {
  return (
    <section className="section-padding bg-gallery">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[46.8px] tracking-tight">
          <RevealText>Latest news</RevealText>
        </h3>
        <DoubleButton labelFront="View All" labelBack="See more articles" />
      </div>

      <div className="border-t border-alto grid grid-cols-2 gap-column">
        {ARTICLES.map((article, idx) => (
          <div key={idx} className="pt-10 flex flex-col group cursor-pointer">
            {/* Image Placeholder */}
            <div className={cn("aspect-[428/370] mb-8 relative overflow-hidden", article.color)}>
              <div className="absolute inset-0 bg-mine-shaft/0 group-hover:bg-mine-shaft/5 transition-colors duration-500" />
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-[14px] text-mine-shaft/60 mb-4 uppercase">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title */}
            <h4 className="text-[26px] leading-[1.2] font-normal tracking-tight group-hover:underline underline-offset-4">
              {article.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};
