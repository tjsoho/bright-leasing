import type { Metadata } from "next";
import { seoPages } from "@/config/seo-pages";
import { fetchSeoEntry } from "@/data/seo";

const DEFAULT_TITLE = "Bright Leasing | Smarter Novated Leasing";
const DEFAULT_DESCRIPTION =
  "Discover the smartest way to own and run a car with Bright Leasing.";
const DEFAULT_KEYWORDS = "bright leasing, novated lease, salary packaging";

export async function buildPageMetadata(
  slug: string,
  overrides?: Partial<Metadata>
): Promise<Metadata> {
  const pageConfig = seoPages.find((page) => page.slug === slug);

  const fallbackTitle = pageConfig?.defaultTitle ?? DEFAULT_TITLE;
  const fallbackDescription =
    pageConfig?.defaultDescription ?? DEFAULT_DESCRIPTION;
  const fallbackKeywords = pageConfig?.defaultKeywords ?? DEFAULT_KEYWORDS;

  const storedEntry = await fetchSeoEntry(slug);

  const title = storedEntry?.meta_title ?? fallbackTitle;
  const description = storedEntry?.meta_description ?? fallbackDescription;
  const keywords = storedEntry?.keywords ?? fallbackKeywords;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.brightleasing.com.au";
  const canonicalPath = pageConfig?.path ?? "/";
  const canonicalUrl = `${baseUrl.replace(/\/$/, "")}${canonicalPath}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords
      ? keywords.split(",").map((keyword) => keyword.trim())
      : undefined,
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...overrides,
  };

  return metadata;
}




