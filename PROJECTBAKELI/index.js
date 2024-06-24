const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Import user, login, and hotel routes
const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const hotelRoutes = require('./routes/hotel.route'); // Use the newly created hotel.route

// Use the defined routes
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes); // Use /api/auth for handling authentication
app.use('/api/hotels', hotelRoutes); // Use /api/hotels for hotel routes
app.use('/uploads', express.static(path.join(__dirname, "", 'uploads')));

// MongoDB connection and server start
const dbURL = "mongodb+srv://oumarsoumare1705:IXFYDxMqhdxZmv4M@backenddb.b7hxwqp.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB";

mongoose.connect(dbURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database!");
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.error("Failed to connect to database!", error);
    });
