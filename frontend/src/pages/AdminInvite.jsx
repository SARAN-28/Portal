import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import "../styles/dialog.css";

const AdminInvite = ({ close }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const sendInvite = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !employeeId.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await api.post("/admin/send-invite", {
                name: name.trim(),
                email: email.trim(),
                employee_id: employeeId.trim()
            });

            toast.success("Invitation sent Successfully");

            close();
            navigate("/admin-dashboard");

        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending invitation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </span>

                <h3>Send Employee Invitations</h3>

                <form onSubmit={sendInvite}>
                    <input type="text" placeholder="Employee Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />

                    <input type="email" placeholder="Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />

                    <input type="text" placeholder="Employee Id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required disabled={loading} />

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Invite"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminInvite;