import { router, useForm } from "@inertiajs/react";
export default function TodoList({ todos }) {
    const form = useForm({ title: "", description: "", status: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/todos", {
            onSuccess: () => {
                form.reset();
            },
            onError: (errors) => console.log(errors),
        });
    };
    const MapData = ({ data, onDelete, onUpdate }) => {
        const handleCheckBox = (todo) => {
            router.patch(`/todos/${todo.id}/toggle`, {
                isCompleted: !todo.isCompleted,
            });
        };
        return (
            <>
                {data.map((todo) => (
                    <div key={todo.id}>
                        <h1>{todo.title}</h1>
                        <p>
                            {todo.isCompleted ? (
                                <strike>{todo.description}</strike>
                            ) : (
                                todo.description
                            )}
                        </p>
                        <p>{todo.status}</p>
                        <input
                            type="checkbox"
                            name="MAD"
                            id="MAD"
                            onChange={() => handleCheckBox(todo)}
                            checked={todo.isCompleted}
                        />
                        <button type="button" onClick={() => onUpdate(todo.id)}>
                            UPDATE
                        </button>
                        <button type="button" onClick={() => onDelete(todo.id)}>
                            DELETE
                        </button>
                    </div>
                ))}
            </>
        );
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
        router.delete(`/todos/${id}`);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={form.data.title}
                    onChange={(e) => form.setData("title", e.target.value)}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={form.data.description}
                    onChange={(e) =>
                        form.setData("description", e.target.value)
                    }
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={form.data.status}
                    onChange={(e) => form.setData("status", e.target.value)}
                    placeholder="Status"
                />
                <button type="submit" disabled={form.processing}>
                    {form.processing ? "Sending..." : "Submit"}
                </button>
            </form>

            <MapData
                data={todos}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
           <button type="button" onClick={() => router.get("/todo-list")}>TodoList</button>
           <button type="button" onClick={() => router.get("/notepad-list")}>Notepad</button>
        </>
    );
}
