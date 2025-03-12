import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(userData);
            localStorage.setItem("token", res.data.token);
            setMessage("Login successful!");
            navigate("/");
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
                {message && <p className="message" style={{color : "red"}}>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
