import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("terms-and-conditions");
}

export default function TermsAndConditionsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}






