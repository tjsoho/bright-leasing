"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AdminFormSection({
  title,
  className,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={cn(
        "bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl mb-8 overflow-hidden",
        className,
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-brand-yellow/20 transition-colors"
      >
        <h2 className="text-xl text-brand-black font-bold">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-black" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-black" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0">
          {children}
        </div>
      )}
    </section>
  );
}
