import { useState } from "react";
import { createRequest } from "../services/api";
import "./BloodRequestForm.css"; // Import the CSS file

const BloodRequestForm = () => {
    const [formData, setFormData] = useState({
        bloodType: "",
        unitsRequired: "",
        hospital: "",
        location: "",
        contactNumber: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRequest(formData);
            setMessage("Blood request submitted successfully!");
            setFormData({
                bloodType: "",
                unitsRequired: "",
                hospital: "",
                location: "",
                contactNumber: ""
            });
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Request Blood</h2>
            <form className="blood-form" onSubmit={handleSubmit}>
                <label>Blood Type:</label>
                <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>

                <label>Units Required:</label>
                <input type="number" name="unitsRequired" value={formData.unitsRequired} onChange={handleChange} required />

                <label>Hospital:</label>
                <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                <label>Contact Number:</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

                <button className="submit-btn" type="submit">Submit Request</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default BloodRequestForm;
