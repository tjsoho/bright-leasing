import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("reviews");
}

export default function ReviewsLayout({ children }: { children: ReactNode }) {
    return children;
}







