import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Checkbox from "@/Components/Checkbox";
import Pagination from "./Pagination";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";

export default function TodoList({ todos, searchQuery }) {
    const form = useForm({ title: "", description: "", status: "" });
    console.log(todos);
    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/todos", {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => console.log(errors),
        });
    };

    const handleUpdate = (id) => {
        const title = prompt("Enter new title");
        if (!title) return;
        const description = prompt("Enter new description");
        if (!description) return;
        const status = prompt("Enter new status");
        if (!status) return;

        router.put(`/todos/${id}`, {
            title,
            description,
            status,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(`/todos/${id}`);
        }
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

    const MapData = ({ list, onDelete, onUpdate }) => {
        const handleCheckBox = (todo) => {
            router.patch(`/todos/${todo.id}/toggle`, {
                isCompleted: !todo.isCompleted,
            });
        };

        return (
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto overflow-y-auto border border-gray-200 max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300">
                <table className="w-full min-w-[800px] text-sm text-left text-gray-700 border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold border-b sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 w-12 text-center">Done</th>
                            <th className="px-6 py-4 bg-gray-50">Title</th>
                            <th className="px-6 py-4 bg-gray-50">
                                Description
                            </th>
                            <th className="px-6 py-4 bg-gray-50">Status</th>
                            <th className="px-6 py-4 text-center bg-gray-50">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((todo) => (
                            <tr
                                key={todo.id}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 text-center">
                                    <Checkbox
                                        checked={todo.isCompleted}
                                        onChange={() => handleCheckBox(todo)}
                                        className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded cursor-pointer"
                                    />
                                </td>
                                <td
                                    className={`px-6 py-4 font-medium ${todo.isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}
                                >
                                    {todo.title}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {todo.isCompleted ? (
                                        <strike className="text-gray-400">
                                            {todo.description}
                                        </strike>
                                    ) : (
                                        todo.description
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-200">
                                        {todo.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                                    <SecondaryButton
                                        onClick={() => onUpdate(todo.id)}
                                        className="px-3 py-1.5 text-xs font-medium"
                                    >
                                        Edit
                                    </SecondaryButton>
                                    <DangerButton
                                        onClick={() => onDelete(todo.id)}
                                        className="px-3 py-1.5 text-xs font-medium"
                                    >
                                        Delete
                                    </DangerButton>
                                </td>
                            </tr>
                        ))}
                        {(!list || list.length === 0) && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-12 text-center text-gray-500 bg-gray-50/50"
                                >
                                    No tasks yet. Create one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
           <AppLayout>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create New Todo
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                    <div className="flex-1 w-full">
                        <TextInput
                            type="text"
                            className="w-full bg-gray-50 focus:bg-white"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData("title", e.target.value)
                            }
                            placeholder="Task Title"
                            required
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <TextInput
                            type="text"
                            className="w-full bg-gray-50 focus:bg-white"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData("description", e.target.value)
                            }
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div className="w-full sm:w-48">
                        <TextInput
                            type="text"
                            className="w-full bg-gray-50 focus:bg-white"
                            value={form.data.status}
                            onChange={(e) =>
                                form.setData("status", e.target.value)
                            }
                            placeholder="Status (e.g. Pending)"
                            required
                        />
                    </div>
                    <PrimaryButton
                        type="submit"
                        disabled={form.processing}
                        className="w-full sm:w-auto py-2.5 shadow-md"
                    >
                        {form.processing ? "Saving..." : "Add Task"}
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

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Your Tasks
                </h2>
                <MapData
                    list={todos.data}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            </div>
            <Pagination links={todos.links} />
            </AppLayout>
    );
}
