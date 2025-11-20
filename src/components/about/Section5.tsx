'use client';

/* ************************************************************
                        NOTES
************************************************************ */
// About Section 5 - Closing statement
// 5 squares with tall image card in the middle
// Matches Section9 design from employers/employees

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { AboutUsPageContent } from "@/app/about-us/_config";
import { cn } from "@/lib/utils";
import CardWithBackground from "@/components/core/CardWithBackground";
import CardWithQuoteIcon from "@/components/core/CardWithQuoteIcon";
import { match } from "ts-pattern";

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
                            FUNCTIONS
    ************************************************************ */
    const tiles = (closing?.tiles || []).map((tile, index) => {
        const className = match(index)
            .with(0, () => "bg-brand-yellow")
            .with(1, 2, 3, () => "bg-brand-teal text-white")
            .with(4, () => "bg-gray-300")
            .otherwise(() => "");

        return {
            title: tile.title,
            titleBold: tile.titleBold,
            description: tile.description,
            descriptionBold: tile.descriptionBold,
            image: tile.image,
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
        <div className="py-16 px-4" ref={ref}>
            <motion.h2
                className={cn("text-center", {
                    "h2-bold": closing?.titleBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {closing?.title}
            </motion.h2>
            <motion.p
                className={cn("text-center max-w-4xl mx-auto mt-4", {
                    "p-bold": closing?.paragraphBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                custom={0.2}
            >
                {closing?.paragraph}
            </motion.p>

            <div className="flex justify-center mt-8">
                <motion.div
                    className="grid lg:grid-cols-3 gap-3 lg:h-[700px] w-full"
                    variants={cardStagger}
                    initial="initial"
                    whileInView="animate"
                >
                    {tiles.map((tile, index) =>
                        match([tile.image, index])
                            .when(
                                ([img, idx]) => img && idx === 1,
                                () => (
                                    <CardWithBackground
                                        key={index}
                                        image={tile.image}
                                        title={tile.title}
                                        titleBold={tile.titleBold}
                                        description={tile.description}
                                        descriptionBold={tile.descriptionBold}
                                        className={cn(
                                            tile.className,
                                            "row-span-2 order-2 lg:order-1",
                                        )}
                                    />
                                ),
                            )
                            .otherwise(() => (
                                <CardWithQuoteIcon
                                    key={index}
                                    image={tile.image}
                                    title={tile.title}
                                    titleBold={tile.titleBold}
                                    description={tile.description}
                                    descriptionBold={tile.descriptionBold}
                                    className={cn(
                                        tile.className,
                                        `order-${index} lg:order-1`,
                                    )}
                                />
                            )),
                    )}
                </motion.div>
            </div>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */

