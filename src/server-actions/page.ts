import { BasePage } from "@/app/types";
import { supabase } from "@/utils/supabase";

export default async function getPage<TContent extends BasePage<object>>(
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

  return {
    ...fallbackData,
    ...response.data,
    content: {
      ...fallbackData.content,
      ...response.data.content,
    },
  };
}
