import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEmployeesList = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/admin/all-employees");
            setEmployees(res.data.employees);
        } catch {
            toast.error("Error in fetching employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h2>All Employees</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>EMPLOYEE ID</th>
                        <th>DEPARTMENT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.EmployeeProfile?.employee_id || "-"}</td>
                            <td>{emp.EmployeeProfile?.department || "-"}</td>
                            <td> <button onClick={() => navigate(`/admin/update-employee/${emp.id}`)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEmployeesList;