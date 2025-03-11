import { useEffect, useState } from "react";
import { getUserProfile } from "../services/api";
import "./UserProfile.css"; // Import the CSS file

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile(token);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
        };
        fetchProfile();
    }, [token]);

    return (
        <div className="profile-container">
            <h2 className="profile-title">User Profile</h2>
            {user ? (
                <div className="profile-card">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Blood Type:</strong> {user.bloodType}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                </div>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
