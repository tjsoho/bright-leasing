"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateHomePage() {
  revalidatePath("/");
  revalidatePath("/admin/home");
  console.log("Revalidated home page");
}

export async function revalidateAboutPage() {
  revalidatePath("/about-us");
  revalidatePath("/admin/about-us");
  console.log("Revalidated about page");
}

export async function revalidateServicesPage() {
  revalidatePath("/services");
  revalidatePath("/admin/services");
  console.log("Revalidated services page");
}

export async function revalidateWorkPage() {
  revalidatePath("/work");
  revalidatePath("/admin/work");
  console.log("Revalidated work page");
}

export async function revalidateAllPages() {
  revalidatePath("/");
  revalidatePath("/about-us");
  revalidatePath("/services");
  revalidatePath("/work");
  revalidatePath("/team");
  revalidatePath("/blog");
  revalidatePath("/faqs");
  revalidatePath("/podcasts");
  revalidatePath("/science");
  revalidatePath("/reviews");
  console.log("Revalidated all pages");
}
