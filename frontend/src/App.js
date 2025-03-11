import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import DonorList from "./components/DonorList";
import BloodRequestForm from "./components/BloodRequestForm";
import BloodRequestList from "./components/BloodRequestList";
import Notification from "./components/Notification";
import Dashboard from "./components/Dashboard";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";

function App() {
    return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="/donors" element={<ProtectedRoute><DonorList /></ProtectedRoute>} />
                    <Route path="/blood-request" element={<ProtectedRoute><BloodRequestForm /></ProtectedRoute>} />
                    <Route path="/requests" element={<ProtectedRoute><BloodRequestList /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
                    <Route path="/aboutus" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
                </Routes>
            </Router>
    );
}

export default App;
