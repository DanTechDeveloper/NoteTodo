// layouts/AdminLayout.jsx
import Topbar from "@/Pages/Topbar";
import Sidebar from "@/Pages/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Topbar */}
        <Topbar />
        {/* Main Content */}
        <div style={{ padding: "20px", flex: 1, background: "#f5f5f5" }}>
          {children}
        </div>

      </div>
    </div>
  );
}