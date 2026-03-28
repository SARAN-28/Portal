import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminInvite from "./AdminInvite";
import "../styles/adminDashboard.css";
import { FaUsers, FaEnvelope, } from "react-icons/fa";

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
          <FaEnvelope /> Send Employee Invite
        </button>
        {showInvite && (
          <AdminInvite close={() => setShowInvite(false)} />
        )}

        <button className="emp-list-btn" onClick={() => navigate("/admin-employees")}>
          <FaUsers /> Employees List
        </button>
      </div>

      <div className="admin-dashboard-content">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Employees</h3>
            <p>2</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Invites</h3>
            <p>2</p>
          </div>

          <div className="dashboard-card">
            <h3>Active Users</h3>
            <p>2</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;