// pages/Dashboard.jsx
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
export default function Dashboard() {
const {totalAdmins, totalRegularUsers, totalNotes, totalTodos} = usePage().props;
  return (
    <AdminLayout>
      <h2>Dashboard</h2>
      <p>Total Admin: {totalAdmins}</p>
      <p>Total Users: {totalRegularUsers}</p>
      <p>Total Notes: {totalNotes}</p>
      <p>Total Todos: {totalTodos}</p>
    </AdminLayout>
  );
}