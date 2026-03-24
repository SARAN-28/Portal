import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import ("../styles/employeeDashboard.css")

const EmployeeDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const fetchEmployee = async () => {

      try {
        await api.get("/employee/employee-dashboard");
      } catch (error) {

        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchEmployee();
  }, []);

  return (
    <div className="employee-dashboard-container">
      <div className="employee-dashboard-sidebar">
        <h3>Dashboard</h3>

        <button onClick={() => navigate("/employee-profile")}>
          Profile
        </button>
      </div>

      <div className="employee-dashboard-content">
        <h1>Employee Dashboard</h1>
        <h3>Welcome Employee</h3>
      </div>

    </div>
  );
};

export default EmployeeDashboard;