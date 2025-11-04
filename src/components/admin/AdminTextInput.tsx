import { EditableElement } from "../core/input";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  bold?: boolean;
  onBoldChange?: (value: boolean) => void;
}

export default function AdminTextInput({
  label,
  onChange,
  value,
  hint,
  // bold,
  // onBoldChange,
}: Props) {
  return (
    <div>
      <label className="block text-brand-black text-sm font-medium mb-2">
        {label}
      </label>
      <EditableElement
        as="textarea"
        className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors"
        onTextChange={onChange}
        defaultValue={value}
      />

      {/*<div className="mt-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={bold}
            onChange={
              onBoldChange ? (e) => onBoldChange(e.target.checked) : undefined
            }
            className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
          />
          <span className="text-brand-black text-sm">
            Make {label} bold (500 weight)
          </span>
        </label>
      </div>*/}

      {hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );
}
