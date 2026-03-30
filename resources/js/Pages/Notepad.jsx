import { useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Pagination from "./Pagination";

export default function Notepad({ notepad }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        post("/notepad", {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => console.log(errors),
        });
    };

    const handleOnUpdate = (id) => {
        const title = prompt("Enter new title");
        if (!title) return;
        const content = prompt("Enter new content");
        if (!content) return;
        router.put(`/notepad/${id}`, { title, content });
    };

    const handleOnDelete = (id) => {
        if(confirm("Are you sure you want to delete this note?")) {
            router.delete(`/notepad/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Navigation Header */}
                <div className="flex bg-white shadow-sm p-4 rounded-xl border border-gray-100 gap-4">
                    <button 
                        onClick={() => router.get("/todo-list")} 
                        className="px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Todo List
                    </button>
                    <button 
                        onClick={() => router.get("/notepad-list")} 
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium tracking-wide shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                        Notepad
                    </button>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Note</h2>
                    <form onSubmit={handleOnSubmit} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1 w-full">
                            <TextInput
                                type="text"
                                className="w-full bg-gray-50 focus:bg-white"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Note Title"
                                required
                            />
                        </div>
                        <div className="flex-[2] w-full">
                            <TextInput
                                type="text"
                                className="w-full bg-gray-50 focus:bg-white"
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                                placeholder="Content"
                                required
                            />
                        </div>
                        <PrimaryButton type="submit" disabled={processing} className="w-full sm:w-auto py-2.5 shadow-md">
                            {processing ? "Saving..." : "Save Note"}
                        </PrimaryButton>
                    </form>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                     <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Your Notes</h2>
                     </div>
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold border-b">
                            <tr>
                                <th className="px-6 py-4 w-1/4">Title</th>
                                <th className="px-6 py-4 w-1/2">Content</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notepad.data.map((note) => (
                                <tr key={note.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 align-top">
                                        {note.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 align-top whitespace-pre-wrap">
                                        {note.content}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap align-top">
                                        <SecondaryButton type="button" onClick={() => handleOnUpdate(note.id)} className="px-3 py-1.5 text-xs font-medium">
                                            Edit
                                        </SecondaryButton>
                                        <DangerButton type="button" onClick={() => handleOnDelete(note.id)} className="px-3 py-1.5 text-xs font-medium">
                                            Delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                            {(!notepad.data || notepad.data.length === 0) && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                                        No notes yet. Create one above!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    <Pagination links={notepad.links} />
                </div>
            </div>
        </div>
    );
}
