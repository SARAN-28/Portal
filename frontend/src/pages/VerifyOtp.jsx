import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/dialog.css";
import { useNavigate } from "react-router-dom";

const VerifyOtp = ({ email, close }) => {

    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits");
            return;
        }

        try {
            const res = await api.post("/verify-otp", {
                email,
                otp
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            toast.success("OTP verified successfully");

            close();
            navigate("/admin-dashboard");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Server error"
            );
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <form onSubmit={handleSubmit}>
                    <h3>Verify OTP</h3>

                    <span className="close-btn" onClick={close}>
                        <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0505" }}></i>
                    </span>

                    <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

                    <button type="submit">
                        Verify OTP
                    </button>
                </form>

            </div>
        </div>
    );
};

export default VerifyOtp;