// app.js (or server.js)
const express = require('express');
const app = express();
const path = require('path');
const staticRoutes = require('./routes/staticRoutes');
const tripRoutes = require('./routes/tripRoutes'); // Import the trip routes
// Using express.json instead of bodyparser
app.use(express.json());
// Static file handling
app.use(express.static(path.join(__dirname, 'public')));
// This is for parsing data from forms
app.use(express.urlencoded({ extended: true }));
// Set view engine and views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Home page route
app.get("/", (req, res) => {
    res.render("index");
});
// Use the tripRoutes file for routes related to trips
// Allowing app to run on this server
app.get('/:page', staticRoutes);
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
