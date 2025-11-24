import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("science");
}

export default function ScienceLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}



