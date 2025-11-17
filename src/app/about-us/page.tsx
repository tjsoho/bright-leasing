'use client';

/* ************************************************************
						NOTES
************************************************************ */
// About Us page aligned with home and employees layouts
// Breaks content into branded visual sections with scroll animations
// All copy, icons, and imagery pull from admin-managed inputs

/* ************************************************************
						IMPORTS
************************************************************ */
import { useEffect, useState } from "react";
import getPage from "@/server-actions/page";
import {
	aboutUsPageFallbackData,
	AboutUsPageProps,
} from "./_config";
import Section1 from "@/components/about/Section1";
import Section2 from "@/components/about/Section2";
import Section3 from "@/components/about/Section3";
import Section4 from "@/components/about/Section4";
import Section5 from "@/components/about/Section5";
import Section6 from "@/components/about/Section6";
import Section7 from "@/components/about/Section7";

/* ************************************************************
						COMPONENTS
************************************************************ */
export default function AboutUsPage() {
	/* ************************************************************
							HOOKS
	************************************************************ */
	const [aboutPage, setAboutPage] = useState<AboutUsPageProps>(aboutUsPageFallbackData);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getPage<AboutUsPageProps>("about-us", aboutUsPageFallbackData);
			setAboutPage(data);
		};
		fetchData();
	}, []);

	/* ************************************************************
							FUNCTIONS
	************************************************************ */
	const hero = aboutPage.content.hero;
	const introduction = aboutPage.content.introduction;
	const differentiators = aboutPage.content.differentiators;
	const proof = aboutPage.content.proof;
	const closing = aboutPage.content.closing;
	const values = aboutPage.content.values;
	const section7 = aboutPage.content.section7;

	/* ************************************************************
							RENDER
	************************************************************ */
	return (
		<main className="min-h-screen bg-white text-brand-black">
			<div className="max-w-[1920px] mx-auto lg:px-8 py-4 pt-24">
				<Section1 hero={hero} />

				<div className="max-w-[1540px] mx-auto px-4">
					<Section2 introduction={introduction} />
					<Section3 differentiators={differentiators} />
					<Section4 proof={proof} />
					<Section5 closing={closing} />
					<Section6 values={values} />
				</div>

				<Section7 section7={section7} />
			</div>
		</main>
	);
}

/* ************************************************************
						EXPORTS
************************************************************ */
