import { FAQsPageProps, faqsPageFallbackData } from '@/app/faqs/_config';
import FAQsAdminContent from '@/components/admin/faqs-admin-content';
import getPage from '@/server-actions/page';

export default async function FAQAdminPage() {
    const pageData = await getPage<FAQsPageProps>("faqs", faqsPageFallbackData);

    return <FAQsAdminContent initialPageData={pageData} />;
}
