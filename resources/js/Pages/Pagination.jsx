import { router } from "@inertiajs/react";

export default function Pagination({links}) {
    return (
        <div className="flex justify-center gap-1 mt-6 mb-4">
            {links.map((link, i) => (
                <button
                    key={i}
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url)}
                    className={`
                        px-4 py-2 text-sm font-medium border rounded-md transition-colors
                        ${link.active 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        }
                        ${!link.url ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
                    `}
                     dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
