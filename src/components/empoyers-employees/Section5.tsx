"use client";
import { motion, useInView, Variants } from "framer-motion";
import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import CardWithIcon from "../core/CardWithIcon";

interface Props {
  content: EmployersEmployeesPageProps["content"];
}

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Section5({ content }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15 });

  const getBgColorClass = (color: string) => {
    switch (color) {
      case "grey":
        return "bg-gray-200";
      case "teal":
        return "bg-brand-teal text-white";
      case "yellow":
        return "bg-brand-yellow";
      default:
        return "bg-white";
    }
  };

  const bgColors = [
    content.section5tile1bgColor || "yellow",
    content.section5tile2bgColor || "teal",
    content.section5tile3bgColor || "grey",
    content.section5tile4bgColor || "teal",
  ];

  // Only show first 4 tiles
  const tiles = content.section5tiles.slice(0, 4);

  return (
    <div className="py-16 px-4 " ref={ref}>
      <motion.h2
        className={cn("text-center", {
          "h2-bold": content.section5titleBold,
        })}
        variants={fadeUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {content.section5title}
      </motion.h2>
      <motion.p
        className={cn("text-center max-w-4xl mx-auto mt-4", {
          "p-bold": content.section5paragraphBold,
        })}
        variants={fadeUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {content.section5paragraph}
      </motion.p>

      <motion.div
        className="grid lg:grid-cols-4 gap-3 mt-12"
        animate={isInView ? "animate" : "initial"}
        variants={cardContainerVariants}
      >
        {tiles.map((item, index) => {
          return (
            <CardWithIcon
              key={index}
              image={item.image}
              title={item.title}
              titleBold={item.titleBold}
              description={item.description}
              descriptionBold={item.descriptionBold}
              className={cn(getBgColorClass(bgColors[index]))}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
