/* ************************************************************
                        NOTES
************************************************************ */
// Marketing home page that stitches together all hero and feature sections
// Pulls CMS content dynamically and keeps SEO metadata in sync
/* ************************************************************
                        IMPORTS
************************************************************ */
import type { Metadata } from "next";
import getPage from "@/server-actions/page";
import { homePageFallbackData, HomePageProps } from "./_config";
import Hero from "../components/Home/Hero";
import Section2 from "../components/Home/Section2";
import Section3 from "../components/Home/Section3";
import Section5 from "../components/Home/Section5";
import Section4 from "@/components/Home/Section4";
import Section6 from "@/components/Home/Section6";
import Section7 from "@/components/Home/Section7";
import { buildPageMetadata } from "@/utils/seo";

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata("home");
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
	const homePage = await getPage<HomePageProps>("home", homePageFallbackData);

	/* ************************************************************
                            RENDER
    ************************************************************ */
	return (
		<main className="min-h-screen">
			<div className="max-w-[1920px] mx-auto lg:px-8 py-4 pt-24">
				{/********************** HERO - Primary Fold ************************/}
				<Hero content={homePage.content} />
				<div className="max-w-[1540px] mx-auto">
					{/********************** Section 2 - Value Props ************************/}
					<Section2 content={homePage.content} />
					{/********************** Section 3 - Benefits ************************/}
					<Section3 content={homePage.content} />
					{/********************** Section 4 - Experience ************************/}
					<Section4 content={homePage.content} />
					{/********************** Section 5 - Testimonials ************************/}
					<Section5 content={homePage.content} />
					{/********************** Section 6 - How It Works ************************/}
					<Section6 content={homePage.content} />
					{/********************** Section 7 - CTA ************************/}
					<Section7 content={homePage.content} />
				</div>
			</div>
		</main>
	);
}
