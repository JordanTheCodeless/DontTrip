const express = require('express')
const app = express();
const path = require('path');
const viewHandler = require("./viewsMiddleware");
// Test
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../views","index.html"));
});
// Setting up a static for everything public
app.use(express.static(path.join(__dirname, "../public")));
// This is my viewHandler method
app.get("/:page", viewHandler);
// Allowing app to run on this server
app.listen(3000,() =>{
    console.log("Server is running at http://localhost:3000");
})