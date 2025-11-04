"use client";
import { motion, useInView, Variants } from "framer-motion";
import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import CardWithIcon from "../core/CardWithIcon";
import { match } from "ts-pattern";

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
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <div className="py-16 px-4" ref={ref}>
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
        className="grid lg:grid-cols-6 gap-3 mt-12"
        animate={isInView ? "animate" : "initial"}
        variants={cardContainerVariants}
      >
        {content.section5tiles.map((item, index) => {
          const className = match(index)
            .with(0, () => "bg-brand-yellow")
            .with(2, 3, () => "bg-gray-300")
            .otherwise(() => "bg-brand-teal");
          return (
            <CardWithIcon
              key={index}
              image={item.image}
              title={item.title}
              titleBold={item.titleBold}
              description={item.description}
              descriptionBold={item.descriptionBold}
              className={cn("col-span-2", className, {
                "col-span-3": index >= 3,
              })}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
