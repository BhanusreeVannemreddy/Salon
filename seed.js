const mongoose = require('mongoose');
require('dotenv').config();
const Salon = require('./server.js').Salon; // Importing the model

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const sampleSalons = [
    { name: "Glamour Cuts", address: "123 Main Street, New York, NY", services: ["Haircuts", "Styling", "Coloring"] },
    { name: "Style Hub", address: "456 Ocean Avenue, Los Angeles, CA", services: ["Men's Grooming", "Styling"] },
    { name: "Royal Touch Salon", address: "789 Maple Drive, Chicago, IL", services: ["Treatments", "Coloring"] }
];

Salon.insertMany(sampleSalons)
    .then(() => {
        console.log("Sample salons added");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
