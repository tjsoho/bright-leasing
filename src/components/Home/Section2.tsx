"use client";

{
	/* ***************************************************************
   SECTION 2 COMPONENT
   Single column layout featuring:
   - Section title
   - Full-width pill image
   Used to showcase product or service highlight
****************************************************************/
}

import { HomePageProps } from "@/app/_config";
import { motion, useInView } from "framer-motion";
import React from "react";

interface Section2Props {
	content: HomePageProps["content"];
}

export default function Section2({ content }: Section2Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	/* ************************************************************
							ANIMATION VARIANTS
	************************************************************ */
	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
	};

	/* ************************************************************
							RENDER
	************************************************************ */
	return (
		<section className="py-16 bg-brand-cream rounded-2xl" ref={ref}>
			<div className="max-w-5xl mx-auto px-4">
				<motion.div
					className="text-center"
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<p className="text-small uppercase tracking-wide mb-4 text-left">
						{content.section2title}
					</p>
					<h2 className=" text-gray-900 leading-tight text-left">
						{content.section2paragraph}
					</h2>
				</motion.div>
			</div>
		</section>
	);
}
