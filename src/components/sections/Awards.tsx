"use client";

import React from "react";
import { RevealText } from "@/components/common/RevealText";

const AWARDS = [
  {
    name: "Awwwards",
    items: [
      "1x Studio of the Year Nominee",
      "2x E-commerce of the Year Nominee",
      "1x Site of the Month",
      "1x Honours Awards",
      "13x Site of the Day",
      "12x Developer Award",
      "21x Honourable Mention",
    ],
  },
  { name: "The FWA", items: ["10x FWA of the Day"] },
  {
    name: "CSS Design Awards",
    items: [
      "1x Website of the Year Nominee",
      "1x Website of the Month",
      "11x Website of the Day",
      "15x Innovation",
      "15x UX Design",
      "15x UI Design",
    ],
  },
  { name: "Webby", items: ["1x Webby nominee"] },
];

export const Awards = () => {
  return (
    <section id="awards" className="section-padding bg-gallery">
      <div className="grid grid-cols-8 gap-column">
        {/* Left Side: Title & Description */}
        <div className="col-span-8 md:col-span-4">
          <h2 className="text-[82.4px] leading-[0.9] tracking-[-2.8px] mb-12">
            <RevealText>AWARDS &</RevealText>
            <br />
            <RevealText delay={0.1}>RECOGNITIONS</RevealText>
          </h2>
          <p className="text-[17.1px] font-light leading-[1.4] md:max-w-[440px]">
            Our passion for technology drives us to excel in research, strategy,
            branding, UX/UI, and development. Our focus is on creating impactful
            experiences that bring value to our clients and their customers.
            While we don't chase awards, it's always gratifying to receive
            recognition for our work.
          </p>
        </div>

        {/* Right Side: Awards List */}
        <div className="col-span-8 md:col-span-4 mt-20 md:mt-0">
          {AWARDS.map((category) => (
            <div
              key={category.name}
              className="border-b border-alto py-10 first:pt-0"
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <h4 className="text-[25.7px] font-normal">{category.name}</h4>
                </div>
                <div className="col-span-2">
                  <ul className="space-y-1">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-[16.5px] font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
