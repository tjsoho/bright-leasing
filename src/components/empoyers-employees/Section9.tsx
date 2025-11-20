"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { match } from "ts-pattern";
import CardWithBackground from "../core/CardWithBackground";
import CardWithQuoteIcon from "../core/CardWithQuoteIcon";

interface Props {
    content: EmployersEmployeesPageProps["content"];
}

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

export default function Section9({ content }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref);

    const tiles = content.section9tab1items.map((item, index) => {
        const className = match(index)
            .with(0, () => "bg-brand-yellow")
            .with(1, 2, 3, () => "bg-brand-teal text-white")
            .with(4, () => "bg-gray-300")
            .otherwise(() => "");

        return {
            title: item.title,
            titleBold: item.titleBold,
            description: item.description,
            descriptionBold: item.descriptionBold,
            image: item.image,
            className,
        };
    });

    return (
        <div className="py-16 px-4" ref={ref}>
            <motion.h2
                className={cn("text-center", {
                    "h2-bold": content.section9titleBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {content.section9title}
            </motion.h2>
            <motion.p
                className={cn("text-center max-w-4xl mx-auto mt-4", {
                    "p-bold": content.section9paragraphBold,
                })}
                variants={fadeUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                custom={0.2}
            >
                {content.section9paragraph}
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
                                ([img, index]) => img && index === 1,
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

