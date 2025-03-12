import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Function to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Create an Axios instance with default headers
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to attach token automatically
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Authentication APIs
export const register = async (userData) => api.post("/auth/register", userData);
export const login = async (userData) => api.post("/auth/login", userData);

// User APIs
export const getUserProfile = async () => api.get("/users/profile");

// Donor APIs
export const getDonors = async () => api.get("/donors");
export const getDonorById = async (id) => api.get(`/donors/${id}`);
export const updateDonorProfile = async (donorData) => api.put("/donors/profile", donorData);

// Blood Request APIs
export const createRequest = async (requestData) => api.post("/requests", requestData);
export const getRequests = async () => api.get("/requests");
export const updateRequest = async (id, requestData) => api.put(`/requests/${id}`, requestData);
export const deleteRequest = async (id) => api.delete(`/requests/${id}`);

// Notifications APIs
export const sendNotificationEmail = async (emailData) => api.post("/notifications/email", emailData);
export const notifyDonors = async (notificationData) => api.post("/notifications/notify-donors", notificationData);

// Fetch logged-in donor's donation history (Donor only)
export const getDonationHistory = async () => api.get("/users/donation-history");

// Fetch all donations (Admin only)
export const getAllDonations = async () => api.get("/users/all-donations");

// Add a new donation (Donor only)
export const addDonation = async (donationData) => {
    const response = await api.post("/users/donate", donationData);
    
    // Ensure response includes necessary certificate details
    return response.data; // This will include donorName, bloodType, unitsDonated, and date
};
