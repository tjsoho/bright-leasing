import Link from "next/link";

interface SaveBannerProps {
  pageTitle: string;
  onSave: () => void;
  isSaving?: boolean;
}

export function SaveBanner({
  pageTitle,
  onSave,
  isSaving = false,
}: SaveBannerProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm z-50 sticky top-28">
      <div className="mx-auto px-4 lg:px-6 flex justify-center items-center w-full h-full">
        <div className="flex justify-between items-center h-12 w-full">
          {/* button to admin page */}
          <Link href="/admin" className="text-lg font-semibold text-gray-900 border border-black  px-4 py-1">Admin</Link>
          <h1 className="text-lg font-semibold text-gray-900 underline">{pageTitle}</h1>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {isSaving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
