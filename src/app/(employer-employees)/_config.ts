import { AdditionalFAQ } from "../_config";
import { BasePage } from "../types";

interface TileItem {
  title: string;
  titleBold: boolean;
  description: string;
  descriptionBold: boolean;
  image: string;
}

export interface EmployersEmployeesPageContent {
  heroTitle: string;
  heroTitleBold?: boolean;
  heroParagraph: string;
  heroParagraphBold?: boolean;
  heroButtonText: string;
  heroImage: string;
  section2title: string;
  section2titleBold: boolean;
  section2paragraph: string;
  section2paragraphBold: boolean;
  section2tile1title: string;
  section2tile1titleBold: boolean;
  section2tile1description: string;
  section2tile1descriptionBold: boolean;
  section2tile1icon: string;
  section2tile2title: string;
  section2tile2titleBold: boolean;
  section2tile2description: string;
  section2tile2descriptionBold: boolean;
  section2tile2icon: string;
  section2tile3title: string;
  section2tile3titleBold: boolean;
  section2tile3description: string;
  section2tile3descriptionBold: boolean;
  section2tile3icon: string;
  section2tile4title: string;
  section2tile4titleBold: boolean;
  section2tile4description: string;
  section2tile4descriptionBold: boolean;
  section2tile4icon: string;
  section2tile5title: string;
  section2tile5titleBold: boolean;
  section2tile5description: string;
  section2tile5descriptionBold: boolean;
  section2tile5icon: string;
  section2tile1bgColor: string;
  section2tile2bgColor: string;
  section2tile3bgColor: string;
  section2tile4bgColor: string;
  section2tile5bgColor: string;
  section3icon: string;
  section3title: string;
  section3titleBold: boolean;
  section3paragraph: string;
  section3paragraphBold: boolean;
  section4title: string;
  section4titleBold: boolean;
  section4paragraph: string;
  section4paragraphBold: boolean;
  section4step1title: string;
  section4step1titleBold: boolean;
  section4step1description: string;
  section4step1descriptionBold: boolean;
  section4step1icon: string;
  section4step2title: string;
  section4step2titleBold: boolean;
  section4step2description: string;
  section4step2descriptionBold: boolean;
  section4step2icon: string;
  section4step3title: string;
  section4step3titleBold: boolean;
  section4step3description: string;
  section4step3descriptionBold: boolean;
  section4step3icon: string;
  section4step4title: string;
  section4step4titleBold: boolean;
  section4step4description: string;
  section4step4descriptionBold: boolean;
  section4step4icon: string;
  section9title: string;
  section9titleBold: boolean;
  section9paragraph: string;
  section9paragraphBold: boolean;
  section9tabs: {
    tab1: string;
    tab1Icon?: string;
    tab2: string;
    tab2Icon?: string;
  };
  section9tab1items: TileItem[];
  section9tab2items: TileItem[];
  section5title: string;
  section5titleBold: boolean;
  section5paragraph: string;
  section5paragraphBold: boolean;
  section5tiles: TileItem[];
  section5tile1bgColor: string;
  section5tile2bgColor: string;
  section5tile3bgColor: string;
  section5tile4bgColor: string;
  section6title: string;
  section6titleBold: boolean;
  section6paragraph: string;
  section6paragraphBold: boolean;
  section7title: string;
  section7titleBold: boolean;
  section7description: string;
  section7descriptionBold: boolean;
  section7buttonText: string;
  section7image: string;
  section8title: string;
  section8titleBold: boolean;
  section8image: string;
  section8faq1question: string;
  section8faq1questionBold: boolean;
  section8faq1answer: string;
  section8faq1answerBold: boolean;
  section8faq2question: string;
  section8faq2questionBold: boolean;
  section8faq2answer: string;
  section8faq2answerBold: boolean;
  section8faq3question: string;
  section8faq3questionBold: boolean;
  section8faq3answer: string;
  section8faq3answerBold: boolean;
  section8faq4question: string;
  section8faq4questionBold: boolean;
  section8faq4answer: string;
  section8faq4answerBold: boolean;
  additionalSection8Faqs: AdditionalFAQ[];
  // Employees Only Section 2
  employeesSection2title: string;
  employeesSection2titleBold: boolean;
  employeesSection2subheading: string;
  employeesSection2subheadingBold: boolean;
  employeesSection2box1title: string;
  employeesSection2box1titleBold: boolean;
  employeesSection2box1content: string;
  employeesSection2box1contentBold: boolean;
  employeesSection2box1icon: string;
  employeesSection2box1bgColor: string;
  employeesSection2box2title: string;
  employeesSection2box2titleBold: boolean;
  employeesSection2box2content: string;
  employeesSection2box2contentBold: boolean;
  employeesSection2box2icon: string;
  employeesSection2box2bgColor: string;
  employeesSection2box3title: string;
  employeesSection2box3titleBold: boolean;
  employeesSection2box3content: string;
  employeesSection2box3contentBold: boolean;
  employeesSection2box3icon: string;
  employeesSection2box3bgColor: string;
  employeesSection2box4title: string;
  employeesSection2box4titleBold: boolean;
  employeesSection2box4content: string;
  employeesSection2box4contentBold: boolean;
  employeesSection2box4icon: string;
  employeesSection2box4bgColor: string;
  employeesSection2box5title: string;
  employeesSection2box5titleBold: boolean;
  employeesSection2box5content: string;
  employeesSection2box5contentBold: boolean;
  employeesSection2box5icon: string;
  employeesSection2box5bgColor: string;
  employeesSection2box6title: string;
  employeesSection2box6titleBold: boolean;
  employeesSection2box6content: string;
  employeesSection2box6contentBold: boolean;
  employeesSection2box6icon: string;
  employeesSection2box6bgColor: string;
  // Employees Only Section 5
  employeesSection5title: string;
  employeesSection5titleBold: boolean;
  employeesSection5paragraph: string;
  employeesSection5paragraphBold: boolean;
  employeesSection5tiles: TileItem[];
  employeesSection5tile1bgColor: string;
  employeesSection5tile2bgColor: string;
  employeesSection5tile3bgColor: string;
  employeesSection5tile4bgColor: string;
  employeesSection5tile5bgColor: string;
  employeesSection5tile6bgColor: string;
  employeesSection5tile7bgColor: string;
  employeesSection5tile8bgColor: string;
  // Employees Only Section 7a
  employeesSection7atitle: string;
  employeesSection7atitleBold: boolean;
  employeesSection7asubheading: string;
  employeesSection7asubheadingBold: boolean;
  employeesSection7aimage1: string;
  employeesSection7aimage2: string;
}

