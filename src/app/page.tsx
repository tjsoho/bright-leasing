import getPage from "@/server-actions/page";
import { homePageFallbackData, HomePageProps } from "./_config";
import Hero from "../components/Home/Hero";
import Section1 from "../components/Home/Section1";
import Section2 from "../components/Home/Section2";
import Section3 from "../components/Home/Section3";
import Section5 from "../components/Home/Section5";
import Section6 from "../components/Home/Section6";
import Section7 from "../components/Home/Section7";
import Section8 from "../components/Home/Section8";
import Section9 from "../components/Home/Section9";
import Section10 from "../components/Home/Section10";
import Section11 from "../components/Home/Section11";
import Section4 from "@/components/Home/Section4";
export default async function Home() {
	const homePage = await getPage<HomePageProps>("home", homePageFallbackData);

	return (
		<main className="min-h-screen bg-black">
			<div className="max-w-[1920px] mx-auto lg:px-8 py-16">

				{/* ***************************************************************
				   HERO 
        ****************************************************************/}
				<Hero content={homePage.content} />
				<div className="max-w-[1540px] mx-auto">
					{/* ***************************************************************
				   SECTION 1 
        ****************************************************************/}
					<div className="py-8">
						<Section1 content={homePage.content} />
					</div>
					{/* ***************************************************************
				   SECTION 2 
        ****************************************************************/}
					<Section2 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 3 
        ****************************************************************/}
					<Section3 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 4 
        ****************************************************************/}
					<Section4 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 5 
        ****************************************************************/}
					<Section5 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 6 - Endorsements
        ****************************************************************/}
					<Section6 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 7 - Testimonials
        ****************************************************************/}
					<Section7 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 8 - Mission
        ****************************************************************/}
					<Section8 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 9 
        ****************************************************************/}
					<Section9 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 10 - Support
        ****************************************************************/}
					<Section10 content={homePage.content} />
					{/* ***************************************************************
				   SECTION 11 - Final Section
        ****************************************************************/}
					<Section11 content={homePage.content} />
				</div>
			</div>
		</main>
	);
}
