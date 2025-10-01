"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];
        },
        set(
          name: string,
          value: string,
          options: { path: string; maxAge: number }
        ) {
          document.cookie = `${name}=${value}; path=${options.path}; max-age=${options.maxAge}`;
        },
        remove(name: string, options: { path: string }) {
          document.cookie = `${name}=; path=${options.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        },
      },
    }
  );
};
