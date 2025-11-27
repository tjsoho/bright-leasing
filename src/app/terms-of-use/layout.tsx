import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("terms-of-use");
}

export default function TermsOfUseLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}




