/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepValue } from "@/types/deep-object";

/**
 * Get a deeply nested value from an object using a dot path (e.g. "content.heroTitle").
 * Fully type-safe and returns the exact inferred type.
 */

export function getDeepValue<T, K extends string>(
  obj: T,
  path: K,
): DeepValue<T, K> {
  const parts = path.split(".");
  let current: any = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined as DeepValue<T, K>;
    }
  }

  // Return undefined if it's an object
  if (current && typeof current === "object" && !Array.isArray(current)) {
    return undefined as DeepValue<T, K>;
  }

  return current as DeepValue<T, K>;
}
