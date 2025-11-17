'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 3 - Differentiators
// Gray background with white cards matching Section2 styling
// Uses same spacing, text sizes, and icon styling

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent, AboutDifferentiator } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

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
                {/* Section Title */}
                <motion.h2
                    className="text-black text-left mb-5 h2"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={differentiators?.title || ""} />
                </motion.h2>

                <motion.p
                    className="text-black text-left mb-12 lg:max-w-3xl p"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <RenderLineBreaks text={differentiators?.description || ""} />
                </motion.p>

                {/* Cards Container */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 relative overflow-hidden h-[400px] w-[300px] lg:w-full mx-auto"
                            variants={stepVariants}
                        >
                            <div className="flex flex-col justify-between h-full">
                                {/* Icon */}
                                <div className="mb-4">
                                    <div className="size-14 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={item.icon || "/globe.svg"}
                                            alt={`${item.title} icon`}
                                            width={26}
                                            height={26}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-start mt-auto h-fit">
                                    <h5 className="text-black mb-3 h5">
                                        <RenderLineBreaks text={item.title} />
                                    </h5>
                                    <p className="lg:text-small text-left leading-relaxed p">
                                        <RenderLineBreaks text={item.description} />
                                    </p>
                                </div>
                            </div>
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

