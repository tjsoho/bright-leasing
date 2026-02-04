import { BasePage } from "../types";

export type BlogPageContent = {
  title: string;
  subheading: string;
};

export type BlogPageProps = BasePage<BlogPageContent>;

export const blogPageFallbackData: BlogPageProps = {
  slug: "blog",
  title: "Blog Page",
  description: "Bright Leasing articles",
  content: {
    title: "Articles.",
    subheading:
      "Stay informed with our latest insights, tips, and updates on novated leasing and automotive finance.",
  },
};





