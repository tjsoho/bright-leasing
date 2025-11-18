import { BasePage } from "../types";

export type AboutNarrativeBlock = {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor?: string;
};

export type AboutDifferentiator = {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor?: string;
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
  bgColor?: string;
};

export type AboutClosingTile = {
  title: string;
  titleBold?: boolean;
  description: string;
  descriptionBold?: boolean;
  image: string;
  bgColor?: string;
};

export type AboutClosing = {
  title: string;
  titleBold?: boolean;
  paragraph: string;
  paragraphBold?: boolean;
  tiles: AboutClosingTile[];
};

export type AboutValues = {
  title: string;
  description: string;
  blocks: AboutNarrativeBlock[];
};

export type AboutSection7 = {
  title: string;
  titleBold: boolean;
  description: string;
  descriptionBold: boolean;
  buttonText: string;
  image: string;
};

export type AboutUsPageContent = {
  youtubeVideoId?: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    ctaLabel: string;
    ctaLink: string;
  };
  section1a: {
    title: string;
    titleBold: boolean;
    description: string;
    descriptionBold: boolean;
    image: string;
    imageAlt: string;
  };
  introduction?: {
    eyebrow: string;
    title: string;
    description: string;
    blocks: AboutNarrativeBlock[];
  };
  differentiators: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutDifferentiator[];
  };
  proof: {
    eyebrow: string;
    title: string;
    description: string;
    stats: AboutStat[];
  };
  closing: AboutClosing;
  values: AboutValues;
  section7?: AboutSection7;
};

export type AboutUsPageProps = BasePage<AboutUsPageContent>;

