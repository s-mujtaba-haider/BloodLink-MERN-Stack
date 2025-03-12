import { useEffect, useState } from "react";
import { getUserProfile, getDonors, getRequests } from "../services/api";
import { Link } from "react-router-dom";
import { FaTint, FaUser, FaBell, FaHeartbeat, FaPlusCircle } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [donors, setDonors] = useState([]);
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userRes = await getUserProfile(token);
                setUser(userRes.data);

                const donorsRes = await getDonors(token);
                setDonors(donorsRes.data.slice(0, 5));

                if (userRes.data.role === "admin") {
                    const requestsRes = await getRequests(token);
                    setRequests(requestsRes.data.slice(0, 5));
                }
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };

        fetchDashboardData();
    }, [token]);

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h1 style={{color: "white"}}>Dashboard</h1>
                {user && <h2 style={{color: "white"}}>Welcome, {user.name}!</h2>}
            </div>

            {/* Statistics Section */}
            <div className="stats-container">
                <div className="stat-box">
                    <FaTint className="stat-icon red" />
                    <h3>{donors.length}</h3>
                    <p>Recent Donors</p>
                </div>
                {user?.role === "admin" && (
                    <div className="stat-box">
                        <FaHeartbeat className="stat-icon blue" />
                        <h3>{requests.length}</h3>
                        <p>Recent Requests</p>
                    </div>
                )}
                <div className="stat-box">
                    <FaUser className="stat-icon green" />
                    <h3>{user?.role || "User"}</h3>
                    <p>Your Role</p>
                </div>
            </div>

            {/* Profile Section */}
            {user && (
                <div className="profile-card">
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Blood Type:</strong> {user.bloodType}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                </div>
            )}

            {/* Recent Donors */}
            <div className="section">
                <h2>Recent Donors</h2>
                <ul className="list">
                    {donors.length > 0 ? (
                        donors.map((donor) => (
                            <li key={donor.id}>
                                {donor.name} - {donor.bloodType} ({donor.location})
                            </li>
                        ))
                    ) : (
                        <p>No donors available</p>
                    )}
                </ul>
                <Link to="/donors" className="view-all">View All Donors</Link>
            </div>

            {/* Recent Blood Requests - Only for Admins */}
            {user?.role === "admin" && (
                <div className="section">
                    <h2>Recent Blood Requests</h2>
                    <ul className="list">
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <li key={req.id}>
                                    {req.bloodType} needed at {req.location} - {req.urgency}
                                </li>
                            ))
                        ) : (
                            <p>No active blood requests</p>
                        )}
                    </ul>
                    <Link to="/requests" className="view-all">View All Requests</Link>
                </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
                <Link to="/blood-request">
                    <button className="action-btn"><FaPlusCircle /> Request Blood</button>
                </Link>
                {user?.role === "admin" && (
                    <Link to="/notifications">
                        <button className="action-btn"><FaBell /> Send Notification</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
