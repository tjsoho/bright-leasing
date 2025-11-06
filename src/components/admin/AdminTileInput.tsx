import { Trash2Icon } from "lucide-react";
import EditableImage from "../core/editable-image";
import { EditableElement } from "../core/input";
import { Button } from "../ui/button";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";

export interface AdminTileInputProps {
  label: string;
  title: string;
  titleBold: boolean;
  description: string;
  descriptionBold: boolean;
  image?: string;
  onTitleChange: (value: string) => void;
  onTitleBoldChange: (value: boolean) => void;
  onDescriptionChange: (value: string) => void;
  onDescriptionBoldChange: (value: boolean) => void;
  onImageChange?: (value: string) => void;
  onRemove?: () => void;
  type?: "faq" | "default";
  hint?: string;
}

export default function AdminTileInput({
  label,
  description,
  descriptionBold,
  image,
  onDescriptionBoldChange,
  onDescriptionChange,
  onImageChange,
  onTitleBoldChange,
  onTitleChange,
  title,
  titleBold,
  onRemove,
  type = "default",
  hint,
}: AdminTileInputProps) {
  return (
    <div className="bg-brand-black p-3 rounded-lg border border-gray-700 relative">
      {onRemove && (
        <div className="absolute top-3 right-3">
          <Button
            variant="destructive"
            size="icon"
            onClick={onRemove}
            className="rounded-md"
          >
            <Trash2Icon />
          </Button>
        </div>
      )}

      <h4 className="text-white font-medium mb-4">{label}</h4>
      <div
        className={match(type)
          .with("faq", () => "grid grid-cols-1 gap-4")
          .otherwise(() => "grid grid-cols-1 md:grid-cols-2 gap-4")}
      >
        <div>
          <label className="block text-brand-white text-xs mb-1">
            {type === "faq" ? "Question" : "Title"}
          </label>
          <EditableElement
            as="textarea"
            className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
            onTextChange={onTitleChange}
            defaultValue={title}
          />
          <div className="mt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={titleBold}
                onChange={(e) => onTitleBoldChange(e.target.checked)}
                className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
              />
              <span className="text-brand-white text-xs">Bold</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-brand-white text-xs mb-1">
            {type === "faq" ? "Answer" : "Description"}
          </label>
          <EditableElement
            as="textarea"
            onTextChange={onDescriptionChange}
            defaultValue={description}
            className={cn(
              "w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16",
              match(type)
                .with("faq", () => "bg-gray-500 text-brand-white")
                .otherwise(() => ""),
            )}
          />
          <div className="mt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={descriptionBold}
                onChange={(e) => onDescriptionBoldChange(e.target.checked)}
                className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
              />
              <span className="text-brand-white text-xs">Bold</span>
            </label>
          </div>
        </div>
      </div>
      {onImageChange && image && (
        <div className="mt-4">
          <label className="block text-brand-black/70 text-xs mb-1">Icon</label>
          <div className="bg-gray-500 rounded-lg p-1 inline-block">
            <EditableImage
              src={image}
              alt={`${label} Icon`}
              width={48}
              height={48}
              onImageChange={onImageChange}
              className="w-16 h-16 rounded-lg object-cover border-2 p-1 border-brand-yellow"
            />
          </div>
        </div>
      )}

      {hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );
}
