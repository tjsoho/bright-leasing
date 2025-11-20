'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 4a - Love Every Step
// Two column layout with title, text, and button on left
// Rounded image on right side
// Positioned between Section 4 and Section 5

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { BWestButton } from "@/components/ui/b-west-button";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section4aProps {
    section4a: AboutUsPageContent["section4a"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section4a({ section4a }: Section4aProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });
    const router = useRouter();

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
                    LEFT CONTAINER - Title, text, and button
                ************************************************************ */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="space-y-6 max-w-xl flex flex-col justify-center items-center mx-auto"
                >
                    <h2 className="h2 text-brand-black text-left w-full">
                        {section4a?.title}
                    </h2>
                    <p className="p text-brand-black/70 max-w-2xl text-left w-full">
                        <RenderLineBreaks text={section4a?.description || ""} />
                    </p>
                    {section4a?.ctaLabel && (
                        <div className="w-full flex justify-start">
                            <div onClick={() => router.push(section4a?.ctaLink || "/contact")} className="cursor-pointer w-full lg:w-1/2">
                                <BWestButton text={section4a.ctaLabel} className="w-full" />
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ************************************************************
                    RIGHT CONTAINER - Rounded image
                ************************************************************ */}
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="relative w-full flex justify-center items-center p-6"
                >
                    <div className="relative w-full rounded-2xl overflow-hidden rounded-image-container">
                        <Image
                            src={section4a?.image || "/images/brightlogo.png"}
                            alt={section4a?.imageAlt || "Bright Leasing"}
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

