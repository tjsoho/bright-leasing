import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("podcasts");
}

export default function PodcastsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}







