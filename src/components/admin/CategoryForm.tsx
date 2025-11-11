/* ************************************************************
                        NOTES
************************************************************ */
// Category form component for FAQ management
// Matches app styling with AdminFormSection and brand colors
/* ************************************************************
                        IMPORTS
************************************************************ */
'use client';

import { useState } from 'react';
import { createFAQCategory, deleteFAQCategory } from '@/server-actions/faq';
import { FAQCategory } from '@/app/types/faq';
import AdminFormSection from '@/components/admin/AdminFormSection';
import toast from 'react-hot-toast';

/* ************************************************************
                        INTERFACES
************************************************************ */
interface CategoryFormProps {
    categories: FAQCategory[];
    onSuccess: () => void;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function CategoryForm({ categories, onSuccess }: CategoryFormProps) {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [newCategory, setNewCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setIsSubmitting(true);
        try {
            await createFAQCategory(newCategory);
            setNewCategory('');
            toast.success('Category created successfully');
            onSuccess();
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? All FAQs will be moved to General.')) return;

        try {
            await deleteFAQCategory(id);
            toast.success('Category deleted successfully');
            onSuccess();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error deleting category:', error);
            if (errorMessage.includes('Cannot delete the General category')) {
                toast.error('Cannot delete the General category');
            } else {
                toast.error('Failed to delete category');
            }
        }
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <AdminFormSection title="FAQ Categories">
            {/* Create Category Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category name"
                        className="flex-1 px-4 py-2 bg-white border border-brand-black/20 text-brand-black rounded-lg focus:border-brand-teal focus:outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-brand-yellow text-brand-black rounded-lg font-semibold hover:bg-brand-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Category'}
                    </button>
                </div>
            </form>

            {/* Categories List */}
            <div className="space-y-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-4 bg-white border border-brand-black/10 rounded-lg"
                    >
                        <span className="text-brand-black font-medium">{category.name}</span>
                        {category.id !== '00000000-0000-0000-0000-000000000000' && (
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </AdminFormSection>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
