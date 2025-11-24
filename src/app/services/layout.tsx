/* ************************************************************
                        NOTES
************************************************************ */
// Layout wrapper for the Services marketing route
// Ensures SEO metadata stays synced with CMS overrides
/* ************************************************************
                        IMPORTS
************************************************************ */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface ServicesLayoutProps {
	children: ReactNode;
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata("services");
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function ServicesLayout({ children }: ServicesLayoutProps) {
	/* ************************************************************
                            RENDER
    ************************************************************ */
	return <>{children}</>;
}
