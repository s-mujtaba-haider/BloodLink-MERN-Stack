const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const colors = require('colors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js'); 
const userRoutes = require('./routes/userRoutes.js'); 
const donorRoutes = require('./routes/donorRoutes.js'); 
const requestRoutes = require('./routes/requestRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');

dotenv.config();
connectDB();


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/`.yellow.bold));

module.exports = app;