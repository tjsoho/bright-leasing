import { BasePage } from "./types";

export type HomePageContent = {
  heroImageDesktop: string;
  heroImageMobile: string;
  section1Images: {
    icon1: string;
    icon2: string;
    icon3: string;
    icon4: string;
  };
  descriptionHero: string;
  buttonText: string;
  quoteHero: string;
  quoteHeroAuthor: string;
  section1tile1: string;
  section1tile2: string;
  section1tile3: string;
  section1tile4: string;
  section1paragraph: string;
  section2title: string;
  section2ImageDesktop: string;
  section2ImageMobile: string;
  section3title: string;
  section3paragraph: string;
  section3Images: {
    profile1: string;
    profile2: string;
    profile3: string;
    profile4: string;
    profile5: string;
    profile6: string;
  };
  section4ImageDesktop: string;
  section4ImageMobile: string;
  section5title: string;
  section5paragraph1: string;
  section5paragraph2: string;
  section5icon1: string;
  section5listText1: string;
  section5icon2: string;
  section5listText2: string;
  section5icon3: string;
  section5listText3: string;
  section5icon4: string;
  section5listText4: string;
  section5icon5: string;
  section5listText5: string;
  section5icon6: string;
  section5listText6: string;
  section5icon7: string;
  section5listText7: string;
  section5icon8: string;
  section5listText8: string;
  section5paragraph3: string;
  section5DetailImage: string;
  section5FeatureImage: string;
  section6title: string;
  section6logos: string[];
  section7title: string;
  section8title: string;
  section8paragraph: string;
  section8buttonText: string;
  section8Image: string;
  section9title: string;
  section9icon1: string;
  section9listText1: string;
  section9icon2: string;
  section9listText2: string;
  section9icon3: string;
  section9listText3: string;
  section9icon4: string;
  section9listText4: string;
  section10title: string;
  section10paragraph: string;
  section11title: string;
  section11paragraph: string;
  section11buttonText: string;
  section11Image: string;
};

export type HomePageProps = BasePage<HomePageContent>;

export const homePageFallbackData: HomePageProps = {
  title: "Home",
  description: "Home page",
  slug: "home",
  content: {
    heroImageDesktop: "/placeholder.jpg",
    heroImageMobile: "/placeholder.jpg",
    section1Images: {
      icon1: "/placeholder.jpg",
      icon2: "/placeholder.jpg",
      icon3: "/placeholder.jpg",
      icon4: "/placeholder.jpg",
    },
    descriptionHero:
      "STAIT provides foundational nutrition for stress relief, improved sleep, enhanced brain function, energy and endurance, heart health, and a boost in metabolism and immune response.",
    buttonText: "Start Your Journey",
    quoteHero:
      "I don’t say yes very often to being aligned with brands but when I do it’s because I wholeheartedly believe in them.",
    quoteHeroAuthor:
      " Mike Bates. Former counter terrorism covert operations leader, entrepreneur and adventurer.",
    section1tile1: "Family owned for performance over profit.",
    section1tile2: "BSCG certified drug free.",
    section1tile3: "Third party tested.",
    section1tile4: "Made in Australia.",
    section1paragraph:
      "For high-performing men seeking sustainable mental, physical and emotional wellbeing. No shortcuts. No crash. Just pure, elite performance powered by nature. Proven by science.",
    section2title: "Clinically Proven To:",
    section2ImageDesktop: "/placeholder.jpg",
    section2ImageMobile: "/placeholder.jpg",
    section3title: "Trusted by Thousands of Men Globally",
    section3Images: {
      profile1: "/placeholder.jpg",
      profile2: "/placeholder.jpg",
      profile3: "/placeholder.jpg",
      profile4: "/placeholder.jpg",
      profile5: "/placeholder.jpg",
      profile6: "/placeholder.jpg",
    },
    section4ImageDesktop: "/placeholder.jpg",
    section4ImageMobile: "/placeholder.jpg",
    section3paragraph:
      "Join the STAIT Community - men who trust STAIT for real, proven results. Our science-backed formulas are supporting high performers achieve their best every day.",
    section5title: "That we age is a given, how we age is a choice.",
    section5paragraph1:
      "STAIT is for anyone who wants to outperform themselves, whether you're a CEO, C-Suite executive, first responder, tradie, trader, farmer, athlete or simply a man who would like to be the best he can be.",
    section5paragraph2:
      "Our proprietary formula is designed to support peak performance and recovery, helping you maintain your edge in every aspect of life.",
    section5icon1: "/placeholder.jpg",
    section5listText1: "Gluten Free",
    section5icon2: "/placeholder.jpg",
    section5listText2: "Vegan",
    section5icon3: "/placeholder.jpg",
    section5listText3: "Halal",
    section5icon4: "/placeholder.jpg",
    section5listText4: "Kosher",
    section5icon5: "/placeholder.jpg",
    section5listText5: "Guaranteed High-Quality",
    section5icon6: "/placeholder.jpg",
    section5listText6: "TGA-Listed",
    section5icon7: "/placeholder.jpg",
    section5listText7: "Proprietary Formula",
    section5icon8: "/placeholder.jpg",
    section5listText8: "Australian Owned & Made",
    section5paragraph3:
      "BSCG Certified Drug Free, ensuring drug-test friendly, meeting the highest quality standards.",
    section5DetailImage: "/placeholder.jpg",
    section5FeatureImage: "/placeholder.jpg",
    section6title: "As Featured In",
    section6logos: ["/placeholder.jpg", "/placeholder.jpg"],
    section7title: "Check out what men say about STAIT",
    section8title: "Our Mission",
    section8paragraph:
      "Approaching my 50s, and busy with a demanding corporate career, I was aware that aging might start to affect my performance day-to-day. Whilst most people might consider this a normal part of the aging process, I chose differently. Why give up on feeling and being my best just because I'm getting older. As a busy CEO, I had always been determined to outperform myself each day. Having failed to find a product to support my health in the way I needed, it was my wife and co-founder Samantha who suggested I should create something for myself. The aim was to create a product that would support me to unlock my full potential and perform at my best. And there was no question, the formula had to be the best it could be, focusing on performance of the product over profit. To this day, STAIT is family owned so we aren't constricted by vulture capitalists with onerous financial targets to meet.",
    section8buttonText: "Keep Reading",
    section8Image: "/placeholder.jpg",
    section9title: "We did the ground work so you don't have to.",
    section9icon1: "💊",
    section9listText1:
      "Bio-signature of herbs for ensured purity and efficacy.",
    section9icon2: "💊",
    section9listText2: "No synthetic vitamins or cheap fillers.",
    section9icon3: "💊",
    section9listText3:
      "Therapeutic dose of standarized herbs for assured results.",
    section9icon4: "💊",
    section9listText4: "Whole-herb formulas for the best results.",
    section10title: "Real Support. No Scripts. No Nonsense.",
    section10paragraph:
      "Our in-house support team is fast, expert, and always ready to assist you  no outsourcing, no long waits, just real people who know the product inside and out and are fully committed to your success. Because high performers don’t settle for less. And neither do we.",
    section11title: "BECOME UNSTOPPABLE",
    section11paragraph:
      "For men who demand more from life. Don’t just age, they evolve. Join the ranks of high achievers who are redefining what it means to live stronger and longer.",
    section11buttonText: "Unlock Your Potential",
    section11Image: "/placeholder.jpg",
  },
};
