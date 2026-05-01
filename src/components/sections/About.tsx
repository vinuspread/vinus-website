"use client";

import React from "react";
import { RevealText } from "@/components/common/RevealText";
import { DoubleButton } from "@/components/common/DoubleButton";

export const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="grid grid-cols-8 gap-column">
        {/* Heading */}
        <div className="col-span-8 mb-10">
          <h2 className="text-[83px] tracking-[-2.8px] font-normal">
            <RevealText>ABOUT</RevealText>
          </h2>
        </div>

        {/* Subheading (col 1-3) */}
        <div className="col-span-8 md:col-span-3">
          <h3 className="text-[25.3px] leading-[1.1] font-normal">
            <RevealText delay={0.1}>AN INTERNATIONAL DIGITAL</RevealText>
            <br />
            <RevealText delay={0.2}>DESIGN STUDIO REIMAGINING</RevealText>
            <br />
            <RevealText delay={0.3}>HOW PEOPLE CONNECT WITH</RevealText>
            <br />
            <RevealText delay={0.4}>BRANDS.</RevealText>
          </h3>
        </div>

        {/* Content & Button (col 5-7) */}
        <div className="col-span-8 md:col-start-5 md:col-span-3 mt-10 md:mt-0">
          <p className="text-[17.3px] font-light leading-[1.4] lowercase normal-case mb-12">
            We're a small team of curious humans who create work we're proud of
            for people and brands we believe in. With collaboration at the heart
            of every project, we identify what skills are required and then
            bring the best people together to create something truly
            extraordinary. Combining strategy, branding, web design and
            development, we build digital experiences that transform the way
            people connect and interact with brands.
          </p>
          
          <DoubleButton 
            labelFront="About us" 
            labelBack="Get to know us" 
          />
        </div>
      </div>
    </section>
  );
};
