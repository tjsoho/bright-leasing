'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupplementPageProps } from '@/app/supplement/_config';
import { getProducts } from '@/utils/shopify';
import { ShopifyProduct } from '@/types/shopify';

interface Section1ProductsProps {
    content: SupplementPageProps['content'];
}

export default function Section1Products({ content }: Section1ProductsProps) {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(20);
                const featuredProducts = data.products.filter((product: ShopifyProduct) =>
                    content.featuredProductIds?.includes(product.id)
                );
                setProducts(featuredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (content?.featuredProductIds?.length > 0) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [content?.featuredProductIds]);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-white text-lg">Loading products...</div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-white/60 text-lg">No featured products selected.</div>
            </div>
        );
    }

    return (
        <section className="py-24 bg-black">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-white mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => {
                        const firstImage = product.images[0];
                        const firstVariant = product.variants[0];

                        return (
                            <div
                                key={product.id}
                                className="group bg-black shadow-md overflow-hidden hover:shadow-lg border border-white/50 p-3 hover:border-white/80 hover:text-white hover:scale-105 transition-transform duration-500"
                            >
                                <Link href={`/products/${product.handle}`}>
                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                                        {firstImage ? (
                                            <Image
                                                src={firstImage.url}
                                                alt={firstImage.altText || product.title}
                                                width={400}
                                                height={400}
                                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div className="py-3 w-full">
                                    <Link href={`/products/${product.handle}`}>
                                        <h3 className="text-[14px] font-semibold text-white/70 group-hover:text-white transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-bold text-white">
                                                ${Number(firstVariant?.price.amount || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}