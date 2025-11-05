import { cn } from "@/lib/utils";
import Image from "next/image";
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
  title?: string;
  titleBold?: boolean;
  description?: string;
  descriptionBold?: boolean;
  image?: string;
  className?: string;
}

export default function CardWithBackground({
  title,
  titleBold,
  description,
  descriptionBold,
  className,
  image,
}: Props) {
  return (
    <motion.div
      className={cn(
        "flex flex-col p-6 rounded-2xl relative z-0 min-h-[350px]",
        className,
      )}
      variants={cardReveal}
    >
      <Image
        src={image || "/placeholder.jpg"}
        alt={title || "Card background image"}
        fill
        className="abolute object-cover rounded-2xl -z-1 select-none"
      />

      <div className="relative z-0 mt-auto">
        {title && (
          <h4
            className={cn("mb-2", {
              "font-bold": titleBold,
            })}
          >
            {title}
          </h4>
        )}
        {description && (
          <p
            className={cn("!text-base", {
              "font-bold": descriptionBold,
            })}
          >
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