export type EmployersEmployeesPageProps =
  BasePage<EmployersEmployeesPageContent>;

export const employersPageFallbackData: EmployersEmployeesPageProps = {
  title: "Employers",
  description: "Employers page description",
  slug: "employers",
  content: {
    heroTitle: "Transform Your Employee Benefits with novated leasing.",
    heroTitleBold: true,
    heroParagraph:
      "Give your employees more take-home pay while attracting top talent with zero cost or admin burden to your business.\n\nBright Leasing makes novated leasing simple, transparent, and rewarding for everyone.\n\nOur comprehensive employer pack shows you exactly how to implement a benefit that employees actually use and love - from setup to ongoing management, we handle everything.",
    heroParagraphBold: false,
    heroButtonText: "Get Started",
    heroImage: "/placeholder.jpg",
    section2title: "Why Offer Novated Leasing",
    section2titleBold: false,
    section2paragraph:
      "We make car leasing simple, transparent, and rewarding — helping your employees take home more pay while your business saves time and costs.",
    section2paragraphBold: false,
    section2tile1title: "Service That Spoils",
    section2tile1titleBold: false,
    section2tile1description:
      "Fast quotes, proactive updates, and real humans, with extensive industry expertise, who pick up the phone when you need support.",
    section2tile1descriptionBold: false,
    section2tile1icon: "/placeholder.jpg",
    section2tile2title: "Best Employee Outcomes",
    section2tile2titleBold: false,
    section2tile2description:
      "We optimize total package value — finance, running costs, and tax position — not just sticker price.",
    section2tile2descriptionBold: false,
    section2tile2icon: "/placeholder.jpg",
    section2tile3title: "Lowest Possible Cost",
    section2tile3titleBold: false,
    section2tile3description:
      "Fleet buying power, no junk add-ons, and low interest finance keeps costs down.",
    section2tile3descriptionBold: false,
    section2tile3icon: "/placeholder.jpg",
    section2tile4title: "EV Specialists",
    section2tile4titleBold: false,
    section2tile4description:
      "Plain-English guidance, ATO-aligned methods to maximise tax savings using available EV specific tax legislation.",
    section2tile4descriptionBold: false,
    section2tile4icon: "/placeholder.jpg",
    section2tile5title: "Additional Benefit",
    section2tile5titleBold: false,
    section2tile5description: "Add your fifth benefit description here.",
    section2tile5descriptionBold: false,
    section2tile5icon: "/placeholder.jpg",
    section2tile1bgColor: "white",
    section2tile2bgColor: "white",
    section2tile3bgColor: "white",
    section2tile4bgColor: "white",
    section2tile5bgColor: "white",
    section3icon: "/placeholder.jpg",
    section3title: "Auto-UX Tip:",
    section3titleBold: true,
    section3paragraph:
      "Did you know you can get a Novated Lease on new or used cars, or event a car you already own?",
    section3paragraphBold: false,
    section4title: "How it works",
    section4titleBold: false,
    section4paragraph:
      "We make car leasing simple, transparent, and rewarding — helping your employees take home more pay while your business saves time and costs.",
    section4paragraphBold: false,
    section4step1title: "More Take-Home Pay",
    section4step1titleBold: false,
    section4step1description:
      "Using pre-tax dollars for their car and running costs puts more money in their pockets every pay cycle.",
    section4step1descriptionBold: false,
    section4step1icon: "/placeholder.jpg",
    section4step2title: "Less Hassle",
    section4step2titleBold: false,
    section4step2description:
      "One fixed, set-and-forget payment covers most car costs — no juggling multiple bills or suppliers.",
    section4step2descriptionBold: false,
    section4step2icon: "/placeholder.jpg",
    section4step3title: "Choice & Transparency",
    section4step3titleBold: false,
    section4step3description:
      "We show every dollar with no hidden add-ons, giving employees complete visibility into their expenses.",
    section4step3descriptionBold: false,
    section4step3icon: "/placeholder.jpg",
    section4step4title: "EV Advantage",
    section4step4titleBold: false,
    section4step4description:
      "Eligible EVs can be FBT-exempt, delivering outsized savings that make electric vehicles incredibly attractive.",
    section4step4descriptionBold: false,
    section4step4icon: "/placeholder.jpg",
    section9title: "How it works",
    section9titleBold: false,
    section9paragraph:
      "We make car leasing simple, transparent, and rewarding — helping your employees take home more pay while your business saves time and costs.",
    section9paragraphBold: false,
    section9tabs: {
      tab1: "Employees",
      tab1Icon: "/placeholder.jpg",
      tab2: "Business",
      tab2Icon: "/placeholder.jpg",
    },
    section9tab1items: [
      {
        title: "More Take-Home Pay",
        titleBold: false,
        description:
          "Using pre-tax dollars for their car and running costs puts more money in their pockets every pay cycle.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "",
        titleBold: false,
        description: "",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Less Hassle",
        titleBold: false,
        description:
          "One fixed, set-and-forget payment covers most car costs — no juggling multiple bills or suppliers.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Choice & Transparency",
        titleBold: false,
        description:
          "We show every dollar with no hidden add-ons, giving employees complete visibility into their expenses.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "EV Advantage",
        titleBold: false,
        description:
          "Eligible EVs can be FBT-exempt, delivering outsized savings that make electric vehicles incredibly attractive.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
    ],
    section9tab2items: [
      {
        title: "More Take-Home Pay",
        titleBold: false,
        description:
          "Using pre-tax dollars for their car and running costs puts more money in their pockets every pay cycle.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "",
        titleBold: false,
        description: "",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Less Hassle",
        titleBold: false,
        description:
          "One fixed, set-and-forget payment covers most car costs — no juggling multiple bills or suppliers.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Choice & Transparency",
        titleBold: false,
        description:
          "We show every dollar with no hidden add-ons, giving employees complete visibility into their expenses.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "EV Advantage",
        titleBold: false,
        description:
          "Eligible EVs can be FBT-exempt, delivering outsized savings that make electric vehicles incredibly attractive.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
    ],
    section5title: "Why Choose Bright / What’s included",
    section5titleBold: false,
    section5paragraph:
      "Your team members gain significant financial advantages and convenience through our compWe've streamlined novated leasing into five simple steps that require minimal effort from your team while delivering maximum value to your employees.rehensive novated leasing program.",
    section5paragraphBold: false,
    section5tiles: [
      {
        title: "Sign & Set",
        titleBold: false,
        description:
          "No lock-in contracts, we simply setup your free account — no lengthy implementation process.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Onboard Your People",
        titleBold: false,
        description:
          "Completely outsourced solution. We run a comprehensive launch, and answer all the questions.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Employees Choose",
        titleBold: false,
        description:
          "New or used vehicles, we secure fleet pricing, and package all running costs transparently.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Drive & Save",
        titleBold: false,
        description:
          "We manage the entire lease lifecycle including all running costs along with compliance and comprehensive reporting.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Payroll Clicks",
        titleBold: false,
        description:
          "We send an easy payroll setup file, and deductions start the next pay cycle — seamless integration guaranteed.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
    ],
    section5tile1bgColor: "yellow",
    section5tile2bgColor: "teal",
    section5tile3bgColor: "grey",
    section5tile4bgColor: "teal",
    section6title: "Instant Savings Check",
    section6titleBold: false,
    section6paragraph:
      "Drop in your salary and car price to see how much you could save.",
    section6paragraphBold: false,
    section7title: "For employers: hassle-free salary packaging",
    section7titleBold: false,
    section7description:
      "Engage and retain talent with a trusted, low-effort benefit. We’ll handle onboarding, payroll setup, and employee education end-to-end. ",
    section7descriptionBold: false,
    section7buttonText: "Book a 15-min intro",
    section7image: "/placeholder.jpg",
    section8title: "Frequently Asked Questions",
    section8titleBold: false,
    section8image: "/placeholder.jpg",
    section8faq1question: "Who can salary-package a novated lease?",
    section8faq1questionBold: false,
    section8faq1answer:
      "Most employees can salary-package a novated lease, but it depends on your employer's policies and your employment agreement. Generally, full-time and part-time employees are eligible, while contractors and casual workers may have restrictions.",
    section8faq1answerBold: false,
    section8faq2question: "Do I have to choose an EV?",
    section8faq2questionBold: false,
    section8faq2answer:
      "No, you can choose any vehicle that meets your employer's novated lease policy. While EVs often provide better tax benefits, you can select from petrol, hybrid, or electric vehicles based on your preferences and budget.",
    section8faq2answerBold: false,
    section8faq3question: "What's included in the budget?",
    section8faq3questionBold: false,
    section8faq3answer:
      "Your novated lease budget typically includes the vehicle lease payments, registration, insurance, maintenance, fuel, and other running costs. We'll help you create a comprehensive budget that covers all your vehicle expenses.",
    section8faq3answerBold: false,
    section8faq4question: "How long does setup take?",
    section8faq4questionBold: false,
    section8faq4answer:
      "The setup process usually takes 2-4 weeks from application to vehicle delivery. This includes employer approval, lease documentation, vehicle sourcing, and final delivery arrangements.",
    section8faq4answerBold: false,
    additionalSection8Faqs: [],
    // Employees Only Section 2
    employeesSection2title: "Employee Benefits",
    employeesSection2titleBold: false,
    employeesSection2subheading:
      "Discover the advantages of novated leasing for employees",
    employeesSection2subheadingBold: false,
    employeesSection2box1title: "More Take-Home Pay",
    employeesSection2box1titleBold: false,
    employeesSection2box1content:
      "Using pre-tax dollars for your car and running costs puts more money in your pocket every pay cycle.",
    employeesSection2box1contentBold: false,
    employeesSection2box1icon: "/placeholder.jpg",
    employeesSection2box1bgColor: "yellow",
    employeesSection2box2title: "Less Hassle",
    employeesSection2box2titleBold: false,
    employeesSection2box2content:
      "One fixed, set-and-forget payment covers most car costs — no juggling multiple bills or suppliers.",
    employeesSection2box2contentBold: false,
    employeesSection2box2icon: "/placeholder.jpg",
    employeesSection2box2bgColor: "teal",
    employeesSection2box3title: "Choice & Transparency",
    employeesSection2box3titleBold: false,
    employeesSection2box3content:
      "We show every dollar with no hidden add-ons, giving you complete visibility into your expenses.",
    employeesSection2box3contentBold: false,
    employeesSection2box3icon: "/placeholder.jpg",
    employeesSection2box3bgColor: "grey",
    employeesSection2box4title: "EV Advantage",
    employeesSection2box4titleBold: false,
    employeesSection2box4content:
      "Eligible EVs can be FBT-exempt, delivering outsized savings that make electric vehicles incredibly attractive.",
    employeesSection2box4contentBold: false,
    employeesSection2box4icon: "/placeholder.jpg",
    employeesSection2box4bgColor: "white",
    employeesSection2box5title: "Flexible Options",
    employeesSection2box5titleBold: false,
    employeesSection2box5content:
      "Choose from new or used vehicles, with flexible lease terms that suit your lifestyle and budget.",
    employeesSection2box5contentBold: false,
    employeesSection2box5icon: "/placeholder.jpg",
    employeesSection2box5bgColor: "yellow",
    employeesSection2box6title: "Expert Support",
    employeesSection2box6titleBold: false,
    employeesSection2box6content:
      "Our team of experts guides you through every step, from vehicle selection to ongoing lease management.",
    employeesSection2box6contentBold: false,
    employeesSection2box6icon: "/placeholder.jpg",
    employeesSection2box6bgColor: "teal",
    // Employees Only Section 5
    employeesSection5title: "Why Choose Bright / What's included",
    employeesSection5titleBold: false,
    employeesSection5paragraph:
      "Your team members gain significant financial advantages and convenience through our comprehensive novated leasing program.",
    employeesSection5paragraphBold: false,
    employeesSection5tiles: [
      {
        title: "Sign & Set",
        titleBold: false,
        description:
          "No lock-in contracts, we simply setup your free account — no lengthy implementation process.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Onboard Your People",
        titleBold: false,
        description:
          "Completely outsourced solution. We run a comprehensive launch, and answer all the questions.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Employees Choose",
        titleBold: false,
        description:
          "New or used vehicles, we secure fleet pricing, and package all running costs transparently.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Drive & Save",
        titleBold: false,
        description:
          "We manage the entire lease lifecycle including all running costs along with compliance and comprehensive reporting.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Flexible Options",
        titleBold: false,
        description:
          "Choose from new or used vehicles, with flexible lease terms that suit your lifestyle and budget.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Expert Support",
        titleBold: false,
        description:
          "Our team of experts guides you through every step, from vehicle selection to ongoing lease management.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Transparent Pricing",
        titleBold: false,
        description:
          "We show every dollar with no hidden add-ons, giving you complete visibility into your expenses.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
      {
        title: "Tax Benefits",
        titleBold: false,
        description:
          "Maximize your tax savings with our comprehensive novated leasing solutions tailored to your needs.",
        descriptionBold: false,
        image: "/placeholder.jpg",
      },
    ],
    employeesSection5tile1bgColor: "yellow",
    employeesSection5tile2bgColor: "teal",
    employeesSection5tile3bgColor: "grey",
    employeesSection5tile4bgColor: "teal",
    employeesSection5tile5bgColor: "yellow",
    employeesSection5tile6bgColor: "teal",
    employeesSection5tile7bgColor: "grey",
    employeesSection5tile8bgColor: "white",
    // Employees Only Section 7a
    employeesSection7atitle: "Comparison",
    employeesSection7atitleBold: false,
    employeesSection7asubheading:
      "See the difference between traditional leasing and novated leasing",
    employeesSection7asubheadingBold: false,
    employeesSection7aimage1: "/placeholder.jpg",
    employeesSection7aimage2: "/placeholder.jpg",
  },
};

export const employeesPageFallbackData: EmployersEmployeesPageProps = {
  title: "Employees",
  description: "Employees page description",
  slug: "employees",
  content: employersPageFallbackData.content,
};
