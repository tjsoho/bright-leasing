"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { match } from "ts-pattern";
import CardWithBackground from "../core/CardWithBackground";
import CardWithIcon from "../core/CardWithIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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

export default function Section4({ content }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const tab1Tiles = content.section4tab1items.map((item, index) => {
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

  const tab2Tiles = content.section4tab2items.map((item, index) => {
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
          "h2-bold": content.section4titleBold,
        })}
        variants={fadeUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {content.section4title}
      </motion.h2>
      <motion.p
        className={cn("text-center max-w-4xl mx-auto mt-4", {
          "p-bold": content.section5paragraphBold,
        })}
        variants={fadeUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        custom={0.2}
      >
        {content.section4paragraph}
      </motion.p>

      <div className="flex justify-center mt-8">
        <Tabs defaultValue={content.section4tabs.tab1} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value={content.section4tabs.tab1}>
                {content.section4tabs.tab1Icon && (
                  <Image
                    src={content.section4tabs.tab1Icon}
                    alt={content.section4tabs.tab1}
                    width={20}
                    height={20}
                  />
                )}
                {content.section4tabs.tab1}
              </TabsTrigger>
              <TabsTrigger value={content.section4tabs.tab2}>
                {content.section4tabs.tab2Icon && (
                  <Image
                    src={content.section4tabs.tab2Icon}
                    alt={content.section4tabs.tab2}
                    width={20}
                    height={20}
                  />
                )}
                {content.section4tabs.tab2}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={content.section4tabs.tab1}>
            <motion.div
              className="grid lg:grid-cols-3 gap-3 lg:h-[700px] w-full"
              variants={cardStagger}
              initial="initial"
              whileInView="animate"
            >
              {tab1Tiles.map((tile, index) =>
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
                    <CardWithIcon
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
          </TabsContent>
          <TabsContent value={content.section4tabs.tab2}>
            <motion.div
              className="grid lg:grid-cols-3 gap-3 lg:h-[700px] w-full"
              variants={cardStagger}
              initial="initial"
              whileInView="animate"
            >
              {tab2Tiles.map((tile, index) =>
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
                    <CardWithIcon
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
