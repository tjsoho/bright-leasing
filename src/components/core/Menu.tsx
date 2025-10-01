"use client";

import Link from "next/link";
import ShiningButton from "../../ui/ShiningButton";
import { navigationLinks } from "@/components/core/navigation";

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
    return (
        <div
            className={`fixed inset-0 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
        >
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black bg-opacity-50 ${isOpen ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                onClick={onClose}
            />

            {/* Menu Content */}
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
                <div className="p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <nav className="mt-8 space-y-4">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
                                onClick={onClose}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="md:hidden mt-6">
                            <ShiningButton
                                href="/get-started"
                                className="!bg-black !border-black hover:!border-gray-800"
                            >
                                GET STARTED
                            </ShiningButton>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Menu;
