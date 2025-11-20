import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { Variants, motion } from "framer-motion";

const cardReveal: Variants = {
    initial: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

interface Props {
    title: string;
    titleBold?: boolean;
    description: string;
    descriptionBold?: boolean;
    image?: string;
    className?: string;
}

const getIconColor = (): string => {
    return "text-white/50";
};

export default function CardWithQuoteIcon({
    title,
    titleBold,
    description,
    descriptionBold,
    className,
}: Props) {
    return (
        <motion.div
            className={cn(
                "flex flex-col p-6 rounded-2xl relative z-0 min-h-[350px]",
                className,
            )}
            variants={cardReveal}
        >
            <div className="flex flex-col">
                <div className="mb-4">
                    <Quote
                        size={64}
                        className={cn(getIconColor())}
                        strokeWidth={1.5}
                    />
                </div>
                <p
                    className={cn("!text-base", {
                        "font-bold": descriptionBold,
                    })}
                >
                    {description}
                </p>
            </div>

            <div className="relative z-0 mt-auto">
                <h4
                    className={cn({
                        "font-bold": titleBold,
                    })}
                >
                    {title}
                </h4>
            </div>
        </motion.div>
    );
}

