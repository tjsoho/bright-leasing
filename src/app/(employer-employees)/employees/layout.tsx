import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("employees");
}

export default function EmployeesLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}





