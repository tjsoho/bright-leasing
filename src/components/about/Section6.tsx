'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 6 - Bright Values
// Displays title/description and grid of value cards
// Uses colored background cards with icons matching Section2 styling
// Layout: Icon at top, title below icon, description below title

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section6Props {
    values: AboutUsPageContent["values"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section6({ values }: Section6Props) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const getBgColorClass = (color: string) => {
        switch (color) {
            case "grey":
                return "bg-gray-200";
            case "teal":
                return "bg-brand-teal text-white";
            case "yellow":
                return "bg-brand-yellow";
            case "white":
                return "bg-white";
            default:
                return "bg-white";
        }
    };

    const blocks = values?.blocks || [];

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const fadeUp: Variants = {
        initial: {
            opacity: 0,
            y: 30,
        },
        animate: (delay) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay || 0,
            },
        }),
    };

    const cardStagger: Variants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardReveal: Variants = {
        initial: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="pb-16 px-4" ref={ref}>
            <motion.h2
                className="text-center h2"
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {values?.title}
            </motion.h2>
            <motion.p
                className="text-center max-w-4xl mx-auto mt-4 p"
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                custom={0.2}
            >
                {values?.description}
            </motion.p>

            <div className="flex justify-center mt-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full"
                    variants={cardStagger}
                    initial="initial"
                    whileInView="animate"
                >
                    {blocks.map((block) => (
                        <motion.div
                            key={block.id}
                            className={cn(
                                "flex flex-col p-6 rounded-2xl relative z-0 min-h-[350px]",
                                getBgColorClass(block.bgColor || "white")
                            )}
                            variants={cardReveal}
                        >
                            {/* Icon at top */}
                            <div className="mb-4">
                                <div className="size-14 rounded-full bg-white flex items-center justify-center">
                                    <Image
                                        src={block.image || "/placeholder.jpg"}
                                        alt={`${block.title} icon`}
                                        width={26}
                                        height={26}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title below icon */}
                            <h4 className="mb-3">
                                <RenderLineBreaks text={block.title} />
                            </h4>

                            {/* Description below title */}
                            <p className="!text-base flex-grow">
                                <RenderLineBreaks text={block.description} />
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

