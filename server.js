require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Salon Schema
const salonSchema = new mongoose.Schema({
    name: String,
    address: String,
    services: [String]
});
const Salon = mongoose.model('Salon', salonSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    salon: String,
    service: String,
    date: String
});
const Booking = mongoose.model('Booking', bookingSchema);

// Get all salons
app.get('/salons', async (req, res) => {
    try {
        const salons = await Salon.find();
        res.json(salons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salons" });
    }
});

// Book an appointment
app.post('/book', async (req, res) => {
    const { name, salon, service, date } = req.body;
    
    if (!name || !salon || !service || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newBooking = new Booking({ name, salon, service, date });
        await newBooking.save();
        res.json({ message: "Booking successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment" });
    }
});

// Get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
