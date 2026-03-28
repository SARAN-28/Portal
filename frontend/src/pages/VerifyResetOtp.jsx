import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/dialog.css";

const VerifyResetOtp = ({ email, close, openReset }) => {

    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/verify-reset-otp", {
                email,
                otp
            });

            localStorage.setItem("resetToken", res.data.resetToken);
            toast.success("OTP verified");

            close();
            openReset(email);

        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </span>

                <h3>Verify OTP</h3>

                <form onSubmit={handleVerifyOtp}>
                    <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

                    <button type="submit">Verify OTP</button>
                </form>
            </div>
        </div>
    );
};
export default VerifyResetOtp;