'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 6 - Bright Values
// Displays title/description and grid of value cards
// Uses colored background cards with icons matching Section2 styling

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { cn } from "@/lib/utils";
import CardWithIcon from "@/components/core/CardWithIcon";
import { match } from "ts-pattern";

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
    const blocks = (values?.blocks || []).map((block, index) => {
        const className = match(index)
            .with(0, () => "bg-brand-yellow")
            .with(1, 2, () => "bg-brand-teal text-white")
            .with(3, () => "bg-gray-300")
            .otherwise(() => "bg-brand-yellow");

        return {
            ...block,
            className,
        };
    });

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
                        <CardWithIcon
                            key={block.id}
                            image={block.image}
                            title={block.title}
                            description={block.description}
                            className={cn(block.className)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

