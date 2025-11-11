/* ************************************************************
                        NOTES
************************************************************ */
// FAQ Management admin page
// Matches app styling with brand colors and AdminFormSection components
// Features category management and FAQ CRUD operations
/* ************************************************************
                        IMPORTS
************************************************************ */
'use client';

import { useEffect, useState } from 'react';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { getFAQs, getFAQCategories, deleteFAQ } from '@/server-actions/faq';
import CategoryForm from '@/components/admin/CategoryForm';
import FAQForm from '@/components/admin/FAQForm';
import AdminFormSection from '@/components/admin/AdminFormSection';
import toast from 'react-hot-toast';

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function FAQAdminPage() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [faqsData, categoriesData] = await Promise.all([
                getFAQs(),
                getFAQCategories()
            ]);

            // Sort categories to ensure General is first
            const sortedCategories = categoriesData.sort((a, b) => {
                if (a.slug === 'general') return -1;
                if (b.slug === 'general') return 1;
                return a.name.localeCompare(b.name);
            });

            setFaqs(faqsData);
            setCategories(sortedCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;

        try {
            await deleteFAQ(id);
            toast.success('FAQ deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            toast.error('Failed to delete FAQ');
        }
    };

    // Group FAQs by category
    const faqsByCategory = categories.map(category => ({
        ...category,
        faqs: faqs.filter(faq => faq.category_id === category.id)
    }));

    /* ************************************************************
                            RENDER
    ************************************************************ */
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <p className="text-brand-black">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* ************************************************************
                    HEADER SECTION
                ************************************************************ */}
                <div className="mb-8">
                    <h1 className="h1 text-brand-black mb-2">
                        FAQ Management
                    </h1>
                    <p className="p text-brand-black/70">
                        Manage frequently asked questions and categories
                    </p>
                </div>

                {/* ************************************************************
                    FORMS SECTION
                ************************************************************ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Column - Categories */}
                    <div>
                        <CategoryForm
                            categories={categories}
                            onSuccess={fetchData}
                        />
                    </div>

                    {/* Right Column - FAQ Form */}
                    <div>
                        <FAQForm
                            categories={categories}
                            initialData={editingFaq}
                            onSuccess={() => {
                                fetchData();
                                setEditingFaq(null);
                            }}
                        />
                    </div>
                </div>

                {/* ************************************************************
                    FAQS LIST BY CATEGORY
                ************************************************************ */}
                <div className="space-y-8">
                    {faqsByCategory.map((category) => (
                        <AdminFormSection key={category.id} title={category.name}>
                            {category.faqs.length === 0 ? (
                                <p className="text-brand-black/50 italic">No FAQs in this category</p>
                            ) : (
                                <div className="space-y-4">
                                    {category.faqs.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="bg-white border border-brand-black/10 p-6 rounded-lg hover:border-brand-teal/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1 space-y-3">
                                                    <h3 className="h4 text-brand-black font-medium">{faq.question}</h3>
                                                    <p className="p text-brand-black/70 whitespace-pre-wrap">{faq.answer}</p>
                                                </div>
                                                <div className="flex gap-3 flex-shrink-0">
                                                    <button
                                                        onClick={() => setEditingFaq(faq)}
                                                        className="px-4 py-2 bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-teal/80 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(faq.id)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </AdminFormSection>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */