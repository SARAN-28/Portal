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
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>
      <h3>Welcome Admin</h3>

      <button className="invite-btn" onClick={() => setShowInvite(true)}>
        Send Employee Invite
      </button>

      {showInvite && (
        <AdminInvite close={() => setShowInvite(false)} />
      )}

    </div>
  );
};

export default AdminDashboard;