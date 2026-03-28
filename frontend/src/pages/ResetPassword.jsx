import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/dialog.css";

const ResetPassword = ({ email, close, openLogin }) => {

    const [password, setPassword] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            await api.post("/reset-password", {
                newPassword: password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("resetToken")}`
                }
            });

            toast.success("Password reset successful");

            close();
            openLogin();

        } catch (error) {
            toast.error(error.response?.data?.message || "Reset failed");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark" ></i>
                </span>

                <h3>Reset Password</h3>

                <form onSubmit={handleReset}>
                    <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};
export default ResetPassword;