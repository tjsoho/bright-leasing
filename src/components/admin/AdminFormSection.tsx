import { cn } from "@/lib/utils";

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
  return (
    <section
      className={cn(
        "bg-brand-yellow/10 border border-brand-yellow/20 p-6 rounded-2xl mb-8",
        className,
      )}
    >
      <h2 className="text-xl text-brand-black font-bold mb-4">{title}</h2>

      {children}
    </section>
  );
}
