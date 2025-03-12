import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAdmin) {
        navigate("/"); // Redirect non-admin users
        return null;
    }

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Only Admins can see this page.</p>
            {/* Add admin-specific details here */}
        </div>
    );
};

export default AdminDashboard;
