export type SeoPageConfig = {
  slug: string;
  path: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords?: string;
};

export const seoPages: SeoPageConfig[] = [
  {
    slug: "home",
    path: "/",
    label: "Home",
    defaultTitle: "Bright Leasing | Smarter Novated Leasing",
    defaultDescription:
      "Discover the smartest way to own and run a car with Bright Leasing's novated leasing solutions tailored for Australians.",
    defaultKeywords:
      "bright leasing, novated leasing, car leasing, salary packaging",
  },
  {
    slug: "about",
    path: "/about-us",
    label: "About Us",
    defaultTitle: "About Bright Leasing | Love Every Step",
    defaultDescription:
      "Learn about Bright Leasing's mission, values, and the team helping Australians unlock smarter vehicle ownership.",
    defaultKeywords: "about bright leasing, company mission, team",
  },
  {
    slug: "contact",
    path: "/contact",
    label: "Contact",
    defaultTitle: "Contact Bright Leasing",
    defaultDescription:
      "Get in touch with the Bright Leasing team to discuss novated leasing, employer programs, or support.",
    defaultKeywords: "contact bright leasing, novated leasing help",
  },
  {
    slug: "employees",
    path: "/employees",
    label: "Employees",
    defaultTitle: "Novated Leasing for Employees | Bright Leasing",
    defaultDescription:
      "See how employees can take advantage of novated leasing to save on running costs and drive the car they love.",
    defaultKeywords:
      "employee novated lease, salary package car, employee benefits",
  },
  {
    slug: "employers",
    path: "/employers",
    label: "Employers",
    defaultTitle: "Employer Solutions | Bright Leasing",
    defaultDescription:
      "Discover Bright Leasing's employer programs that attract and retain talent with seamless novated leasing.",
    defaultKeywords:
      "employer novated leasing, employee benefits program, HR perks",
  },
  {
    slug: "faqs",
    path: "/faqs",
    label: "FAQs",
    defaultTitle: "Frequently Asked Questions | Bright Leasing",
    defaultDescription:
      "Find answers to common questions about novated leasing, costs, eligibility, and Bright Leasing services.",
    defaultKeywords: "novated lease faq, bright leasing faq",
  },
  {
    slug: "blog",
    path: "/blog",
    label: "Blog",
    defaultTitle: "Bright Leasing Articles & Insights",
    defaultDescription:
      "Read the latest articles, news, and tips from Bright Leasing on novated leasing and automotive finance.",
    defaultKeywords: "novated leasing blog, bright leasing articles",
  },
  {
    slug: "blog-post",
    path: "/blog/posts/[slug]",
    label: "Blog Post",
    defaultTitle: "Bright Leasing Article",
    defaultDescription:
      "An in-depth article from Bright Leasing covering novated leasing insights, updates, and advice.",
    defaultKeywords: "bright leasing article, novated leasing tips",
  },
  {
    slug: "science",
    path: "/science",
    label: "Science",
    defaultTitle: "Bright Science Program",
    defaultDescription:
      "Explore Bright Leasing's science-backed initiatives, research, and member stories.",
    defaultKeywords: "bright science, research, member stories",
  },
  {
    slug: "science-detail",
    path: "/science/[slug]",
    label: "Science Detail",
    defaultTitle: "Bright Science Article",
    defaultDescription:
      "Detailed insights from the Bright Science library sharing research and stories.",
    defaultKeywords: "bright science article",
  },
  {
    slug: "team",
    path: "/team",
    label: "Team",
    defaultTitle: "Meet the Bright Leasing Team",
    defaultDescription:
      "Get to know the Bright Leasing experts supporting individuals and employers across Australia.",
    defaultKeywords: "bright leasing team, company team",
  },
  {
    slug: "team-detail",
    path: "/team/[slug]",
    label: "Team Member",
    defaultTitle: "Bright Leasing Team Member",
    defaultDescription:
      "Learn more about a Bright Leasing team member and how they support smarter leasing.",
    defaultKeywords: "bright leasing staff",
  },
  {
    slug: "podcasts",
    path: "/podcasts",
    label: "Podcasts",
    defaultTitle: "Bright Leasing Podcasts",
    defaultDescription:
      "Listen to Bright Leasing podcasts covering novated leasing, finance, and automotive trends.",
    defaultKeywords: "bright leasing podcast, novated leasing audio",
  },
  {
    slug: "services",
    path: "/services",
    label: "Services",
    defaultTitle: "Bright Leasing Services & Programs",
    defaultDescription:
      "Discover the complete range of Bright Leasing services for employees and employers.",
    defaultKeywords: "bright leasing services, programs",
  },
  {
    slug: "work",
    path: "/work",
    label: "Work",
    defaultTitle: "Bright Leasing Work Platform",
    defaultDescription:
      "See how Bright Leasing supports workplaces with flexible novated leasing programs.",
    defaultKeywords: "bright leasing work platform",
  },
  {
    slug: "privacy-policy",
    path: "/privacy-policy",
    label: "Privacy Policy",
    defaultTitle: "Privacy Policy | Bright Leasing",
    defaultDescription:
      "Read Bright Leasing's privacy policy and learn how we protect your personal information.",
    defaultKeywords: "privacy policy, bright leasing privacy",
  },
  {
    slug: "terms-and-conditions",
    path: "/terms-and-conditions",
    label: "Terms & Conditions",
    defaultTitle: "Terms & Conditions | Bright Leasing",
    defaultDescription:
      "Review Bright Leasing's terms and conditions for using our platform and services.",
    defaultKeywords: "terms and conditions, bright leasing terms",
  },
  {
    slug: "terms-of-use",
    path: "/terms-of-use",
    label: "Terms of Use",
    defaultTitle: "Terms of Use | Bright Leasing",
    defaultDescription:
      "Understand the terms of use governing your access to Bright Leasing's website and services.",
    defaultKeywords: "terms of use, bright leasing",
  },
  {
    slug: "reviews",
    path: "/reviews",
    label: "Reviews",
    defaultTitle: "Bright Leasing Reviews",
    defaultDescription:
      "Hear from Bright Leasing customers and partners about their novated leasing experience.",
    defaultKeywords: "bright leasing reviews, customer stories",
  },
];


