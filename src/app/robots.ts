// robots .ts file for nextjs excluding all admin pages and including all of the rest of the pages

export const robots = {
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: "/admin",
  },
};