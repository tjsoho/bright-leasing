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
	section4title: string;
	section4step1title: string;
	section4step1description: string;
	section4step2title: string;
	section4step2description: string;
	section4step3title: string;
	section4step3description: string;
	section4step4title: string;
	section4step4description: string;
	section5title: string;
	section5description: string;
	section5buttonText: string;
	section5image: string;
	section6title: string;
	section6tile1title: string;
	section6tile1description: string;
	section6tile2title: string;
	section6tile2description: string;
	section6tile3title: string;
	section6tile3description: string;
	section7title: string;
	section7faq1question: string;
	section7faq1answer: string;
	section7faq2question: string;
	section7faq2answer: string;
	section7faq3question: string;
	section7faq3answer: string;
	section7faq4question: string;
	section7faq4answer: string;
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
		section4title: "How It Works",
		section4step1title: "Choose Your Car",
		section4step1description: "Bring your dream car or pick from our network.",
		section4step2title: "Set Up Your Lease",
		section4step2description:
			"Three-way agreement between you, your employer, and Bright.",
		section4step3title: "Salary Packaging Saves You Money",
		section4step3description:
			"Lease + running costs come from your pre-tax pay.",
		section4step4title: "Drive Away Happy",
		section4step4description:
			"Pay for your running costs using your Bright digital card and let us handle everything else.",
		section5title: "For employers: hassle-free salary packaging",
		section5description:
			"Engage and retain talent with a trusted, low-effort benefit. We'll handle onboarding, payroll setup, and employee education end-to-end.",
		section5buttonText: "Start in 60 seconds",
		section5image: "/placeholder.jpg",
		section6title: "Customer Success Stories",
		section6tile1title: "Sarah's Journey",
		section6tile1description:
			"Saved $3,000 annually with our novated lease program while driving her dream Tesla.",
		section6tile2title: "Mike's Experience",
		section6tile2description:
			"Seamless setup process and excellent customer support throughout his lease term.",
		section6tile3title: "Lisa's Savings",
		section6tile3description:
			"Reduced her car expenses by 40% with our comprehensive salary packaging solution.",
		section7title: "Frequently Asked Questions",
		section7faq1question: "Who can salary-package a novated lease?",
		section7faq1answer:
			"Most employees can salary-package a novated lease, but it depends on your employer's policies and your employment agreement. Generally, full-time and part-time employees are eligible, while contractors and casual workers may have restrictions.",
		section7faq2question: "Do I have to choose an EV?",
		section7faq2answer:
			"No, you can choose any vehicle that meets your employer's novated lease policy. While EVs often provide better tax benefits, you can select from petrol, hybrid, or electric vehicles based on your preferences and budget.",
		section7faq3question: "What's included in the budget?",
		section7faq3answer:
			"Your novated lease budget typically includes the vehicle lease payments, registration, insurance, maintenance, fuel, and other running costs. We'll help you create a comprehensive budget that covers all your vehicle expenses.",
		section7faq4question: "How long does setup take?",
		section7faq4answer:
			"The setup process usually takes 2-4 weeks from application to vehicle delivery. This includes employer approval, lease documentation, vehicle sourcing, and final delivery arrangements.",
	},
};
