'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 1a - Image left, content right
// Follows the hero section to split long content
// Rounded images with dynamic content

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { RenderLineBreaks } from "@/utils/render-line-breaks";
import { cn } from "@/lib/utils";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Section1aProps {
    section1a: AboutUsPageContent["section1a"];
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function Section1a({ section1a }: Section1aProps) {
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
            <div className="max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr,1.05fr] gap-12 items-center justify-center">
                {/* ************************************************************
                    LEFT CONTAINER - Image
                ************************************************************ */}
                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="relative w-full flex justify-center items-center order-2 lg:order-1"
                >
                    <div className="relative w-full rounded-2xl overflow-hidden rounded-image-container">
                        <Image
                            src={section1a?.image || "/images/brightlogo.png"}
                            alt={section1a?.imageAlt || "Bright Leasing"}
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                            priority
                        />
                    </div>
                </motion.div>

                {/* ************************************************************
                    RIGHT CONTAINER - Content
                ************************************************************ */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="space-y-6 max-w-xl flex flex-col justify-center items-center mx-auto order-1 lg:order-2"
                >
                    <h2 className={cn("h2 text-brand-black text-left w-full", {
                        "h2-bold": section1a?.titleBold,
                    })}>
                        <RenderLineBreaks text={section1a?.title || ""} />
                    </h2>
                    <p className={cn("p text-brand-black/70 max-w-2xl text-left w-full", {
                        "p-bold": section1a?.descriptionBold,
                    })}>
                        <RenderLineBreaks text={section1a?.description || ""} />
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

