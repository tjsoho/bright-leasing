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
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section2Props {
	content: HomePageProps["content"];
}

export default function Section2({ content }: Section2Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

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
				ease: easeOut,
			},
		},
	};

	return (
		<section className="py-16 bg-gray-100" ref={ref}>
			<div className="max-w-4xl mx-auto px-4">
				<motion.div
					className="text-center"
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					<p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
						{content.section2title}
					</p>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
						{content.section2paragraph}
					</h2>
				</motion.div>
			</div>
		</section>
	);
}
