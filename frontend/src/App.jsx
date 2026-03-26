import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminInvite from "./pages/AdminInvite";
import AcceptInvite from "./pages/AcceptInvite";
import ProtectedRoute from "./routes/ProtectedRoute";
import EmployeeProfile from "./pages/EmployeeProfile";
import AdminEmployeesList from "./pages/AdminEmployeesList";
import AdminEmployeeView from "./pages/AdminEmployeeView";

function App() {
    return (

        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

                <Route path="/employee-dashboard" element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>} />

                <Route path="/admin-invite" element={<ProtectedRoute role="admin"><AdminInvite /></ProtectedRoute>} />

                <Route path="/accept-invite" element={<AcceptInvite />} />

                <Route path="/employee-profile" element={<ProtectedRoute role="employee"><EmployeeProfile /></ProtectedRoute>} />

                <Route path="/admin-employees" element={<ProtectedRoute role="admin"><AdminEmployeesList /></ProtectedRoute>} />
                
                <Route path="/admin/update-employee/:id" element={<ProtectedRoute role="admin"><AdminEmployeeView /></ProtectedRoute>} />
            </Routes>

            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
        </BrowserRouter>

    );
}

export default App;