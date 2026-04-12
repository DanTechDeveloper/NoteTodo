import { useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";

export default function Notepad({ notepad, searchQuery }) {
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

    const [search, setSearch] = useState(searchQuery || "");
    const handleSearchResult = (e) => {
        e.preventDefault();
        router.get(
            `/app`,
            { searchQueryNotepad: search },
            { preserveState: true },
        );
    };
    const [selectedNotepad, setSelectedNotepad] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [handleUpdate, setHandleUpdate] = useState({
        title: "",
        description: "",
    });
    const openNotepad = (note) => {
        setHandleUpdate({
            title: note.title || "",
            description: note.content || "",
        });
        setShowModal(true);
        setSelectedNotepad(note.id);
    };
    const onUpdate = () => {
        router.put(`/notepad/${selectedNotepad}`, {
            title: handleUpdate.title,
            content: handleUpdate.description,
        });
        setShowModal(false);
    }
    const onDelete = () => {
        router.delete(`/notepad/${selectedNotepad}`);
        setShowModal(false);
    }

    return (
        <AppLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Note
            </h2>
            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
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
                <PrimaryButton
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto py-2.5 shadow-md"
                >
                    {processing ? "Saving..." : "Save Note"}
                </PrimaryButton>
            </form>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center">
                <label
                    htmlFor="searchBar"
                    className="font-semibold text-gray-700"
                >
                    Search
                </label>
                <TextInput
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-50 focus:bg-white flex-1 sm:flex-none sm:w-1/3"
                    placeholder="Search notes..."
                />
                <PrimaryButton type="button" onClick={handleSearchResult}>
                    Search
                </PrimaryButton>
                {searchQuery && (
                    <SecondaryButton
                        type="button"
                        onClick={() => {
                            setSearch("");
                            router.get("/app");
                        }}
                    >
                        Clear
                    </SecondaryButton>
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        Your Notes
                    </h2>
                </div>
                <div className="flex flex-col gap-3 p-4">
                    {notepad.data.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => openNotepad(note)}
                            className="cursor-pointer hover:bg-gray-100 text-gray-900 p-2 rounded"
                        >
                            <div>
                                <p className="font-semibold text-lg">{note.title}</p>
                                <p className="text-gray-600 truncate">{note.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination links={notepad.links} />
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="flex flex-col">
                    <InputLabel>Title</InputLabel>
                    <TextInput
                        value={handleUpdate.title}
                        onChange={(e) =>
                            setHandleUpdate({
                                ...handleUpdate,
                                title: e.target.value,
                            })
                        }
                    />
                    <InputLabel>Description</InputLabel>
                    <TextInput
                        value={handleUpdate.description}
                        onChange={(e) =>
                            setHandleUpdate({
                                ...handleUpdate,
                                description: e.target.value,
                            })
                        }
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <PrimaryButton onClick={onUpdate}>Update</PrimaryButton>
                        <DangerButton onClick={onDelete}>Delete</DangerButton>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
