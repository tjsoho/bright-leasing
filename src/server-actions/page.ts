import { supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function getPage<TContent>(
  slug: string,
  fallbackData: TContent
): Promise<TContent> {
  const response = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (response.error) {
    console.log(response.error);
    return fallbackData;
  }

  if (!response.data) {
    return fallbackData;
  }

  return response.data;
}

export async function revalidatePage(slug: string) {
  revalidatePath(`/`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}
