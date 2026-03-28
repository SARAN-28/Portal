import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/dialog.css";
import { useNavigate } from "react-router-dom";

const Login = ({ close, openSignup, openOtp, openForgot }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            setLoading(true)

            const res = await api.post("/login", formData);

            if (res.data.role === "employee") {

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                toast.success("Login successful");

                close();
                navigate("/employee-dashboard")
            }

            if (res.data.role === "admin") {
                toast.success("OTP sent to your email");

                close();
                openOtp(formData.email);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Server error"
            );
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">

                <form onSubmit={handleSubmit}>
                    <h3>Login Form</h3>

                    <span className="close-btn" onClick={close}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>

                    <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={loading} />

                    <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} disabled={loading}/>

                    <p className="forgot-link" onClick={() => {
                        close();
                        openForgot();
                    }}
                    >
                        Forgot Password?
                    </p>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="login-signup-text">
                        Don't have an account?
                        <span className="login-signup-link" onClick={() => {
                            close();
                            openSignup();
                        }}
                        >
                            Signup
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;