export const aboutUsPageFallbackData: AboutUsPageProps = {
  title: "About",
  description: "About Bright Leasing",
  slug: "about",
  content: {
    youtubeVideoId: "",
    hero: {
      eyebrow: "About Bright Leasing",
      title: "A Brighter Way to Lease",
      description:
        "Most of us need a car — and the costs are unavoidable. But the way you pay for those costs can make a big difference. Novated leasing is an incredible way to drive the car you love while saving money on everyday expenses like finance, fuel, servicing, insurance and registration.",
      image: "/images/brightlogo.png",
      imageAlt: "Bright Leasing team collaborating",
      ctaLabel: "Talk with a specialist",
      ctaLink: "/contact",
    },
    section1a: {
      title: "It shouldn't feel complicated",
      titleBold: false,
      description:
        "It shouldn't feel complicated. With decades in the industry, we saw the gap between how novated leasing works and how it's often experienced: jargon, complex structures, and sales-first conversations. We built Bright Leasing to change that. What sets us apart is our commitment to clarity, transparency, and putting people first.",
      descriptionBold: false,
      image: "/images/brightlogo.png",
      imageAlt: "Bright Leasing approach",
    },
    introduction: {
      eyebrow: "Our Perspective",
      title: "Clarity over complexity",
      description:
        "We built Bright Leasing to close the gap between how novated leasing works and how it’s experienced.",
      blocks: [
        {
          id: "experience",
          title: "Decades of hands-on expertise",
          description:
            "With decades in the industry, we saw jargon-heavy, sales-first conversations hold people back. We created Bright to simplify every step.",
          image: "/images/brightlogo.png",
        },
        {
          id: "approach",
          title: "Technology that feels human",
          description:
            "We combine smart automation with people who care. Instead of adding complexity, we remove it. Instead of losing the human touch, we strengthen it.",
          image: "/images/bwlogo.png",
        },
        {
          id: "trust",
          title: "Trusted by thousands",
          description:
            "Thousands of individuals and companies rely on us to save money, manage car costs, and feel supported from the first conversation to the end of their lease.",
          image: "/images/brightlogo.png",
        },
        {
          id: "purpose",
          title: "Purpose-led guidance",
          description:
            "Our purpose is simple: reshape how people experience novated leasing—make it clear, make it easy, make it feel good.",
          image: "/images/bwlogo.png",
        },
      ],
    },
    differentiators: {
      eyebrow: "Why Bright",
      title: "What sets us apart",
      description:
        "Great service isn't an add-on; it's the standard. If novated leasing isn't the right fit, we'll say so.",
      items: [
        {
          id: "clarity",
          title: "Clarity first",
          description:
            "Plain-language coaching that makes every dollar and decision easy to understand.",
          icon: "/globe.svg",
          bgColor: "yellow",
        },
        {
          id: "support",
          title: "People-first support",
          description:
            "Dedicated specialists who stay with you long after sign-up to keep costs predictable.",
          icon: "/window.svg",
          bgColor: "teal",
        },
        {
          id: "technology",
          title: "Smarter technology",
          description:
            "Tools that surface the right insights at the right time so every experience feels effortless.",
          icon: "/file.svg",
          bgColor: "grey",
        },
        {
          id: "transparency",
          title: "Complete transparency",
          description:
            "No hidden fees, no surprises. We believe in honest communication and clear expectations from day one.",
          icon: "/globe.svg",
          bgColor: "white",
        },
      ],
    },
    proof: {
      eyebrow: "Proof Points",
      title: "Confidence built on outcomes",
      description:
        "Every lease we manage is designed to feel as good as the car you drive.",
      stats: [
        {
          id: "experience-years",
          value: "20+ yrs",
          label: "Combined expertise",
          bgColor: "yellow",
        },
        {
          id: "leases-managed",
          value: "5K+",
          label: "Leases guided nationally",
          bgColor: "teal",
        },
        {
          id: "savings",
          value: "$2.5K",
          label: "Average annual savings*",
          bgColor: "grey",
        },
        {
          id: "satisfaction",
          value: "98%",
          label: "Customer satisfaction rate",
          bgColor: "white",
        },
      ],
    },
    closing: {
      title: "How it works",
      titleBold: false,
      paragraph:
        "We make car leasing simple, transparent, and rewarding — helping your employees take home more pay while your business saves time and costs.",
      paragraphBold: false,
      tiles: [
        {
          title: "More Take-Home Pay",
          titleBold: false,
          description:
            "Using pre-tax dollars for their car and running costs puts more money in their pockets every pay cycle.",
          descriptionBold: false,
          image: "/placeholder.jpg",
          bgColor: "yellow",
        },
        {
          title: "",
          titleBold: false,
          description: "",
          descriptionBold: false,
          image: "/placeholder.jpg",
          bgColor: "white",
        },
        {
          title: "Less Hassle",
          titleBold: false,
          description:
            "One fixed, set-and-forget payment covers most car costs — no juggling multiple bills or suppliers.",
          descriptionBold: false,
          image: "/placeholder.jpg",
          bgColor: "teal",
        },
        {
          title: "Choice & Transparency",
          titleBold: false,
          description:
            "We show every dollar with no hidden add-ons, giving employees complete visibility into their expenses.",
          descriptionBold: false,
          image: "/placeholder.jpg",
          bgColor: "teal",
        },
        {
          title: "EV Advantage",
          titleBold: false,
          description:
            "Eligible EVs can be FBT-exempt, delivering outsized savings that make electric vehicles incredibly attractive.",
          descriptionBold: false,
          image: "/placeholder.jpg",
          bgColor: "grey",
        },
      ],
    },
    values: {
      title: "Bright Values",
      description: "Simplicity. Excellence. Partnership. Integrity.",
      blocks: [
        {
          id: "simplicity",
          title: "Simplicity",
          description: "Simplicity in every step.",
          image: "/globe.svg",
          bgColor: "yellow",
        },
        {
          id: "excellence",
          title: "Excellence",
          description: "Excellence in everything we do.",
          image: "/window.svg",
          bgColor: "teal",
        },
        {
          id: "partnership",
          title: "Partnership",
          description: "Partnership built on trust.",
          image: "/file.svg",
          bgColor: "teal",
        },
        {
          id: "integrity",
          title: "Integrity",
          description: "Integrity always.",
          image: "/globe.svg",
          bgColor: "grey",
        },
      ],
    },
    section7: {
      title: "Ready to get started?",
      titleBold: false,
      description:
        "Get in touch with our team to learn more about how Bright Leasing can help you.",
      descriptionBold: false,
      buttonText: "Contact Us",
      image: "/images/brightlogo.png",
    },
  },
};
