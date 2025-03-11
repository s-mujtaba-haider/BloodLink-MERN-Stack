import { useEffect, useState } from "react";
import { getRequests, deleteRequest } from "../services/api";
import "./BloodRequestList.css"; // Import CSS

const BloodRequestList = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await getRequests(token);
                setRequests(res.data);
            } catch (error) {
                console.error("Error fetching requests", error);
            }
        };
        fetchRequests();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await deleteRequest(id, token);
            setRequests(requests.filter((req) => req.id !== id));
        } catch (error) {
            console.error("Error deleting request", error);
        }
    };

    return (
        <div className="blood-request-container">
            <h2 className="blood-request-title">Blood Requests</h2>
            <ul className="blood-request-list">
                {requests.map((req) => (
                    <li key={req.id} className="blood-request-item">
                        <span className="blood-request-text">
                            {req.bloodType} needed at {req.location}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BloodRequestList;
