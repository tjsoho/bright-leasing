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
import { getFAQs, getFAQCategories, deleteFAQ, reorderFAQs } from '@/server-actions/faq';
import CategoryForm from '@/components/admin/CategoryForm';
import FAQForm from '@/components/admin/FAQForm';
import AdminFormSection from '@/components/admin/AdminFormSection';
import toast from 'react-hot-toast';
import { ChevronUp, ChevronDown } from 'lucide-react';

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

    // Group FAQs by category and sort by order_index
    const faqsByCategory = categories.map(category => ({
        ...category,
        faqs: faqs
            .filter(faq => faq.category_id === category.id)
            .sort((a, b) => {
                const aOrder = a.order_index ?? 0;
                const bOrder = b.order_index ?? 0;
                return aOrder - bOrder;
            })
    }));

    const handleMoveUp = async (faq: FAQ, categoryId: string) => {
        const categoryFaqs = faqsByCategory.find(c => c.id === categoryId)?.faqs || [];
        const currentIndex = categoryFaqs.findIndex(f => f.id === faq.id);

        if (currentIndex <= 0) return; // Already at top

        const prevFaq = categoryFaqs[currentIndex - 1];
        const currentOrder = faq.order_index ?? currentIndex;
        const prevOrder = prevFaq.order_index ?? (currentIndex - 1);

        try {
            await reorderFAQs([
                { id: faq.id, order_index: prevOrder },
                { id: prevFaq.id, order_index: currentOrder }
            ]);

            // Update local state without refetching
            setFaqs(prevFaqs =>
                prevFaqs.map(f => {
                    if (f.id === faq.id) return { ...f, order_index: prevOrder };
                    if (f.id === prevFaq.id) return { ...f, order_index: currentOrder };
                    return f;
                })
            );

            toast.success('FAQ order updated');
        } catch (error: unknown) {
            console.error('Error reordering FAQ:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to reorder FAQ';
            toast.error(errorMessage);
        }
    };

    const handleMoveDown = async (faq: FAQ, categoryId: string) => {
        const categoryFaqs = faqsByCategory.find(c => c.id === categoryId)?.faqs || [];
        const currentIndex = categoryFaqs.findIndex(f => f.id === faq.id);

        if (currentIndex >= categoryFaqs.length - 1) return; // Already at bottom

        const nextFaq = categoryFaqs[currentIndex + 1];
        const currentOrder = faq.order_index ?? currentIndex;
        const nextOrder = nextFaq.order_index ?? (currentIndex + 1);

        try {
            await reorderFAQs([
                { id: faq.id, order_index: nextOrder },
                { id: nextFaq.id, order_index: currentOrder }
            ]);

            // Update local state without refetching
            setFaqs(prevFaqs =>
                prevFaqs.map(f => {
                    if (f.id === faq.id) return { ...f, order_index: nextOrder };
                    if (f.id === nextFaq.id) return { ...f, order_index: currentOrder };
                    return f;
                })
            );

            toast.success('FAQ order updated');
        } catch (error: unknown) {
            console.error('Error reordering FAQ:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to reorder FAQ';
            toast.error(errorMessage);
        }
    };

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
                                <div className="space-y-2">
                                    {category.faqs.map((faq, index) => (
                                        <div
                                            key={faq.id}
                                            className="bg-white border border-brand-black/10 p-3 rounded-lg hover:border-brand-teal/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex items-start gap-2 flex-1 min-w-0">
                                                    {/* Reorder Controls */}
                                                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                                                        <button
                                                            onClick={() => handleMoveUp(faq, category.id)}
                                                            disabled={index === 0}
                                                            className="p-0.5 bg-brand-yellow/20 text-brand-black rounded hover:bg-brand-yellow/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                            title="Move up"
                                                        >
                                                            <ChevronUp className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoveDown(faq, category.id)}
                                                            disabled={index === category.faqs.length - 1}
                                                            className="p-0.5 bg-brand-yellow/20 text-brand-black rounded hover:bg-brand-yellow/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                            title="Move down"
                                                        >
                                                            <ChevronDown className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    <div className="flex-1 space-y-1 min-w-0">
                                                        <h3 className="text-sm font-medium text-brand-black line-clamp-1">{faq.question}</h3>
                                                        <p className="text-xs text-brand-black/70 line-clamp-2 whitespace-pre-wrap">{faq.answer}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => setEditingFaq(faq)}
                                                        className="px-3 py-1.5 text-xs bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-teal/80 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(faq.id)}
                                                        className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
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