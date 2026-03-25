import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/employeeDashboard.css"

const EmployeeDashboard = () => {

  const [profileComplete, setProfileComplete] = useState(true);

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
    checkProfile()
  }, []);

  const checkProfile = async ()=>{
    try{
      const res = await api.get("/employee/profile")

      if(!res.data.profile || !res.data.profile.is_profile_complete){
        setProfileComplete(false)
      }else{
        setProfileComplete(true)
      }
    }catch (error){
      console.log(error);
    }
  }

  return (
    <>
    {!profileComplete &&(
      <div className="emp-profile-warning">
      Please complete your profile

      <button onClick={()=>navigate("/employee-profile")}>
      Complete profile now
      </button>
      
      </div>
    )}
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
    </>
  );
};

export default EmployeeDashboard;