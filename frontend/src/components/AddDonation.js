import { useState } from "react";
import { addDonation } from "../services/api"; // API function to add donation
import CertificateGenerator from "./CertificateGenerator";

const AddDonation = () => {
    const [donationData, setDonationData] = useState({
        donorName: "",
        bloodType: "",
        unitsDonated: "",
        donationDate: new Date().toISOString().split("T")[0],
    });

    const [donationSuccess, setDonationSuccess] = useState(false);

    const handleChange = (e) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addDonation(donationData);
            setDonationData(response.donation); // Update state with response data
            setDonationSuccess(true); // Show certificate download option
        } catch (error) {
            console.error("Error adding donation:", error);
        }
    };

    return (
        <div>
            {!donationSuccess ? (
                <form onSubmit={handleSubmit}>
                    <label>Blood Type:</label>
                    <input type="text" name="bloodType" value={donationData.bloodType} onChange={handleChange} required />

                    <label>Units Donated:</label>
                    <input type="number" name="unitsDonated" value={donationData.unitsDonated} onChange={handleChange} required />

                    <button type="submit">Submit Donation</button>
                </form>
            ) : (
                <CertificateGenerator
                    donorName={donationData.donorName}
                    bloodType={donationData.bloodType}
                    unitsDonated={donationData.unitsDonated}
                    donationDate={donationData.donationDate}
                />
            )}
        </div>
    );
};

export default AddDonation;
