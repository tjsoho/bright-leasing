import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import BlogAdminContent from "@/components/admin/blog-admin-content";
import { blogPageFallbackData, BlogPageProps } from "@/app/blog/_config";
import getPage from "@/server-actions/page";

export default async function BlogAdminPage() {
  const pageData = await getPage<BlogPageProps>("blog", blogPageFallbackData);

  return (
    <ImageLibraryProvider>
      <BlogAdminContent initialPageData={pageData} />
    </ImageLibraryProvider>
  );
}