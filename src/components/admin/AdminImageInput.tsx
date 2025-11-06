import EditableImage from "../core/editable-image";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function AdminImageInput({ value, label, onChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-brand-black text-sm font-medium mb-2">
        {label}
      </label>

      {/* Image Preview */}
      <div className="aspect-video bg-gray-500 rounded-lg overflow-hidden h-48">
        <EditableImage
          src={value}
          alt={label}
          width={1920}
          height={1080}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity border-2 p-1 border-brand-yellow"
          onImageChange={(value) => onChange(value)}
          usage="desktop"
        />
      </div>

      {/* Image URL Input */}
      <div className="space-y-3">
        <div>
          <label className="block text-brand-black/70 text-xs mb-1">
            Or paste an image URL directly
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              // Clear the current image
              onChange("/placeholder.jpg");
            }}
            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
          >
            Clear Image
          </button>
          <button
            type="button"
            onClick={() => {
              // Set the example URL you provided
              onChange(
                "https://cdn.imagin.studio/getImage?customer=au-karia&make=toyota&modelFamily=corolla&modelRange=GR&modelVariant=ca&modelYear=2025&countryCode=0&licensePlateType=eu&paintId=Yellow&angle=204&tailoring=karia&width=3456&zoomLevel=1&billingTag=brightleasing-website",
              );
            }}
            className="px-3 py-1 bg-brand-yellow/20 text-brand-black rounded text-xs hover:bg-brand-yellow/30 transition-colors"
          >
            Use Example
          </button>
        </div>
      </div>

      <p className="text-gray-400 text-xs">
        Click image to choose from library, or paste a direct URL above
      </p>
    </div>
  );
}
