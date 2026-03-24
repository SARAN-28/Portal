import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import("../styles/employeeDashboard.css")

const EmployeeProfile = () => {

    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate()
    const role = localStorage.getItem("role");

    const fetchProfile = async () => {
        try {
            const res = await api.get("/employee/profile");
            setProfile(res.data.profile || {});
        } catch {
            toast.error("Error fetching profile");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await api.post("/employee/profile", profile);
            toast.success("Profile updated");
            setEditMode(false);
            fetchProfile();
        } catch {
            toast.error("Error in saving profile");
        }
    };

    const isAdminField = (name) => {
        const adminFields = [
            "department",
            "designation",
            "location",
            "date_of_join",
            "current_experience",
            "total_experience",
            "employee_status",
            "reporting_manager"
        ];
        return adminFields.includes(name);
    };

    const isDisabled = (name) => {
        if (!editMode) return true;
        if (role === "employee" && isAdminField(name)) return true;
        return false;
    };

    return (
        <div className="employee-profile-container">

            <h2>Employee Profile</h2>

            <button className="emp-profile-back-btn" onClick={() => navigate("/employee-dashboard")}>
                Back to Dashboard
            </button>

            <div className="emp-profile-section">

                <div className="emp-profile-basic">
                    <h3>Basic Information</h3>

                    <label>First Name</label>
                    <input name="first_name" value={profile.first_name || ""} onChange={handleChange} disabled={isDisabled("first_name")} />

                    <label>Last Name</label>
                    <input name="last_name" value={profile.last_name || ""} onChange={handleChange} disabled={isDisabled("last_name")} />

                    <label>Secondary Email</label>
                    <input name="secondary_email" value={profile.secondary_email || ""} onChange={handleChange} disabled={isDisabled("secondary_email")} />
                </div>

                <div className="emp-profile-work">
                    <h3>Work Information (Admin Only)</h3>

                    <label>Department</label>
                    <input name="department" value={profile.department || ""} onChange={handleChange} disabled={isDisabled("department")} />

                    <label>Designation</label>
                    <input name="designation" value={profile.designation || ""} onChange={handleChange} disabled={isDisabled("designation")} />

                    <label>Location</label>
                    <input name="location" value={profile.location || ""} onChange={handleChange} disabled={isDisabled("location")} />

                    <label>Date of Join</label>
                    <input name="date_of_join" value={profile.date_of_join || ""} onChange={handleChange} disabled={isDisabled("date_of_join")} />

                    <label>Current Experience</label>
                    <input name="current_experience" value={profile.current_experience || ""} onChange={handleChange} disabled={isDisabled("current_experience")} />

                    <label>Total Experience</label>
                    <input name="total_experience" value={profile.total_experience || ""} onChange={handleChange} disabled={isDisabled("total_experience")} />

                    <label>Employee Status</label>
                    <input name="employee_status" value={profile.employee_status || ""} onChange={handleChange} disabled={isDisabled("employee_status")} />
                </div>

                <div className="emp-profile-hierarchy">
                    <h3>Hierarchy Information (Admin Only)</h3>

                    <label>Reporting Manager</label>
                    <input name="reporting_manager" value={profile.reporting_manager || ""} onChange={handleChange} disabled={isDisabled("reporting_manager")} />
                </div>

                <div className="emp-profile-personal">
                    <h3>Personal Information</h3>

                    <label>Age</label>
                    <input name="age" value={profile.age || ""} onChange={handleChange} disabled={isDisabled("age")} />

                    <label>Blood Group</label>
                    <input name="blood_group" value={profile.blood_group || ""} onChange={handleChange} disabled={isDisabled("blood_group")} />

                    <label>Address</label>
                    <input name="address" value={profile.address || ""} onChange={handleChange} disabled={isDisabled("address")} />

                    <label>Gender</label>
                    <input name="gender" value={profile.gender || ""} onChange={handleChange} disabled={isDisabled("gender")} />

                    <label>About Me</label>
                    <input name="about" value={profile.about || ""} onChange={handleChange} disabled={isDisabled("about")} />
                </div>

                <div className="emp-profile-identity">
                    <h3>Identity Information</h3>

                    <label>PAN Card</label>
                    <input name="pan" value={profile.pan || ""} onChange={handleChange} disabled={isDisabled("pan")} />

                    <label>Aadhar Card</label>
                    <input name="aadhar" value={profile.aadhar || ""} onChange={handleChange} disabled={isDisabled("aadhar")} />
                </div>

                <div className="emp-profile-contact">
                    <h3>Contact Information</h3>

                    <label>Phone</label>
                    <input name="phone" value={profile.phone || ""} onChange={handleChange} disabled={isDisabled("phone")} />

                    <label>Work Address</label>
                    <input name="work_address" value={profile.work_address || ""} onChange={handleChange} disabled={isDisabled("work_address")} />

                    <label>Permanent Address</label>
                    <input name="permanent_address" value={profile.permanent_address || ""} onChange={handleChange} disabled={isDisabled("permanent_address")} />
                </div>

                <div className="emp-profile-education">
                    <h3>Education Information</h3>

                    <label>Institution</label>
                    <input name="institution" value={profile.institution || ""} onChange={handleChange} disabled={isDisabled("institution")} />

                    <label>Specialization</label>
                    <input name="specialization" value={profile.specialization || ""} onChange={handleChange} disabled={isDisabled("specialization")} />

                    <label>Completion Date</label>
                    <input name="completion_date" value={profile.completion_date || ""} onChange={handleChange} disabled={isDisabled("completion_date")} />
                </div>

            </div>

            <div className="emp-profile-btn">
                {!editMode ? (<button onClick={() => setEditMode(true)}>Edit</button>) :
                    (<button onClick={handleSave}>Save</button>)}
            </div>
        </div>
    );
};
export default EmployeeProfile;
