"use client";

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 7 - CTA section with image
// Matches employers-employees Section7 styling exactly
// Flex layout with content left, image right

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { BWestButton } from "@/components/ui/b-west-button";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section7Props {
    section7: AboutUsPageContent["section7"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section7({ section7 }: Section7Props) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    if (!section7) {
        return null;
    }

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const textVariants: Variants = {
        initial: { opacity: 0, y: 40, x: -30, scale: 0.95 },
        animate: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1] as const,
                staggerChildren: 0.2,
            },
        },
    };

    const titleVariants: Variants = {
        initial: { opacity: 0, y: 30, scale: 0.9 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1] as const,
                delay: 0.2,
            },
        },
    };

    const paragraphVariants: Variants = {
        initial: { opacity: 0, y: 20, x: -20 },
        animate: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1] as const,
                delay: 0.4,
            },
        },
    };

    const buttonVariants: Variants = {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
                delay: 0.6,
            },
        },
    };

    const imageVariants: Variants = {
        initial: { opacity: 0, scale: 0.8, rotateY: 15, x: 30 },
        animate: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            x: 0,
            transition: {
                duration: 1.4,
                ease: [0.4, 0, 0.2, 1] as const,
                delay: 0.3,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="py-16" ref={ref}>
            {/* ***************************************************************
               SECTION 7 CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
            <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] w-full items-center bg-white px-2">
                {/* ***************************************************************
                    CONTENT SECTION - Left side
                ****************************************************************/}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={textVariants}
                    className="flex-1 flex items-center justify-center p-4 md:p-12"
                >
                    <div className="max-w-lg">
                        <motion.h2
                            variants={titleVariants}
                            className={`text-gray-800 mb-4 ${section7.titleBold ? "h2-bold" : ""}`}
                        >
                            <RenderLineBreaks text={section7.title} />
                        </motion.h2>
                        <motion.p
                            variants={paragraphVariants}
                            className={`text-gray-600 text-left w-full leading-relaxed mb-6 ${section7.descriptionBold ? "p-bold" : ""}`}
                        >
                            <RenderLineBreaks text={section7.description} />
                        </motion.p>
                        <motion.div variants={buttonVariants} className="w-full">
                            <BWestButton
                                text={section7.buttonText}
                                onClick={() => (window.location.href = "/contact")}
                                className="w-3/4"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* ***************************************************************
                    IMAGE SECTION - Right side
                ****************************************************************/}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={imageVariants}
                    className="flex-1 relative h-64 sm:h-80 md:h-96 lg:h-full order-2 w-full flex justify-center items-center"
                >
                    <div className="relative w-[500px] h-[300px] lg:w-full lg:h-full">
                        <Image
                            src={section7.image}
                            alt="Promotional Image"
                            fill
                            className="object-contain rounded-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

