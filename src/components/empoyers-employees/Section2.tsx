"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React from "react";

interface Section2Props {
  content: EmployersEmployeesPageProps["content"];
}

export default function Section2({ content }: Section2Props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.15,
  });

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: -15,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const getBgColorClass = (color: string) => {
    switch (color) {
      case "grey":
        return "bg-gray-200";
      case "teal":
        return "bg-brand-teal";
      case "yellow":
        return "bg-brand-yellow";
      default:
        return "bg-white";
    }
  };

  const steps = [
    {
      title: content.section2tile1title,
      description: content.section2tile1description,
      icon: content.section2tile1icon,
      number: "01",
      titleBold: content.section2tile1titleBold,
      descriptionBold: content.section2tile1descriptionBold,
      bgColor: content.section2tile1bgColor || "white",
    },
    {
      title: content.section2tile2title,
      description: content.section2tile2description,
      icon: content.section2tile2icon,
      number: "02",
      titleBold: content.section2tile2titleBold,
      descriptionBold: content.section2tile2descriptionBold,
      bgColor: content.section2tile2bgColor || "white",
    },
    {
      title: content.section2tile3title,
      description: content.section2tile3description,
      icon: content.section2tile3icon,
      number: "03",
      titleBold: content.section2tile3titleBold,
      descriptionBold: content.section2tile3descriptionBold,
      bgColor: content.section2tile3bgColor || "white",
    },
    {
      title: content.section2tile4title,
      description: content.section2tile4description,
      icon: content.section2tile4icon,
      number: "04",
      titleBold: content.section2tile4titleBold,
      descriptionBold: content.section2tile4descriptionBold,
      bgColor: content.section2tile4bgColor || "white",
    },
    {
      title: content.section2tile5title,
      description: content.section2tile5description,
      icon: content.section2tile5icon,
      number: "05",
      titleBold: content.section2tile5titleBold,
      descriptionBold: content.section2tile5descriptionBold,
      bgColor: content.section2tile5bgColor || "white",
    },
  ];

  return (
    <section className="py-16 bg-gray-100 rounded-2xl overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className={`text-black text-center mb-5 ${content.section2titleBold ? "h2-bold" : ""}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section2title} />
        </motion.h2>

        <motion.p
          className={`text-black text-center mb-12  ${content.section2paragraphBold ? "p-bold" : ""}`}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <RenderLineBreaks text={content.section2paragraph} />
        </motion.p>

        {/* Steps Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`${getBgColorClass(step.bgColor)} rounded-2xl p-6 relative overflow-hidden min-h-[400px] w-full mx-auto`}
              variants={stepVariants}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4">
                  <div className="size-14 border border-black rounded-full flex items-center justify-center overflow-hidden bg-transparent">
                    <Image
                      src={step.icon}
                      alt={`${step.title} icon`}
                      width={36}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Heading */}
                <h5
                  className={`mb-3 ${step.bgColor === "teal" ? "text-white" : "text-black"} ${step.titleBold ? "h5-bold" : ""}`}
                >
                  <RenderLineBreaks text={step.title} />
                </h5>

                {/* Description */}
                <p
                  className={`text-sm lg:text-small text-left leading-relaxed ${step.bgColor === "teal" ? "text-white" : "text-black"} ${step.descriptionBold ? "font-bold" : "font-normal"}`}
                >
                  <RenderLineBreaks text={step.description} />
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
