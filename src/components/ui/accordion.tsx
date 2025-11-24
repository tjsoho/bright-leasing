"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Combine refs
  const combinedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      triggerRef.current = node;
    },
    [ref]
  );

  // Check state from data-state attribute
  React.useEffect(() => {
    const checkState = () => {
      if (triggerRef.current) {
        const state = triggerRef.current.getAttribute("data-state");
        setIsOpen(state === "open");
      }
    };

    // Check initial state
    checkState();

    // Use MutationObserver to watch for state changes
    const observer = new MutationObserver(checkState);
    if (triggerRef.current) {
      observer.observe(triggerRef.current, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={combinedRef}
        className={cn(
          "flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
        <div className="relative">
          {/* Plus icon - visible when closed, rotates on hover */}
          <Plus
            size={20}
            strokeWidth={2.5}
            className={cn(
              "shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] text-brand-yellow rounded-full border border-brand-yellow p-2 w-8 h-8",
              isOpen
                ? "opacity-0 rotate-90 scale-0"
                : isHovered
                  ? "opacity-100 rotate-90 scale-100"
                  : "opacity-100 rotate-0 scale-100"
            )}
            aria-hidden="true"
          />
          {/* Minus icon - visible when open, rotates on hover */}
          <Minus
            size={20}
            strokeWidth={2.5}
            className={cn(
              "shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] absolute top-0 left-0 text-brand-yellow rounded-full border border-brand-yellow p-2 w-8 h-8",
              isOpen
                ? isHovered
                  ? "opacity-100 rotate-90 scale-100"
                  : "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-0"
            )}
            aria-hidden="true"
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-2 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
