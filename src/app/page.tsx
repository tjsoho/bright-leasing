import getPage from "@/server-actions/page";
import { homePageFallbackData, HomePageProps } from "./_config";
import Hero from "../components/Home/Hero";
import Section2 from "../components/Home/Section2";
import Section3 from "../components/Home/Section3";
import Section5 from "../components/Home/Section5";
import Section4 from "@/components/Home/Section4";
export default async function Home() {
	const homePage = await getPage<HomePageProps>("home", homePageFallbackData);

	return (
		<main className="min-h-screen">
			<div className="max-w-[1920px] mx-auto lg:px-8 py-16">
				{/* ***************************************************************
				   HERO 
        ****************************************************************/}
				<Hero content={homePage.content} />
				<div className="max-w-[1540px] mx-auto">
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
				</div>
			</div>
		</main>
	);
}
