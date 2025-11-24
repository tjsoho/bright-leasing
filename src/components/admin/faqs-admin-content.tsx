'use client';

import { useEffect, useState } from 'react';
import { FAQ, FAQCategory } from '@/app/types/faq';
import { getFAQs, getFAQCategories, deleteFAQ, reorderFAQs } from '@/server-actions/faq';
import CategoryForm from '@/components/admin/CategoryForm';
import FAQForm from '@/components/admin/FAQForm';
import AdminFormSection from '@/components/admin/AdminFormSection';
import toast from 'react-hot-toast';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { FAQsPageProps } from '@/app/faqs/_config';
import { SaveBanner } from '@/components/core/save-banner';
import usePageDataManager from '@/utils/hooks/usePageDataManager';
import { EditableElement } from '@/components/core/input';

interface Props {
    initialPageData: FAQsPageProps;
}

export default function FAQsAdminContent({ initialPageData }: Props) {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isSaving, getData, handleChange, handleSave } = usePageDataManager(initialPageData);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [faqsData, categoriesData] = await Promise.all([
                getFAQs(),
                getFAQCategories()
            ]);

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

        if (currentIndex <= 0) return;

        const prevFaq = categoryFaqs[currentIndex - 1];
        const currentOrder = faq.order_index ?? currentIndex;
        const prevOrder = prevFaq.order_index ?? (currentIndex - 1);

        try {
            await reorderFAQs([
                { id: faq.id, order_index: prevOrder },
                { id: prevFaq.id, order_index: currentOrder },
            ]);
            toast.success('FAQ moved up');
            fetchData();
        } catch (error) {
            console.error('Error moving FAQ:', error);
            toast.error('Failed to move FAQ');
        }
    };

    const handleMoveDown = async (faq: FAQ, categoryId: string) => {
        const categoryFaqs = faqsByCategory.find(c => c.id === categoryId)?.faqs || [];
        const currentIndex = categoryFaqs.findIndex(f => f.id === faq.id);

        if (currentIndex >= categoryFaqs.length - 1) return;

        const nextFaq = categoryFaqs[currentIndex + 1];
        const currentOrder = faq.order_index ?? currentIndex;
        const nextOrder = nextFaq.order_index ?? (currentIndex + 1);

        try {
            await reorderFAQs([
                { id: faq.id, order_index: nextOrder },
                { id: nextFaq.id, order_index: currentOrder },
            ]);
            toast.success('FAQ moved down');
            fetchData();
        } catch (error) {
            console.error('Error moving FAQ:', error);
            toast.error('Failed to move FAQ');
        }
    };

    if (isLoading && faqs.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="p text-brand-black/50">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SaveBanner pageTitle="FAQs Page" onSave={handleSave} isSaving={isSaving} />
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ************************************************************
                        PAGE CONTENT SECTION
                    ************************************************************ */}
                    <AdminFormSection title="Page Content">
                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Page Title
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    defaultValue={getData<string>("content.title") ?? ""}
                                    onTextChange={(value) => handleChange("content.title", value)}
                                />
                            </div>
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Subheading
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
                                    defaultValue={getData<string>("content.subheading") ?? ""}
                                    onTextChange={(value) => handleChange("content.subheading", value)}
                                />
                            </div>
                        </div>
                    </AdminFormSection>

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
                        <div>
                            <CategoryForm
                                categories={categories}
                                onSuccess={fetchData}
                            />
                        </div>

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
                                    <p className="p text-brand-black/50 italic">No FAQs in this category yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {category.faqs.map((faq) => (
                                            <div
                                                key={faq.id}
                                                className="bg-brand-black p-4 rounded-lg border border-gray-700 flex items-start justify-between gap-4"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <button
                                                            onClick={() => handleMoveUp(faq, category.id)}
                                                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                                                            title="Move up"
                                                        >
                                                            <ChevronUp className="w-4 h-4 text-white" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMoveDown(faq, category.id)}
                                                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                                                            title="Move down"
                                                        >
                                                            <ChevronDown className="w-4 h-4 text-white" />
                                                        </button>
                                                        <span className="text-white text-sm font-medium">
                                                            Order: {faq.order_index ?? 0}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-white font-medium mb-1">{faq.question}</h4>
                                                    <p className="text-gray-400 text-sm line-clamp-2">{faq.answer}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingFaq(faq)}
                                                        className="px-3 py-1 bg-brand-yellow text-brand-black rounded text-sm hover:bg-brand-yellow/80 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(faq.id)}
                                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
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
        </div>
    );
}

