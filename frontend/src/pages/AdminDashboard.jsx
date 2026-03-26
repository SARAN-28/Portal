import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminInvite from "./AdminInvite";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {

    const fetchAdmin = async () => {

      try {

        await api.get("/admin/admin-dashboard");

      } catch (error) {

        localStorage.removeItem("token");
        navigate("/");

      }
    };

    fetchAdmin();

  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-sidebar">

        <h3>Dashboard</h3>

        <button className="invite-btn" onClick={() => setShowInvite(true)}>
          Send Employee Invite
        </button>
        {showInvite && (
          <AdminInvite close={() => setShowInvite(false)} />
        )}

        <button className="emp-list-btn" onClick={() => navigate("/admin-employees")}>
          Employees List
        </button>
      </div>

      <div className="admin-dashboard-content">
        <h1>Admin Dashboad</h1>
        <h3>Welcome Admin </h3>
      </div>

    </div>
  );
};

export default AdminDashboard;