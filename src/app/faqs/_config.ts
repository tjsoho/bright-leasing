import { BasePage } from "../types";

export type FAQsPageContent = {
  title: string;
  subheading: string;
};

export type FAQsPageProps = BasePage<FAQsPageContent>;

export const faqsPageFallbackData: FAQsPageProps = {
  slug: "faqs",
  title: "FAQs",
  description: "Frequently Asked Questions",
  content: {
    title: "Frequently Asked Questions",
    subheading: "Discover the most intelligent approach to vehicle ownership and unlock smarter ways to drive the car you want.",
  },
};






