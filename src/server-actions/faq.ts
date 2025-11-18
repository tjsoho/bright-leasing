import { createSlug } from "@/utils/create-slug";
import { supabase } from "@/utils/supabase";
import { FAQ } from "@/app/types/faq";

// Category actions
export async function getFAQCategories() {
  const { data, error } = await supabase
    .from("faq_categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function createFAQCategory(name: string) {
  const slug = createSlug(name);
  const { data, error } = await supabase
    .from("faq_categories")
    .insert({ name, slug })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFAQCategory(id: string) {
  const { error } = await supabase.from("faq_categories").delete().eq("id", id);

  if (error) throw error;
}

// FAQ actions
export async function getFAQs() {
  const { data, error } = await supabase
    .from("faqs")
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .order("order_index", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createFAQ(faq: Partial<FAQ>) {
  // Get the highest order_index for the category, or default to 0
  let orderIndex = 0;
  if (faq.category_id) {
    const { data: existingFaqs } = await supabase
      .from("faqs")
      .select("order_index")
      .eq("category_id", faq.category_id)
      .order("order_index", { ascending: false })
      .limit(1);

    if (
      existingFaqs &&
      existingFaqs.length > 0 &&
      existingFaqs[0].order_index !== null
    ) {
      orderIndex = (existingFaqs[0].order_index || 0) + 1;
    }
  }

  const { data, error } = await supabase
    .from("faqs")
    .insert({
      question: faq.question,
      answer: faq.answer,
      category_id: faq.category_id || "00000000-0000-0000-0000-000000000000", // Default to General
      order_index: faq.order_index !== undefined ? faq.order_index : orderIndex,
    })
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function updateFAQ(id: string, faq: Partial<FAQ>) {
  const updateData: {
    question?: string;
    answer?: string;
    category_id?: string;
    order_index?: number;
  } = {
    question: faq.question,
    answer: faq.answer,
    category_id: faq.category_id || "00000000-0000-0000-0000-000000000000",
  };

  // Only update order_index if it's explicitly provided
  if (faq.order_index !== undefined) {
    updateData.order_index = faq.order_index;
  }

  const { data, error } = await supabase
    .from("faqs")
    .update(updateData)
    .eq("id", id)
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFAQ(id: string) {
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) throw error;
}

export async function updateFAQOrder(faqId: string, newOrderIndex: number) {
  const { data, error } = await supabase
    .from("faqs")
    .update({ order_index: newOrderIndex })
    .eq("id", faqId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function reorderFAQs(faqs: { id: string; order_index: number }[]) {
  if (!faqs || faqs.length === 0) {
    throw new Error("No FAQs provided for reordering");
  }

  // Update all FAQs in a batch
  const updates = faqs.map((faq) =>
    supabase
      .from("faqs")
      .update({ order_index: faq.order_index })
      .eq("id", faq.id)
  );

  const results = await Promise.all(updates);
  const errors = results.filter((result) => result.error);

  if (errors.length > 0) {
    const error = errors[0].error;
    console.error("Reorder FAQ error details:", {
      error,
      faqs: faqs.map((f) => ({ id: f.id, order_index: f.order_index })),
    });

    // Check if it's a column doesn't exist error
    if (
      error?.message?.includes("column") &&
      error?.message?.includes("order_index")
    ) {
      throw new Error(
        "order_index column does not exist. Please run the database migration: 20240322000009_add_order_index_to_faqs.sql"
      );
    }

    throw new Error(error?.message || "Failed to reorder FAQs");
  }

  return results;
}
