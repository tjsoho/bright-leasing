"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import RenderLineBreaks from "@/utils/render-line-breaks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const paragraphVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const formVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const inputVariants: Variants = {
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

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export default function Section6({ content }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      className="py-16 px-4 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className={`text-black text-left mb-16 ${content.section6titleBold ? "h2-bold" : ""}`}
        variants={titleVariants}
      >
        <RenderLineBreaks text={content.section6title} />
      </motion.h2>

      <motion.div
        className="bg-gray-300 rounded-xl grid lg:grid-cols-2 gap-12 p-12"
        variants={cardVariants}
      >
        <motion.p
          className={`text-black max-w-sm !text-4xl !leading-tight ${content.section6paragraphBold ? "p-bold" : ""}`}
          variants={paragraphVariants}
        >
          <RenderLineBreaks text={content.section6paragraph} />
        </motion.p>

        <motion.div className="grid gap-5" variants={formVariants}>
          <motion.label variants={inputVariants}>
            <span className="block mb-2">Salary (Before Tax)</span>
            <Input
              className="rounded-full border border-brand-black"
              type="number"
            />
          </motion.label>

          <motion.label variants={inputVariants}>
            <span className="block mb-2">Car Price</span>
            <Input
              className="rounded-full border border-brand-black"
              type="number"
            />
          </motion.label>

          <motion.div variants={buttonVariants} className="w-full">
            <Button className="w-full rounded-full bg-brand-yellow text-brand-black hover:bg-brand-yellow/80 mt-8">
              Estimate My Savings
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
