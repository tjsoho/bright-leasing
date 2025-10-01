'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageUsage {
    url: string;
    usedIn: {
        mobile?: boolean;
        desktop?: boolean;
        other?: string[];
    };
}

interface MediaLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentUsage?: ImageUsage[];
}

export default function MediaLibraryModal({ isOpen, onClose, onSelect, currentUsage = [] }: MediaLibraryModalProps) {
    const [images, setImages] = useState<{ name: string; url: string; created_at: string; }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadImages();
        }
    }, [isOpen]);

    const loadImages = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let allFiles: { name: string; created_at: string; }[] = [];
            let offset = 0;
            const limit = 100;

            // Keep fetching until we get all files
            while (true) {
                const { data, error } = await supabase.storage
                    .from('site-images')
                    .list('', {
                        limit: limit,
                        offset: offset,
                        sortBy: { column: 'created_at', order: 'desc' }
                    });

                if (error) throw error;

                if (!data || data.length === 0) break;

                allFiles = [...allFiles, ...data];

                if (data.length < limit) break;
                offset += limit;
            }

            const imageUrls = await Promise.all(
                allFiles.map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('site-images')
                        .getPublicUrl(file.name);

                    return {
                        name: file.name,
                        url: publicUrl,
                        created_at: file.created_at
                    };
                })
            );

            // Sort by created_at in descending order (newest first)
            const sortedImages = imageUrls.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setImages(sortedImages);
        } catch (error) {
            console.error('Error loading images:', error);
            setError('Failed to load images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (imageName: string) => {
        if (!confirm('Are you sure you want to delete this image?')) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.storage
                .from('site-images')
                .remove([imageName]);

            if (error) throw error;

            setImages(prev => prev.filter(img => img.name !== imageName));
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Failed to delete image');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('site-images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('site-images')
                    .getPublicUrl(fileName);

                return {
                    name: fileName,
                    url: publicUrl,
                    created_at: new Date().toISOString()
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImages(prev => [...uploadedImages, ...prev]);
        } catch (error) {
            console.error('Error uploading files:', error);
            setError('Failed to upload one or more files');
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-black border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Media Library</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-800">
                    <div className="flex justify-end">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white hover:bg-gray-100 text-black px-6 py-2 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload Files'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={isLoading}
                            multiple
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-400 mt-2">{error}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-grow p-6 bg-black/50 scrollbar-none">
                    {images.map((image, index) => (
                        <div
                            key={`${image.url}-${index}`}
                            className={`group relative cursor-pointer overflow-hidden bg-gray-900 border-2 ${currentUsage.some(u => u.url === image.url)
                                ? 'border-white'
                                : 'border-gray-800 hover:border-gray-600'
                                } p-3 flex flex-col items-center justify-center h-48 transition-all duration-200`}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Usage badges */}
                                {currentUsage.find(u => u.url === image.url) && (
                                    <div className="absolute top-0 left-0 flex gap-1 z-10 p-1">
                                        {currentUsage.find(u => u.url === image.url)?.usedIn.desktop && (
                                            <span className="bg-blue-500 text-white text-xs px-2 py-1">
                                                Desktop
                                            </span>
                                        )}
                                        {currentUsage.find(u => u.url === image.url)?.usedIn.mobile && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1">
                                                Mobile
                                            </span>
                                        )}
                                        {currentUsage.find(u => u.url === image.url)?.usedIn.other?.map((usage, i) => (
                                            <span key={i} className="bg-purple-500 text-white text-xs px-2 py-1">
                                                {usage}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <Image
                                    src={image.url}
                                    alt={`Library image ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="object-contain max-h-full transition-transform duration-200 group-hover:scale-105"
                                    onError={() => {
                                        console.error(`Failed to load image: ${image.url}`);
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-end pb-4 gap-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect(image.url);
                                            }}
                                            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-500"
                                        >
                                            Select
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(image.name);
                                            }}
                                            className="px-4 py-2 bg-gray-900 text-red-400 hover:bg-red-950 hover:text-red-300 transition-colors border border-red-900 hover:border-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-400 text-xs px-2 text-center truncate max-w-full">
                                            {image.name}
                                        </p>
                                        {currentUsage.some(u => u.url === image.url) && (
                                            <p className="text-white text-xs px-2 text-center">
                                                Currently Used
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}