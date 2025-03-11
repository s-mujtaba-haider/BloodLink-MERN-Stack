import { useState } from "react";
import { sendNotificationEmail } from "../services/api";
import "./Notification.css"; // Import the CSS file

const Notification = () => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const [response, setResponse] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNotificationEmail(emailData, token);
            setResponse("Notification sent successfully!");
            setEmailData({ email: "", subject: "", message: "" }); // Clear form
        } catch (error) {
            console.error("Error sending notification:", error.response?.data || error.message);
            setResponse("Error sending notification.");
        }
    };

    return (
        <div className="notification-container">
            <h2 className="notification-title">Send Notification</h2>
            <form onSubmit={handleSubmit} className="notification-form">
                <input 
                    type="email" 
                    placeholder="Recipient Email" 
                    value={emailData.email}
                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                    required 
                    className="input-field"
                />
                <input 
                    type="text" 
                    placeholder="Subject" 
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} 
                    required 
                    className="input-field"
                />
                <textarea 
                    placeholder="Message" 
                    value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })} 
                    required 
                    className="textarea-field"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
            {response && <p className="response-message">{response}</p>}
        </div>
    );
};

export default Notification;
