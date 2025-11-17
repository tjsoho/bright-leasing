import { BasePage } from "../types";

export type AboutNarrativeBlock = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type AboutDifferentiator = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
};

export type AboutClosing = {
  title: string;
  description: string;
  emphasis: string;
  image: string;
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
  introduction: {
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
  section7: AboutSection7;
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
        "Most of us need a car — and the costs are unavoidable. Novated leasing is the smarter way to cover finance, fuel, servicing, insurance, and registration in one tax-effective bundle. It shouldn’t feel complicated.",
      image: "/images/brightlogo.png",
      imageAlt: "Bright Leasing team collaborating",
      ctaLabel: "Talk with a specialist",
      ctaLink: "/contact",
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
        "Great service isn’t an add-on; it’s the standard. If novated leasing isn’t the right fit, we’ll say so.",
      items: [
        {
          id: "clarity",
          title: "Clarity first",
          description:
            "Plain-language coaching that makes every dollar and decision easy to understand.",
          icon: "/globe.svg",
        },
        {
          id: "support",
          title: "People-first support",
          description:
            "Dedicated specialists who stay with you long after sign-up to keep costs predictable.",
          icon: "/window.svg",
        },
        {
          id: "technology",
          title: "Smarter technology",
          description:
            "Tools that surface the right insights at the right time so every experience feels effortless.",
          icon: "/file.svg",
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
        },
        {
          id: "leases-managed",
          value: "5K+",
          label: "Leases guided nationally",
        },
        { id: "savings", value: "$2.5K", label: "Average annual savings*" },
      ],
    },
    closing: {
      title: "Love every step",
      description:
        "At Bright, we believe people should love the experience of getting their car as much as the car itself.",
      emphasis: "Let's build your brighter way to lease.",
      image: "/images/brightlogo.png",
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
        },
        {
          id: "excellence",
          title: "Excellence",
          description: "Excellence in everything we do.",
          image: "/window.svg",
        },
        {
          id: "partnership",
          title: "Partnership",
          description: "Partnership built on trust.",
          image: "/file.svg",
        },
        {
          id: "integrity",
          title: "Integrity",
          description: "Integrity always.",
          image: "/globe.svg",
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
