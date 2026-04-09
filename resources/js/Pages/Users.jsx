import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";

export default function Users({ users }) {
    const handleOnDelete = (id) => {
        router.delete(`/users/${id}`);
    };
    return (
        <>
            <AdminLayout>
                <h2>Users</h2>
                <ul>
                    {users.map((user) => (
                        <div className="flex flex-col">
                            <li key={user.id}>
                                {user.name} - {user.email}
                            </li>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    // onClick={() =>
                                    //     handleOnClick("Edit", user.id)
                                    // }
                                >
                                    EDIT
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleOnDelete(user.id)
                                    }
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </AdminLayout>
        </>
    );
}
