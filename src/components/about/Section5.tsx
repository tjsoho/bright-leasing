'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 5 - Closing statement
// Matches hero design with text left, image right, and button
// White background with flex layout

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { BWestButton } from "@/components/ui/b-west-button";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section5Props {
    closing: AboutUsPageContent["closing"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section5({ closing }: Section5Props) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const textVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const titleVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const paragraphVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const buttonVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const imageVariants: Variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="min-h-screen mt-0 pt-16" ref={ref}>
            {/* ***************************************************************
               HERO CONTAINER - Flex layout with content left, image right
            ****************************************************************/}
            <div className="flex flex-col lg:flex-row w-full items-center justify-center bg-white px-2">
                {/* ***************************************************************
                    CONTENT SECTION - Left side
                ****************************************************************/}
                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={textVariants}
                    className="flex-1 flex items-center justify-center px-4 md:p-12 order-2 lg:order-1 mb-12 lg:mb-0"
                >
                    <div className="max-w-xl">
                        <motion.h1
                            variants={titleVariants}
                            className="text-brand-black mb-4 leading-none h1"
                        >
                            <RenderLineBreaks text={closing?.title || ""} />
                        </motion.h1>
                        <motion.p
                            variants={paragraphVariants}
                            className="text-left w-full leading-relaxed mb-6 p"
                        >
                            <RenderLineBreaks text={closing?.description || ""} />
                        </motion.p>
                        {closing?.emphasis && (
                            <motion.p
                                variants={paragraphVariants}
                                className="text-left w-full leading-relaxed mb-6 h4"
                            >
                                <RenderLineBreaks text={closing.emphasis} />
                            </motion.p>
                        )}
                        <motion.div
                            variants={buttonVariants}
                            className="flex flex-col gap-4 max-w-xs"
                        >
                            <BWestButton
                                text="Get Started"
                                onClick={() => window.location.href = '/contact'}
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
                    className="flex-1 relative h-64 sm:h-80 md:h-96 lg:h-full order-2 w-full flex justify-center items-center rounded-2xl"
                >
                    <Image
                        src={closing?.image || "/images/brightlogo.png"}
                        alt={closing?.title || "Bright Leasing customer experience"}
                        width={400}
                        height={300}
                        className="w-[500px] h-[300px] lg:w-full lg:h-full object-contain rounded-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

