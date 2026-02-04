import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("faqs");
}

export default function FaqsLayout({ children }: { children: ReactNode }) {
    return children;
}






