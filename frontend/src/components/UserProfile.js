import { useEffect, useState } from "react";
import { getUserProfile, getDonationHistory, getAllDonations, addDonation } from "../services/api";
import CertificateGenerator from "./CertificateGenerator"; // Import the certificate component
import "./UserProfile.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [newDonation, setNewDonation] = useState({ recipientName: "", hospital: "", unitsDonated: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                setUser(res.data);

                if (res.data.role === "admin") {
                    const allDonationsRes = await getAllDonations();
                    console.log("Admin Donations:", allDonationsRes.data); // Debugging
                    setDonations(allDonationsRes.data.donations || []);
                } else {
                    const userDonationsRes = await getDonationHistory();
                    console.log("Fetched User Donation History:", userDonationsRes.data); // Debugging
                    setDonations(userDonationsRes.data.donations || []);
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addDonation(newDonation);
            console.log("Donation Response:", res.data); // Debugging log
    
            if (res.data && res.data.donation) {
                setDonations((prevDonations) => [...prevDonations, res.data.donation]);
                setNewDonation({ recipientName: "", hospital: "", unitsDonated: "" }); // Reset form
            } else {
                console.error("Unexpected API response:", res.data);
            }
        } catch (error) {
            console.error("Error adding donation:", error);
        }
    };
    

    return (
        <div className="profile-container">
            <h2 className="profile-title" style={{ fontWeight: "bold" }}>PROFILE</h2>

            {user ? (
                <div className="profile-grid">
                    <div className="profile-box">
                        <h3>User Profile</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Blood Type:</strong> {user.bloodType}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <br /><br />
                        {user.role === "donor" && (
                            <>
                                <h3>Add New Donation</h3>
                                <form onSubmit={handleDonationSubmit} className="donation-form">
                                    <input
                                        type="text"
                                        placeholder="Recipient Name"
                                        value={newDonation.recipientName}
                                        onChange={(e) => setNewDonation({ ...newDonation, recipientName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Hospital Name"
                                        value={newDonation.hospital}
                                        onChange={(e) => setNewDonation({ ...newDonation, hospital: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Units Donated"
                                        value={newDonation.unitsDonated}
                                        onChange={(e) => setNewDonation({ ...newDonation, unitsDonated: e.target.value })}
                                        required
                                    />
                                    <button type="submit" className="submit-button">Add Donation</button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="profile-box">
                        <h3>Donation History</h3>
                        {donations.length > 0 ? (
                            <div className="donation-history">
                                {donations.map((donation, index) => (
                                    <div key={index} className="donation-item">
                                        <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
                                        <p><strong>Recipient:</strong> {donation.recipientName}</p>
                                        <p><strong>Hospital:</strong> {donation.hospital}</p>
                                        <p><strong>Units Donated:</strong> {donation.unitsDonated || "N/A"}</p>
                                        <CertificateGenerator 
                                            donorName={user.name} 
                                            donationDate={new Date(donation.date).toLocaleDateString()} 
                                            bloodType={user.bloodType} 
                                            unitsDonated={donation.unitsDonated || "N/A"} 
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No donations recorded yet.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;