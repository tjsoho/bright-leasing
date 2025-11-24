"use client";
import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface Props {
  content: EmployersEmployeesPageProps["content"];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    x: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.1,
    },
  },
};

const paragraphVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function Section3({ content }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.section
      ref={ref}
      className="py-8 px-4 lg:px-8 bg-brand-yellow rounded-2xl my-6 flex flex-col lg:flex-row lg:items-center gap-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={iconVariants} className="flex-shrink-0">
        <Image
          src={content.section3icon}
          alt="Section 3 Image"
          width={120}
          height={120}
        />
      </motion.div>

      <motion.div variants={textVariants} className="">
        <motion.h3
          variants={titleVariants}
          className={cn("text-black text-2xl mb-2", {
            "h3-bold": content.section3titleBold,
          })}
        >
          <RenderLineBreaks text={content.section3title || ""} />
        </motion.h3>
        <motion.p
          variants={paragraphVariants}
          className={cn("text-black", {
            "font-bold": content.section3paragraphBold,
          })}
        >
          {content.section3paragraph}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
