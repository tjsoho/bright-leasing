'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useImageLibrary } from '@/contexts/ImageLibraryContext';

interface EditableImageProps {
    src: string;
    alt: string;
    className?: string;
    width: number;
    height: number;
    onImageChange: (url: string) => void;
    usage?: 'mobile' | 'desktop' | string;
}

export default function EditableImage({
    src,
    alt,
    className = '',
    width,
    height,
    onImageChange,
    usage
}: EditableImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { openImageLibrary } = useImageLibrary();

    const handleClick = () => {
        openImageLibrary(onImageChange, usage);
    };

    return (
        <div
            className="relative cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
            />

            <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <span className="text-white text-sm">Click to change image</span>
            </div>
        </div>
    );
}