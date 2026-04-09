import AdminLayout from "@/Layouts/AdminLayout";

export default function Users({users}){
    return <>
    <AdminLayout>
        <h2>Users</h2>
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    </AdminLayout>
    </>
}