"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";

interface BWestButtonProps {
    text?: string;
    className?: string;
    variant?: "default" | "inverted";
    onClick?: () => void;
}

export function BWestButton({
    text = "Open an account",
    className = "",
    variant = "default",
    onClick
}: BWestButtonProps) {
    const isInverted = variant === "inverted";
    const [swipeProgress, setSwipeProgress] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const touchStartX = useRef<number>(0);
    const buttonLeft = useRef<number>(0);
    const hasTriggered = useRef<boolean>(false);

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        const touch = e.touches[0];
        touchStartX.current = touch.clientX;
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            buttonLeft.current = rect.left;
        }
        setIsSwiping(true);
        hasTriggered.current = false;
        setSwipeProgress(0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
        if (!isSwiping || !buttonRef.current) return;

        const touch = e.touches[0];
        const currentX = touch.clientX;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonWidth = buttonRect.width;

        // Calculate where the finger is relative to the button
        const relativeFingerX = currentX - buttonRect.left;

        // Only allow swiping from left to right
        if (relativeFingerX < 0) {
            setSwipeProgress(0);
            return;
        }

        // Calculate progress: how far across the button the finger has moved
        // Progress is 0 when finger is at the left edge, 1 when at the right edge
        const padding = 4;
        const progress = Math.min((relativeFingerX - padding) / (buttonWidth - (padding * 2)), 1);

        setSwipeProgress(progress);

        // Trigger onClick when 75% (0.75) is reached
        if (progress >= 0.95 && !hasTriggered.current && onClick) {
            hasTriggered.current = true;
            onClick();
        }
    };

    const handleTouchEnd = () => {
        if (swipeProgress >= 0.75) {
            // Keep it at full if threshold was reached
            setSwipeProgress(1);
            // Reset after a brief moment
            setTimeout(() => {
                setSwipeProgress(0);
            }, 300);
        } else {
            // Reset if threshold wasn't reached
            setSwipeProgress(0);
        }
        setIsSwiping(false);
    };

    // Calculate the width and position of the sliding circle based on swipe progress
    const getCircleStyle = () => {
        if (!isSwiping || !buttonRef.current) return {};

        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        const initialWidth = 56; // w-14 = 56px
        const padding = 4; // left-1 and right-1 = 4px each (0.5rem = 8px, but we use 4px for 1)
        const maxSize = Math.min(buttonWidth - (padding * 2), buttonHeight - (padding * 2));

        // Circle grows from initial width to max size as it slides
        const circleSize = initialWidth + (swipeProgress * (maxSize - initialWidth));

        // Slide from left to right based on progress (similar to desktop hover)
        // Start at left: padding, end at right: buttonWidth - padding - circleSize
        const startLeft = padding;
        const endLeft = buttonWidth - padding - circleSize;
        const circleLeft = startLeft + (swipeProgress * (endLeft - startLeft));

        // Center vertically
        const circleTop = (buttonHeight - circleSize) / 2;

        return {
            left: `${circleLeft}px`,
            top: `${circleTop}px`,
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            transition: 'none'
        };
    };

    return (
        <Button
            ref={buttonRef}
            onClick={onClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`group relative overflow-hidden ${isInverted
                ? "bg-brand-black hover:bg-brand-black/90 text-brand-yellow border-0"
                : "bg-brand-yellow hover:bg-brand-teal text-brand-black border-0"
                } rounded-full px-8 py-8 text-lg font-medium ${className}`}
            size="lg"
        >
            {/* Text that stays visible */}
            <span className={`relative z-20 transition-colors duration-500 ${isSwiping && swipeProgress >= 0.75
                ? isInverted ? "text-brand-black" : "text-white"
                : isInverted
                    ? "group-hover:text-brand-black"
                    : "group-hover:text-white"
                }`}>
                {text}
            </span>

            {/* Teal circle that slides across and grows */}
            <div
                className={`absolute rounded-full ${isInverted
                    ? "bg-brand-yellow"
                    : "bg-brand-teal"
                    } z-10 flex items-center justify-end pr-4 ${isSwiping ? "" : "left-1 top-1 bottom-1 w-14 h-14 transition-all duration-500 group-hover:right-1 group-hover:w-[calc(100%-0.5rem)] group-hover:h-[calc(100%-0.5rem)] group-hover:top-1 group-hover:bottom-1"
                    }`}
                style={isSwiping ? getCircleStyle() : {}}
            >
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                    className={`${isInverted
                        ? "text-brand-black"
                        : "text-white"
                        }`}
                />
            </div>
        </Button>
    );
}
