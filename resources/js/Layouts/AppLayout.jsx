import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ children }) {
    const { url } = usePage();
    
    const activeClass = "px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium tracking-wide shadow-sm hover:bg-indigo-700 transition-colors";
    const nonActiveClass = "px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors";

    return (
        <>
            <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Navigation Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex bg-white shadow-sm p-4 rounded-xl border border-gray-100 gap-4">
                            <Link
                                href="/todo-list"
                                className={url.startsWith('/todo-list') ? activeClass : nonActiveClass}
                            >
                                Todo List
                            </Link>
                            <Link
                                href="/notepad"
                                className={url.startsWith('/notepad') ? activeClass : nonActiveClass}
                            >
                                Notepad
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/logout"
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium tracking-wide shadow-sm hover:bg-indigo-700 transition-colors"
                            >
                                LOG-OUT
                            </Link>
                        </div>
                    </div>
                </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                {children}
                </div>
            </div>
        </>
    );
}
