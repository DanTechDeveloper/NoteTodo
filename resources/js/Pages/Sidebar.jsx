// components/Sidebar.jsx
import { Link, router } from "@inertiajs/react";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h3>Admin</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/dashboard" style={{ color: "#fff" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/users" style={{ color: "#fff" }}>
            Users
          </Link>
        </li>
        <li>
          <Link onClick={()=> router.post("/logout")} style={{ color: "#fff" }}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}