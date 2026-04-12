import TextInput from "@/Components/TextInput";
import Modal from "../Components/Modal";
import { useState } from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Checkbox from "@/Components/Checkbox";
export default function MapData({ list}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [handleUpdate, setHandleUpdate] = useState({
        title: "",
        description: "",
        status: "",
    });
    const openTodoList = (todo) => {
        setShowModal(true);
        setSelectedTodo(todo.id);
        setHandleUpdate({
            title: todo.title || "",
            description: todo.description || "",
            status: todo.status || "",
        });
    };
    const handleCheckBox = (todos) => {
        router.patch(`/todos/${todos.id}/toggle`, {
            isCompleted: !todos.isCompleted,
        });
    }
    const onUpdate = () => {
        router.put(`/todos/${selectedTodo}`, handleUpdate);
        setShowModal(false);
    }
    const onDelete = () => {
        router.delete(`/todos/${selectedTodo}`);
        setShowModal(false);
    }


    return (
        <>
            <div className="flex flex-col gap-3">
                {list.map((todo) => (
                    <div className="flex gap-4 items-center">
                        <div>
                            <Checkbox
                                checked={todo.isCompleted}
                                onChange={() => handleCheckBox(todo)}
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded cursor-pointer"
                            />
                        </div>
                        <div
                            key={todo.id}
                            onClick={() => openTodoList(todo)}
                            className={`cursor-pointer hover:bg-gray-100 ${todo.isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}
                        >
                            <div>
                                <p>{todo.title}</p>
                                <p>{todo.description}</p>
                                <p>{todo.status}</p>
                            </div>
                        </div>
                    </div>
                ))} 
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <div className="flex flex-col">
                        <InputLabel>Title</InputLabel>
                        <TextInput 
                            value={handleUpdate.title}
                            onChange={(e) => setHandleUpdate({ ...handleUpdate, title: e.target.value })}
                        />
                        <InputLabel>Description</InputLabel>
                        <TextInput
                            value={handleUpdate.description}
                            onChange={(e) => setHandleUpdate({ ...handleUpdate, description: e.target.value })}
                        />
                        <InputLabel>Status</InputLabel>
                        <TextInput 
                            value={handleUpdate.status}
                            onChange={(e) => setHandleUpdate({ ...handleUpdate, status: e.target.value })}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <PrimaryButton onClick={onUpdate}>
                                Update
                            </PrimaryButton>
                            <DangerButton onClick={onDelete}>
                                Delete
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}
