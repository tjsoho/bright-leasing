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
  title: string;
  titleBold?: boolean;
  description: string;
  descriptionBold?: boolean;
  image?: string;
  className?: string;
}

export default function CardWithIcon({
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
      <div className="flex flex-col">
        <div className="size-14 rounded-full bg-white flex items-center justify-center mb-4">
          <Image
            src={image || "/placeholder.jpg"}
            alt="{tile.title} icon"
            width={36}
            height={28}
            className="object-contain"
          />
        </div>
        <h4
          className={cn("mb-4", {
            "font-bold": titleBold,
          })}
        >
          {title}
        </h4>
        <p
          className={cn("!text-base", {
            "font-bold": descriptionBold,
          })}
        >
          {description}
        </p>
      </div>

    </motion.div>
  );
}
