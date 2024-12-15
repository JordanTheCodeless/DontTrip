const express = require('express')
const router = express.Router(); // This will be my export router for all things trips
const fs = require('fs');
const fetchData = require('../modules/dataCache');
// Creating local JSON path
let tripsLocal = 'trips.json';
// Empty array to push data upon
let trips = []
router.get('/trip', (req, res) => {
    // try catch statement to read from file if exists if not still render trips as empty and give error message
    // https://dev.to/tejesh/nodejs-read-json-file-using-require-vs-fs-module-4f94
    try{
        trips = JSON.parse(fs.readFileSync(tripsLocal, 'utf8'));
        console.log("File read succesfully");
        res.render('trip', {trips})
    }catch(e){
        if(e){
            console.error("File unreadable perhaps refresh the page ");
            res.render('trip', {trips});
        }
    }
})
// for the refresh I will pull the fetched api from the dataCache export and add to a trips array
router.get('/trip/refresh', async (req,res) => {
    // using async since we are fetching from network and need a promise returned
    try{
        trips = await fetchData();
        fs.writeFileSync(tripsLocal, JSON.stringify(trips, null, 2),'utf-8');
        res.render('trip' , {trips:trips})
    }
    catch(e){
        if(e){
            console.error("There has been an error processing your request : " , error);
            res.render('trip',{trips});
        }
    }
})
module.exports = router;