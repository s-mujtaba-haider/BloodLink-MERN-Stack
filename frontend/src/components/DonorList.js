import { useEffect, useState } from "react";
import { getDonors, getUserProfile } from "../services/api";
import "./DonorList.css"; // Import CSS file

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await getUserProfile(token);
                setUserRole(userRes.data.role);

                if (userRes.data.role === "admin" || userRes.data.role === "recipient") {
                    const res = await getDonors(token);
                    console.log("Fetched Donors:", res.data);  // ✅ Debugging Log
                    setDonors(res.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, [token]);

    if (userRole !== "admin" && userRole !== "recipient") {
        return <p className="error-message">Access Denied. Only recipients and admins can view this.</p>;
    }

    return (
        <div className="donor-list-container">
            <h2 className="title">Donor List</h2>
            {donors.length > 0 ? (
                <ul className="donor-list">
                    {donors.map((donor) => (
                        <li key={donor.id} className="donor-card">
                            <strong>{donor.name}</strong>
                            <p>Blood Type: <span>{donor.bloodType}</span></p>
                            <p>Location: <span>{donor.location}</span></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-donors">No donors available</p>
            )}
        </div>
    );
};

export default DonorList;
