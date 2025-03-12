import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, userRole, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header id="header" className="header sticky-top">
            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope d-flex align-items-center">
                            <a href="mailto:contact@example.com">bloodlink-fast@lhr.nu.edu.pk</a>
                        </i>
                        <i className="bi bi-phone d-flex align-items-center ms-4">
                            <span>+92 300 1234567</span>
                        </i>
                    </div>
                    <div className="social-links d-none d-md-flex align-items-center">
                        <a href="https://twitter.com" className="twitter"><i className="bi bi-twitter-x"></i></a>
                        <a href="https://facebook.com" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="https://linkedin.com" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex align-items-center justify-between">
                    <Link to="/" className="logo d-flex align-items-center me-auto">
                        <h1 className="sitename">BloodLink</h1>
                    </Link>
                    
                    {/* Navigation Menu */}
                    <nav id="navmenu" className={`navmenu ${menuOpen ? "open" : ""}`}>
                        <ul>
                            {isAdmin && isLoggedIn ? (
                                <>
                                    <li><Link to="/admin">Admin Dashboard</Link></li>
                                    <li><Link to="/notifications">Notifications</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            ) : isLoggedIn ? (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/notifications">Notifications</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/donors">Donors</Link></li>
                                    <li><Link to="/requests">Requests</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/blood-request" className="request-blood-btn">Request Blood</Link></li>

                                    {/* Only show the button if the user is a recipient */}
                                    {userRole === "recipient" && (
                                        <li>
                                            <Link to="/blood-request" className="request-blood-btn">Request Blood</Link>
                                        </li>
                                    )}

                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* Mobile Menu Toggle Button */}
                    <i 
                        className="mobile-nav-toggle d-xl-none bi bi-list" 
                        onClick={toggleMenu} 
                        style={{ cursor: "pointer" }}
                    ></i>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
