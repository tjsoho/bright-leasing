"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Save, Home } from "lucide-react";

interface SaveBannerProps {
  pageTitle: string;
  onSave: () => void;
  isSaving?: boolean;
}

const adminPages = [
  { href: "/admin/home", label: "Home", description: "Homepage content" },
  { href: "/admin/about-us", label: "About Us", description: "Company information" },
  { href: "/admin/team", label: "Team", description: "Team members" },
  { href: "/admin/blog", label: "Articles", description: "Blog posts" },
  { href: "/admin/faqs", label: "FAQs", description: "Frequently asked questions" },

];

export function SaveBanner({
  pageTitle,
  onSave,
  isSaving = false,
}: SaveBannerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white border-b border-brand-black/10 shadow-sm z-50 sticky top-0">
      <div className="mx-auto px-4 lg:px-6 flex justify-center items-center w-full h-full">
        <div className="flex justify-between items-center h-14 w-full">
          {/* Back to Admin Dashboard */}
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-semibold hover:bg-brand-yellow/80 transition-colors duration-300 shadow-md"
          >
            <Home className="w-4 h-4" />
            Admin
          </Link>

          {/* Page Title with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-2 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-teal/80 transition-colors duration-300 shadow-md"
            >
              {pageTitle}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10 right-0">
                <div className="py-2">
                  {adminPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-3 text-brand-black hover:bg-brand-yellow/50 transition-colors duration-200 border-b"
                    >
                      <span className="font-medium">{page.label}<br></br></span>
                      <span className="text-[14px] text-brand-black/70">{page.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-brand-yellow text-brand-black rounded-lg font-semibold hover:bg-brand-yellow/80 disabled:opacity-50 transition-colors duration-300 shadow-md"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
