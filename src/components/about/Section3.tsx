'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 3 - Differentiators
// Gray background with colored cards
// Layout: Icon at top, title below icon, description below title
// User can select background color for each card

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent, AboutDifferentiator } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { cn } from "@/lib/utils";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section3Props {
    differentiators: AboutUsPageContent["differentiators"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section3({ differentiators }: Section3Props) {
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

    const items: AboutDifferentiator[] = differentiators?.items || [];

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const titleVariants: Variants = {
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

    const stepVariants: Variants = {
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

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="py-16 bg-gray-100 rounded-2xl" ref={ref}>
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title - Centered */}
                <motion.h2
                    className="text-black text-center mb-5 h2"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={differentiators?.title || ""} />
                </motion.h2>

                {/* Subheading - Centered */}
                <motion.p
                    className="text-black text-center mb-12 max-w-4xl mx-auto p"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={differentiators?.description || ""} />
                </motion.p>

                {/* Cards Container */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className={cn(
                                "rounded-2xl p-6 relative overflow-hidden min-h-[350px] flex flex-col",
                                getBgColorClass(item.bgColor || "white")
                            )}
                            variants={stepVariants}
                        >
                            {/* Icon at top */}
                            <div className="mb-4">
                                <div className="size-14 rounded-full bg-white flex items-center justify-center border border-black">
                                    <Image
                                        src={item.icon || "/globe.svg"}
                                        alt={`${item.title} icon`}
                                        width={36}
                                        height={26}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title below icon */}
                            <h5
                                className={cn("mb-3 h5", {
                                    "font-bold-500": item.titleBold,
                                })}
                            >
                                <RenderLineBreaks text={item.title} />
                            </h5>

                            {/* Description below title */}
                            <p className="lg:text-small text-left leading-relaxed p flex-grow">
                                <RenderLineBreaks text={item.description} />
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

