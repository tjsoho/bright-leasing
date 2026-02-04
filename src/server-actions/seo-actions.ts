"use server";

import { revalidatePath } from "next/cache";
import { saveSeoEntry } from "@/data/seo";
import { seoPages } from "@/config/seo-pages";

export interface UpsertSeoPayload {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
}

export async function upsertSeoEntryAction(payload: UpsertSeoPayload) {
  const result = await saveSeoEntry(
    payload.slug,
    payload.metaTitle,
    payload.metaDescription,
    payload.keywords
  );

  if (result.success) {
    const pageConfig = seoPages.find((page) => page.slug === payload.slug);
    if (pageConfig?.path) {
      revalidatePath(pageConfig.path);
    }
    revalidatePath("/admin/seo");
  }

  return result;
}




