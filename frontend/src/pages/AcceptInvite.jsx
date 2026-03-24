import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AcceptInvite = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = params.get("token");

    if (!token) {
        return <h2>Invalid Invite Link</h2>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error("Password must contain uppercase, lowercase, number and be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);

            await api.post("/accept-invite", {
                token,
                password
            });

            toast.success("Account created successfully");
            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={() => navigate("/")}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0505" }}></i>
                </span>

                <h3>Set Password</h3>

                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}/>

                    <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AcceptInvite;