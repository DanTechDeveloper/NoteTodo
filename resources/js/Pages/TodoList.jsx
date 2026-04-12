import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Checkbox from "@/Components/Checkbox";
import Pagination from "./Pagination";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import MapData from "./MapData";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
export default function TodoList({ todos, searchQuery }) {
    const form = useForm({ title: "", description: "", date: "", important: false });
    console.log(todos);
    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/todos", {
            onSuccess: () => {
                form.reset();
                setShowModal(false);
            },
            onError: (errors) => console.log(errors),
        });
    };



    const [search, setSearch] = useState(searchQuery || "");
    const handleSearchResult = (e) => {
        e.preventDefault();
        router.get(
            `/app`,
            { searchQueryTodoList: search },
            { preserveState: true },
        );
    };

    const [showModal, setShowModal] = useState(false);

    const handleNewTodo = () => {
        setShowModal(true);
    };



    return (
           <AppLayout>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create New Todo
                </h2>
              
                    <PrimaryButton
                        type="submit"
                        className="w-full sm:w-auto py-2.5 shadow-md"
                        onClick={handleNewTodo}
                    >
                        Add New Todo
                    </PrimaryButton>
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
                        placeholder="Search tasks..."
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="flex flex-col gap-4">

                <select className=" w-[200px] h-[50px] bg-gray-50 focus:bg-white" name="" id="">
                    <option value="all">All to-dos</option>
                    <option value="recentlyDeleted">Recently Deleted</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                </select>
                <MapData
                    list={todos.data}
                    
                    />
                    </div>
            </div>
            <Pagination links={todos.links} />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                        <InputLabel>Title</InputLabel>
                        <TextInput
                            type="text"
                            name="title"
                            id="title"
                            value={form.title}
                            onChange={(e) => form.setData("title", e.target.value)}
                            className="bg-gray-50 focus:bg-white"
                            placeholder="Title"
                            required
                        />
                        <InputLabel>Description</InputLabel>
                        <TextInput
                            type="text"
                            name="description"
                            id="description"
                            value={form.description}
                            onChange={(e) => form.setData("description", e.target.value)}
                            className="bg-gray-50 focus:bg-white"
                            placeholder="Description"
                            required
                        />
                        <InputLabel>Date</InputLabel>
                        <TextInput
                            type="datetime-local"
                            name="date"
                            id="date"
                            value={form.date}
                            onChange={(e) => form.setData("date", e.target.value)}
                            className="bg-gray-50 focus:bg-white"
                            required
                        />
                        <div className="flex items-center gap-3">
                            <Checkbox
                            name="important"
                            id="important"
                            value={form.important}
                            onChange={(e) => form.setData("important", e.target.value)}
                            >
                            </Checkbox>
                            <InputLabel>Mark as Important</InputLabel>
                        </div>
                        <PrimaryButton type="submit">
                            {form.processing ? "Adding..." : "Save"}
                        </PrimaryButton>
                    </form>
            </Modal>
            </AppLayout>
    );
}
