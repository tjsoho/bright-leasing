"use client";

{
	/* ***************************************************************
   SECTION 7 COMPONENT - Testimonials
   Simple section featuring:
   - Section title
   Used to showcase customer testimonials and reviews
****************************************************************/
}

import { HomePageProps } from "@/app/_config";
import { motion, useInView, easeOut } from "framer-motion";
import React from "react";

interface Section7Props {
	content: HomePageProps["content"];
}

export default function Section7({ content }: Section7Props) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		amount: 0.3,
	});

	const titleVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	const containerVariants = {
		hidden: {
			opacity: 0
		},
		show: {
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: easeOut,
				delay: 0.3
			}
		}
	};

	return (
		<>
			<section className="py-8 lg:py-16" ref={ref}>
				<div className="">
					<div className="space-y-8">
						<motion.h2
							className="text-4xl font-bold text-white text-left lg:text-center mb-16"
							variants={titleVariants}
							initial="hidden"
							animate={isInView ? "show" : "hidden"}
						>
							{content.section7title}
						</motion.h2>
					</div>

					<motion.div
						id="__clipara-embed"
						style={{ width: "100%" }}
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					></motion.div>
				</div>
			</section>
		</>
	);
}
