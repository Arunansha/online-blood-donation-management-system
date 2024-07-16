const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const app = express();
const mongodbUrl = 'mongodb+srv://arunansha2003:a123456k@cluster0.xrvowrs.mongodb.net/';
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());

// Database Connection
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => {
    console.error('Database connection error:', error);
});

database.once('open', () => {
    console.log('Database connected');
});

// Models
const Donor = require('./donor');
const User = require('./user');

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the MERN stack application');
});

// Register Donor
app.post('/registerDonor', async (req, res) => {
    try {
        const donor = new Donor(req.body);
        const savedDonor = await donor.save();
        res.status(201).json(savedDonor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Register User
app.post('/registerUser', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login Donor
app.post('/loginDonor', async (req, res) => {
    try {
        const donor = await Donor.findOne({ email: req.body.email, password: req.body.password });
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
app.post('/loginUser', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search Donors by Address and Bloodgroup
app.post('/searchDonors', async (req, res) => {
    try {
        const { address, bloodgroup } = req.body;
        const donors = await Donor.find({ address: { $regex: address, $options: 'i' }, bloodgroup });
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Donors
app.get('/getAllDonors', async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Donor by ID
app.get('/getDonorById/:id', async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Donor by ID
app.patch('/updateDonor/:id', async (req, res) => {
    try {
        const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDonor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Donor by ID
app.delete('/deleteDonor/:id', async (req, res) => {
    try {
        const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
        res.json(deletedDonor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Default Route
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
