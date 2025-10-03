import { BasePage } from "./types";

export type HomePageContent = {
	heroImage: string;
	heroTitle: string;
	heroParagraph: string;
	section2title: string;
	section2paragraph: string;
	section3title: string;
	section3tile1title: string;
	section3tile1description: string;
	section3tile2title: string;
	section3tile2description: string;
	section3tile3title: string;
	section3tile3description: string;
};

export type HomePageProps = BasePage<HomePageContent>;

export const homePageFallbackData: HomePageProps = {
	title: "Home",
	description: "Home page",
	slug: "home",
	content: {
		heroImage: "/placeholder.jpg",
		heroTitle: "The smartest way to own and run a car",
		heroParagraph:
			"Novated leasing made easy — save money, skip the hassle, and enjoy the car you really want.",
		section2title: "What is novated leasing?",
		section2paragraph:
			"A novated lease is a simple three-way agreement between you, your employer, and Bright Leasing. Your lease payments (plus running costs like fuel, servicing, rego, and insurance) are bundled into your pre-tax salary — meaning fewer headaches and lots of savings.",
		section3title: "Why Choose Bright Leasing",
		section3tile1title: "Great value, zero fluff",
		section3tile1description:
			"Industry-leading inclusions and sharp fees without the upsell.",
		section3tile2title: "Human when it matters",
		section3tile2description: "Talk to a real expert, not a call centre.",
		section3tile3title: "Flexible and transparent",
		section3tile3description:
			"Clear terms, no hidden fees, and options that work for you.",
	},
};
