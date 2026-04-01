import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/employeeDashboard.css"

const EmployeeDashboard = () => {

  const [profileComplete, setProfileComplete] = useState(true);
  const [attendance, setAttendance] = useState([])
  const [todayRecord, setTodayRecord] = useState(null)
  const [loading, setLoading] = useState(false)

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
    checkProfile();
    fetchAttendance();
  }, []);

  const checkProfile = async () => {
    try {
      const res = await api.get("/employee/profile")

      if (!res.data.profile || !res.data.profile.is_profile_complete) {
        setProfileComplete(false)
      } else {
        setProfileComplete(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/my-attendance");

      setAttendance(res.data.attendance);

      const today = new Date().toISOString().split("T")[0];

      const todayRecords = res.data.attendance.filter(
        (a) => a.date === today
      )

      const lastRecord = todayRecords[todayRecords.length - 1]

      setTodayRecord(lastRecord || null)

    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendance = async () => {
    setLoading(true)
    try {
      if (!todayRecord || todayRecord.clock_out) {
        await api.post("/attendance/clock-in")
      } else if (!todayRecord.clock_out) {
        await api.post("/attendance/clock-out")
      }
      await fetchAttendance()
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <>
      {!profileComplete && (
        <div className="emp-profile-warning">
          Please complete your profile

          <button onClick={() => navigate("/employee-profile")}>
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
        </div>

        <div className="employee-clock-in-out-btn">
          <button onClick={handleAttendance} disabled={loading}>
            {!todayRecord || todayRecord.clock_out ? "Clock In" : "Clock Out"}
          </button>
        </div>

      <div>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock-In</th>
                <th>Clock-Out</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.clock_in ? new Date(item.clock_in).toLocaleTimeString() : "-"}</td>
                  <td>{item.clock_out ? new Date(item.clock_out).toLocaleTimeString() : "-"}</td>
                  <td>{item.total_hours || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      </div>
    </>
  );
};

export default EmployeeDashboard;