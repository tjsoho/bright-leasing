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

export async function getPageByUrlPath<TContent extends BasePage<object>>(
  urlPath: string,
  fallbackData?: TContent
): Promise<TContent | null> {
  // Normalize the path (remove leading/trailing slashes for comparison)
  const normalizedPath = urlPath.replace(/^\/+|\/+$/g, "") || "/";
  
  const response = await supabase
    .from("pages")
    .select("*")
    .not("content", "is", null);

  if (response.error) {
    console.log("Error fetching pages by urlPath:", response.error);
    return null;
  }

  if (!response.data || response.data.length === 0) {
    return null;
  }

  // Find page where content.urlPath matches
  const matchingPage = response.data.find((page) => {
    if (!page.content || typeof page.content !== "object") return false;
    const content = page.content as { urlPath?: string };
    const pagePath = content.urlPath?.replace(/^\/+|\/+$/g, "") || "";
    return pagePath === normalizedPath || (normalizedPath === "/" && pagePath === "");
  });

  if (!matchingPage) {
    return null;
  }

  if (fallbackData) {
    return {
      ...fallbackData,
      ...matchingPage,
      content: {
        ...fallbackData.content,
        ...matchingPage.content,
      },
    } as TContent;
  }

  return matchingPage as TContent;
}
