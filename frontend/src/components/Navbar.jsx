import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import VerifyOtp from "../pages/Verifyotp";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyResetOtp from "../pages/VerifyResetOtp";
import ResetPassword from "../pages/ResetPassword";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const openForgot = () => setShowForgot(true);

  const openVerify = (email) => {
    setResetEmail(email);
    setShowForgot(false);
    setShowVerify(true);
  };

  const openReset = (email) => {
    setResetEmail(email);
    setShowVerify(false);
    setShowReset(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>PORTAL</h2>
        </div>

        <div className="nav-buttons">
          {isLoggedIn ? (
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="nav-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button className="nav-btn" onClick={() => setShowSignup(true)}>Signup</button>
            </>
          )}
        </div>
      </nav>

      {showSignup && (
        <Signup
          close={() => setShowSignup(false)}
          openLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {showLogin && (
        <Login
          close={() => setShowLogin(false)}
          openSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          openOtp={(email) => {
            setShowLogin(false);
            setAdminEmail(email);
            setShowOtp(true);
          }}
          openForgot={() => {
            setShowLogin(false);
            openForgot();
          }}
        />
      )}

      {showOtp && (
        <VerifyOtp
          email={adminEmail}
          close={() => setShowOtp(false)}
        />
      )}

      {showForgot && (
        <ForgotPassword
          close={() => setShowForgot(false)}
          openVerify={openVerify}
        />
      )}

      {showVerify && (
        <VerifyResetOtp
          email={resetEmail}
          close={() => setShowVerify(false)}
          openReset={openReset}
        />
      )}

      {showReset && (
        <ResetPassword
          email={resetEmail}
          close={() => setShowReset(false)}
          openLogin={() => setShowLogin(true)}
        />
      )}
    </>
  );
};

export default Navbar;