const express = require('express')
const app = express();
const path = require('path');
const viewHandler = require("./viewsMiddleware");
// Setting up a static for everything public

// Test
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../views","index.html"));

});
app.use(express.static(path.join(__dirname, "../public")));
app.get("/:page", viewHandler);

// Allowing app to run on this server
app.listen(3000,() =>{
    console.log("Server is running at http://localhost:3000");
})