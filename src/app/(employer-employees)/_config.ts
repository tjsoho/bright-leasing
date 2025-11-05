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
  section3icon: string;
  section3title: string;
  section3titleBold: boolean;
  section3paragraph: string;
  section3paragraphBold: boolean;
  section4title: string;
  section4titleBold: boolean;
  section4paragraph: string;
  section4paragraphBold: boolean;
  section4tabs: {
    tab1: string;
    tab1Icon?: string;
    tab2: string;
    tab2Icon?: string;
  };
  section4tab1items: TileItem[];
  section4tab2items: TileItem[];
  section5title: string;
  section5titleBold: boolean;
  section5paragraph: string;
  section5paragraphBold: boolean;
  section5tiles: TileItem[];
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
    section4tabs: {
      tab1: "Employees",
      tab1Icon: "/placeholder.jpg",
      tab2: "Business",
      tab2Icon: "/placeholder.jpg",
    },
    section4tab1items: [
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
    section4tab2items: [
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
  },
};

export const employeesPageFallbackData: EmployersEmployeesPageProps = {
  title: "Employees",
  description: "Employees page description",
  slug: "employees",
  content: employersPageFallbackData.content,
};
