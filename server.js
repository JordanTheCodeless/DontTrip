const express = require('express')
const app = express();
const path = require('path');
const viewHandler = require("./src/viewsMiddleware");

// Setting up a static for everything public
app.use(express.static(path.join(__dirname, 'public')));
// Test
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.get("/", (req,res) => {
    res.render("index");
});
// This is my viewHandler method imported
app.get("/:page", viewHandler);

// Allowing app to run on this server




app.listen(3000,() =>{
    console.log("Server is running at http://localhost:3000");
})
