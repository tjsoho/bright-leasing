"use server";

import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data?.user) {
    redirect("/admin");
  }

  return { error: "Something went wrong" };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  redirect("/admin/login");
}

export async function updatePage<T>(data: {
  title: string;
  description: string;
  slug: string;
  content: T;
}) {
  const { error } = await supabase
    .from("pages")
    .upsert({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", data.slug);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
