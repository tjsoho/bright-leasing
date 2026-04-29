"use server";

import { createClient } from "@/utils/server";
import { compressImage, generateThumbnail, isImage } from "@/lib/image";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { success: false as const, error: "No file provided" };
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const shouldCompress = isImage(file.type);

    let finalBuffer: Buffer = originalBuffer;
    let finalMime = file.type || "application/octet-stream";
    let finalName = file.name;

    if (shouldCompress) {
      const result = await compressImage(originalBuffer, file.type);
      finalBuffer = result.buffer;
      finalMime = result.mimeType;
      if (result.mimeType === "image/webp") {
        finalName = file.name.replace(/\.[^.]+$/, "") + ".webp";
      }
    }

    const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
    const originalKb = originalBuffer.length;
    const finalKb = finalBuffer.length;
    const saved = originalKb - finalKb;
    const pct = originalKb > 0 ? ((saved / originalKb) * 100).toFixed(1) : "0";
    console.log(
      `[uploadImage] ${file.name} (${file.type}) → ${finalName} (${finalMime})\n` +
        `  original:   ${kb(originalKb)}\n` +
        `  compressed: ${kb(finalKb)}\n` +
        `  saved:      ${kb(saved)} (${pct}%)`,
    );

    const ext = finalName.split(".").pop() || "webp";
    const baseName = finalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w-]+/g, "-");
    const storageName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${baseName}.${ext}`;

    const supabase = await createClient();

    const { error } = await supabase.storage
      .from("site-images")
      .upload(storageName, finalBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: finalMime,
      });
    if (error) throw error;

    if (
      shouldCompress &&
      file.type !== "image/gif" &&
      file.type !== "image/svg+xml"
    ) {
      try {
        const thumb = await generateThumbnail(originalBuffer);
        await supabase.storage
          .from("site-images")
          .upload(`thumbnails/${storageName}`, thumb, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/webp",
          });
      } catch (err) {
        console.warn("Thumbnail generation failed:", err);
      }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("site-images").getPublicUrl(storageName);

    return {
      success: true as const,
      url: publicUrl,
      name: storageName,
      size: finalBuffer.length,
    };
  } catch (error) {
    console.error("uploadImage error:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
