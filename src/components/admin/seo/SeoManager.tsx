'use client';

import { useMemo, useState, useTransition } from "react";
import { SeoPageConfig } from "@/config/seo-pages";
import { upsertSeoEntryAction } from "@/server-actions/seo-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import LuxeButton from "@/components/core/LuxeButton";
import AdminFormSection from "@/components/admin/AdminFormSection";

type PageWithSeo = SeoPageConfig & {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
};

interface Props {
    pages: PageWithSeo[];
}

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.brightleasing.com.au";

export default function SeoManager({ pages }: Props) {
    const [search, setSearch] = useState("");
    const [pageState, setPageState] = useState<PageWithSeo[]>(pages);
    const [pendingSlug, setPendingSlug] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filteredPages = useMemo(() => {
        if (!search.trim()) return pageState;
        const term = search.toLowerCase();
        return pageState.filter(
            (page) =>
                page.label.toLowerCase().includes(term) ||
                page.path.toLowerCase().includes(term),
        );
    }, [pageState, search]);

    const handleChange = (
        slug: string,
        field: keyof Omit<PageWithSeo, keyof SeoPageConfig>,
        value: string,
    ) => {
        setPageState((prev) =>
            prev.map((page) =>
                page.slug === slug ? { ...page, [field]: value } : page,
            ),
        );
    };

    const handleReset = (slug: string) => {
        const config = pages.find((page) => page.slug === slug);
        if (!config) return;
        handleChange(slug, "metaTitle", config.defaultTitle);
        handleChange(slug, "metaDescription", config.defaultDescription);
        handleChange(
            slug,
            "keywords",
            config.defaultKeywords ? config.defaultKeywords : "",
        );
    };

    const handleSave = (page: PageWithSeo) => {
        setPendingSlug(page.slug);
        startTransition(async () => {
            const result = await upsertSeoEntryAction({
                slug: page.slug,
                metaTitle: page.metaTitle,
                metaDescription: page.metaDescription,
                keywords: page.keywords,
            });

            if (result.success) {
                toast.success(`${page.label} SEO updated`);
            } else {
                toast.error(result.error ?? "Failed to update SEO");
            }

            setPendingSlug(null);
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
                <div className="rounded-3xl bg-gradient-to-r from-brand-yellow/80 via-brand-yellow to-brand-teal text-brand-black  p-8 space-y-5">
                    <div className="space-y-2">
                        <p className="uppercase tracking-[0.4em] text-xs font-semibold text-brand-black/80">
                            Bright Leasing · SEO
                        </p>
                        <h1 className="text-4xl font-bold leading-tight">
                            Manage page titles, descriptions & keywords
                        </h1>
                    </div>
                    <p className="text-brand-black/80 max-w-3xl">
                        Keep every public route aligned with our brand voice. Search for a
                        page, update the copy, and Bright will revalidate the route
                        automatically.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by page name or path..."
                            className="bg-white text-brand-black border-none shadow-md sm:max-w-sm"
                        />
                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-brand-black/80">
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/40">
                                {filteredPages.length} pages
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/40">
                                Revalidates on save
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {filteredPages.map((page) => (
                        <AdminFormSection
                            key={page.slug}
                            title={page.label}
                        >
                            <div className="space-y-6">
                                <p className="text-xs text-brand-black/60">
                                    {`${BASE_URL.replace(/\/$/, "")}${page.path}`}
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-brand-black mb-1 block">
                                            Meta Title
                                        </label>
                                        <Input
                                            value={page.metaTitle}
                                            onChange={(event) =>
                                                handleChange(page.slug, "metaTitle", event.target.value)
                                            }
                                            maxLength={120}
                                            className="bg-white"
                                        />
                                        <p className="text-xs text-brand-black/60 mt-1">
                                            {page.metaTitle.length} / 120 characters
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-brand-black mb-1 block">
                                            Keywords (comma separated)
                                        </label>
                                        <Textarea
                                            value={page.keywords}
                                            onChange={(event) =>
                                                handleChange(page.slug, "keywords", event.target.value)
                                            }
                                            rows={2}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-brand-black mb-1 block">
                                        Meta Description
                                    </label>
                                    <Textarea
                                        value={page.metaDescription}
                                        onChange={(event) =>
                                            handleChange(
                                                page.slug,
                                                "metaDescription",
                                                event.target.value,
                                            )
                                        }
                                        rows={4}
                                        maxLength={200}
                                        className="bg-white"
                                    />
                                    <p className="text-xs text-brand-black/60 mt-1">
                                        {page.metaDescription.length} / 200 characters
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <LuxeButton
                                        onClick={() => handleSave(page)}
                                        className={cn(
                                            "bg-brand-black text-white px-6 rounded-full",
                                            pendingSlug === page.slug &&
                                            "opacity-60 cursor-not-allowed",
                                        )}
                                        disabled={pendingSlug === page.slug || isPending}
                                    >
                                        {pendingSlug === page.slug ? "Saving..." : "Save Changes"}
                                    </LuxeButton>
                                    <button
                                        type="button"
                                        onClick={() => handleReset(page.slug)}
                                        className="text-sm text-brand-black/70 underline"
                                    >
                                        Reset to defaults
                                    </button>
                                </div>
                            </div>
                        </AdminFormSection>
                    ))}

                    {filteredPages.length === 0 && (
                        <p className="text-brand-black/70 text-center">
                            No pages match your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}


