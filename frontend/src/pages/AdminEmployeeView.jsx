import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import "../styles/employeeDashboard.css";

const AdminEmployeeView = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

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
        if (!isAdminField(name)) return true;
        return false;
    };

    const fetchEmployee = async () => {
        try {
            const res = await api.get("/admin/all-employees");

            const emp = res.data.employees.find(e => e.id == id);

            if (!emp) {
                toast.error("Employee not found");
                return;
            }

            setProfile({
                ...(emp.EmployeeProfile || {}),
                name: emp.name,
                email: emp.email
            });

        } catch {
            toast.error("Error fetching employee");
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await api.put(`/admin/update-employee/${id}`, profile);
            toast.success("Profile updated");
            setEditMode(false);
            fetchEmployee();
        } catch {
            toast.error("Error updating profile");
        }
    };

    const getInputClass = (name) => {
        if (isAdminField(name)) {
            return "input-employee";
        }
        return "input-admin";
    };

    return (
        <div className="employee-profile-container">

            <div className="employee-profile-head">
                <h2>Employee Details</h2>

                <button className="employee-profile-back-btn" onClick={() => navigate("/admin-employees")}>
                    Back to Employees List
                </button>
            </div>

            <div className="employee-profile-section">

                <div className="employee-profile-basic">
                    <h3><span style={{ color: "red" }}>Basic Information</span></h3>

                    <label>First Name</label>
                    <input name="first_name" value={profile.first_name || ""} onChange={handleChange} disabled={isDisabled("first_name")} className={getInputClass("first_name")} />

                    <label>Last Name</label>
                    <input name="last_name" value={profile.last_name || ""} onChange={handleChange} disabled={isDisabled("last_name")} className={getInputClass("last_name")} />

                    <label>Secondary Email</label>
                    <input name="secondary_email" value={profile.secondary_email || ""} onChange={handleChange} disabled={isDisabled("secondary_email")} className={getInputClass("secondary_email")} />
                </div>

                <div className="employee-profile-work">
                    <h3><span style={{ color: "green" }}>Work Information</span></h3>

                    <label>Department</label>
                    <input name="department" value={profile.department || ""} onChange={handleChange} disabled={isDisabled("department")} className={getInputClass("department")} />

                    <label>Designation</label>
                    <input name="designation" value={profile.designation || ""} onChange={handleChange} disabled={isDisabled("designation")} className={getInputClass("designation")} />

                    <label>Location</label>
                    <input name="location" value={profile.location || ""} onChange={handleChange} disabled={isDisabled("location")} className={getInputClass("location")} />

                    <label>Date of Join</label>
                    <input name="date_of_join" value={profile.date_of_join || ""} onChange={handleChange} disabled={isDisabled("date_of_join")} className={getInputClass("date_of_join")} />

                    <label>Current Experience</label>
                    <input name="current_experience" value={profile.current_experience || ""} onChange={handleChange} disabled={isDisabled("current_experience")} className={getInputClass("current_experience")} />

                    <label>Total Experience</label>
                    <input name="total_experience" value={profile.total_experience || ""} onChange={handleChange} disabled={isDisabled("total_experience")} className={getInputClass("total_experience")} />

                    <label>Employee Status</label>
                    <input name="employee_status" value={profile.employee_status || ""} onChange={handleChange} disabled={isDisabled("employee_status")} className={getInputClass("employee_status")} />
                </div>

                <div className="employee-profile-hierarchy">
                    <h3><span style={{ color: "green" }}>Hierarchy Information</span></h3>

                    <label>Reporting Manager</label>
                    <input name="reporting_manager" value={profile.reporting_manager || ""} onChange={handleChange} disabled={isDisabled("reporting_manager")} className={getInputClass("reporting_manager")} />
                </div>

                <div className="employee-profile-personal">
                    <h3><span style={{ color: "red" }}>Personal Information</span></h3>

                    <label>Age</label>
                    <input name="age" value={profile.age || ""} onChange={handleChange} disabled={isDisabled("age")} className={getInputClass("age")} />

                    <label>Blood Group</label>
                    <input name="blood_group" value={profile.blood_group || ""} onChange={handleChange} disabled={isDisabled("blood_group")} className={getInputClass("blood_group")} />

                    <label>Address</label>
                    <input name="address" value={profile.address || ""} onChange={handleChange} disabled={isDisabled("address")} className={getInputClass("address")} />

                    <label>Gender</label>
                    <input name="gender" value={profile.gender || ""} onChange={handleChange} disabled={isDisabled("gender")} className={getInputClass("gender")} />

                    <label>About</label>
                    <input name="about" value={profile.about || ""} onChange={handleChange} disabled={isDisabled("about")} className={getInputClass("about")} />
                </div>

                <div className="employee-profile-identity">
                    <h3><span style={{ color: "red" }}>Identity</span></h3>

                    <label>PAN</label>
                    <input name="pan" value={profile.pan || ""} onChange={handleChange} disabled={isDisabled("pan")} className={getInputClass("pan")} />

                    <label>Aadhar</label>
                    <input name="aadhar" value={profile.aadhar || ""} onChange={handleChange} disabled={isDisabled("aadhar")} className={getInputClass("aadhar")} />
                </div>

                <div className="employee-profile-contact">
                    <h3><span style={{ color: "red" }}>Contact</span></h3>

                    <label>Phone</label>
                    <input name="phone" value={profile.phone || ""} onChange={handleChange} disabled={isDisabled("phone")} className={getInputClass("phone")} />

                    <label>Work Address</label>
                    <input name="work_address" value={profile.work_address || ""} onChange={handleChange} disabled={isDisabled("work_address")} className={getInputClass("work_address")} />

                    <label>Permanent Address</label>
                    <input name="permanent_address" value={profile.permanent_address || ""} onChange={handleChange} disabled={isDisabled("permanent_address")} className={getInputClass("permanent_address")} />
                </div>

                <div className="employee-profile-education">
                    <h3><span style={{ color: "red" }}>Education</span></h3>

                    <label>Institution</label>
                    <input name="institution" value={profile.institution || ""} onChange={handleChange} disabled={isDisabled("institution")} className={getInputClass("institution")} />

                    <label>Specialization</label>
                    <input name="specialization" value={profile.specialization || ""} onChange={handleChange} disabled={isDisabled("specialization")} className={getInputClass("specialization")} />

                    <label>Completion Date</label>
                    <input name="completion_date" value={profile.completion_date || ""} onChange={handleChange} disabled={isDisabled("completion_date")} className={getInputClass("completion_date")} />
                </div>

            </div>

            <div className="emp-profile-btn">
                {!editMode ? (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                ) : (
                    <button onClick={handleSave}>Save</button>
                )}
            </div>
        </div>
    );
};

export default AdminEmployeeView;