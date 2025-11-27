import { fetchSeoEntries } from "@/data/seo";
import { seoPages } from "@/config/seo-pages";
import SeoManager from "@/components/admin/seo/SeoManager";

export default async function AdminSeoPage() {
    const seoEntries = await fetchSeoEntries();

    const pages = seoPages.map((page) => {
        const stored = seoEntries.find((entry) => entry.slug === page.slug);
        return {
            ...page,
            metaTitle: stored?.meta_title ?? page.defaultTitle,
            metaDescription: stored?.meta_description ?? page.defaultDescription,
            keywords: stored?.keywords ?? page.defaultKeywords ?? "",
        };
    });

    return <SeoManager pages={pages} />;
}




