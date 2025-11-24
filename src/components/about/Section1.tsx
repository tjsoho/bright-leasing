'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 1 - Hero layout
// Mirrors home hero with text on left and media card on right
// Uses brand palette with CTA button styling

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";

import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section1Props {
    hero: AboutUsPageContent["hero"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section1({ hero }: Section1Props) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <section className="px-4 py-16 lg:py-24 bg-white" ref={ref}>
            <div className="max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr,0.95fr] gap-12 items-center justify-center">
                {/* ************************************************************
                    LEFT CONTAINER - Story introduction
                ************************************************************ */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="space-y-6 max-w-xl flex flex-col justify-center items-center mx-auto"
                >
                    <p className="text-brand-teal uppercase tracking-[0.3em] text-small text-left w-full">
                        {hero?.eyebrow}
                    </p>
                    <h1 className="h1 text-brand-black">
                        <RenderLineBreaks text={hero?.title || ""} />
                    </h1>
                    {/* render line breaks */}
                    <p className="p text-brand-black/70 max-w-2xl">
                        <RenderLineBreaks text={hero?.description} />
                    </p>

                </motion.div>

                {/* ************************************************************
                    RIGHT CONTAINER - Hero image
                ************************************************************ */}
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="relative w-full flex justify-center items-center p-6"
                >
                    <div className="relative w-full rounded-2xl overflow-hidden rounded-image-container">
                        <Image
                            src={hero?.image || "/images/brightlogo.png"}
                            alt={hero?.imageAlt || "Bright Leasing team"}
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                            priority
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

