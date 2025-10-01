'use client';

import { useState, useEffect } from 'react';
import LuxeButton from '@/components/core/LuxeButton';
import { getProducts } from '@/utils/shopify';
import { ShopifyProduct } from '@/types/shopify';

interface ProductSelectorProps {
    selectedProductIds: string[];
    onProductsSelected: (productIds: string[]) => void;
}

export default function ProductSelector({ selectedProductIds, onProductsSelected }: ProductSelectorProps) {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchProducts();
        }
    }, [isOpen]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts(20); // Fetch first 20 products
            console.log('Fetched products:', data.products);
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleProduct = (product: ShopifyProduct) => {
        console.log('Toggling product:', product.id);
        const newSelectedIds = selectedProductIds.includes(product.id)
            ? selectedProductIds.filter(id => id !== product.id)
            : [...selectedProductIds, product.id];
        console.log('New selected IDs:', newSelectedIds);
        onProductsSelected(newSelectedIds);
    };

    if (!isOpen) {
        return (
            <div className="flex flex-col items-start space-y-2">
                <LuxeButton
                    onClick={() => setIsOpen(true)}
                    className="!px-8 !py-3 text-lg"
                >
                    🎯 Select Featured Products ({selectedProductIds.length} selected)
                </LuxeButton>
                {selectedProductIds.length > 0 && (
                    <p className="text-white/60 text-sm">
                        {selectedProductIds.length} product{selectedProductIds.length !== 1 ? 's' : ''} selected
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black border border-white/20 p-8 rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto mx-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Select Featured Products</h2>
                        <p className="text-white/60">
                            {selectedProductIds.length} product{selectedProductIds.length !== 1 ? 's' : ''} selected
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/60 hover:text-white text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className="text-white text-center py-12">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => {
                            const isSelected = selectedProductIds.includes(product.id);

                            return (
                                <div
                                    key={product.id}
                                    className={`p-4 border cursor-pointer transition-all ${isSelected
                                        ? 'border-white bg-white/10 scale-[0.98]'
                                        : 'border-white/20 hover:border-white/40 hover:scale-[1.02]'
                                        }`}
                                    onClick={() => toggleProduct(product)}
                                >
                                    <div className="aspect-square relative mb-4 overflow-hidden">
                                        {product.images[0] && (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.images[0].altText || product.title}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        )}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-lg">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-white font-medium line-clamp-2">{product.title}</h3>
                                    <p className="text-white/60 mt-1">
                                        ${product.variants[0]?.price.amount || '0.00'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-8 flex justify-end space-x-4 border-t border-white/20 pt-6">
                    <LuxeButton
                        onClick={() => setIsOpen(false)}
                        className="!px-8 !py-3 text-lg"
                    >
                        ✓ Save Selection ({selectedProductIds.length})
                    </LuxeButton>
                </div>
            </div>
        </div>
    );
}