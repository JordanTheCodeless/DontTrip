const express = require("express");
const router = express.Router(); // This will be my export router for all things trips
const fs = require("fs");
const multer = require('multer');
const fetchData = require("../modules/dataCache");
let storage = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
})
// Creating local JSON path
let tripsLocal = "trips.json";
// Empty array to push data upon
let trips = [];
var upload = multer({ storage: storage })
// Editing file
router.put("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, visits } = req.body;
    if (!name || !description || visits === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    fs.readFile(tripsLocal, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to read trips file" });
      }
      let trips = [];
      try {
        trips = JSON.parse(data);
      } catch (e) {
        return res.status(500).json({ message: "Failed to parse trips data" });
      }
      const tripIndex = trips.findIndex((trip) => trip.id === parseInt(id));

      if (tripIndex !== -1) {
        trips[tripIndex] = {
          id: parseInt(id),
          name,
          description,
          visits,
        };
        fs.writeFile(tripsLocal, JSON.stringify(trips, null, 2), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to save trip to JSON" });
          }
          return res.status(200).json({ message: "Trip updated successfully" });
        });
      } else {
        return res.status(404).json({ message: "Trip not found" });
      }
    });
  });

// Deleting a trip
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(tripsLocal, (e, data) => {
    if (e) {
      res.status(500).send("There has been an issue reading your file");
    } else {
      try {
        let tripsData = JSON.parse(data);
        let newTrips = tripsData.filter((trip) => trip.id !== id);
        fs.writeFile(tripsLocal, JSON.stringify(newTrips, null, 2), (e) => {
          if (e) {
            res.status(500).send("error saving data");
          } else {
            res.json("Trip successfully Deleted");
          }
        });
      } catch (e) {
        res.status(500).send("error parsing data");
      }
    }
  });
});

router.get('/create', (req,res) => {
    res.render('create');

})
router.post('/create', upload.single('profile-file'), (req, res) => {
    const { tripName, tripDescription, tripVisits } = req.body;
    const tripImage = req.file;
    if (!tripDescription || !tripName || !tripVisits) {
        return res.render('create');
    }
    let lastID = 0;
    // find the last id that exists
    for (let trip of trips) {
        if (trip.id > lastID) {
            lastID = trip.id;
        }
    }
    let tripID = lastID + 1;

    const createdTrip = {
        id: tripID,
        name: tripName,
        image: `/uploads/${tripImage.filename}`, // needed to move it into public folder was having issues accessing level below root
        description: tripDescription,
        visits: parseInt(tripVisits)
    };
    fs.readFile(tripsLocal, (err, data) => {
        const trips = JSON.parse(data);
        trips.push(createdTrip);
        fs.writeFile(tripsLocal, JSON.stringify(trips, null, 2), () => {
            res.redirect("/trip");
        });
    });
});

router.get("/", (req, res) => {
  // try catch statement to read from file if exists if not still render trips as empty and give error message
  // https://dev.to/tejesh/nodejs-read-json-file-using-require-vs-fs-module-4f94
  try {
    trips = JSON.parse(fs.readFileSync(tripsLocal, "utf8"));
    console.log("File read succesfully");
    res.render("trip", { trips });
  } catch (e) {
    if (e) {
      console.error("File unreadable perhaps refresh the page ");
      res.render("trip", { trips });
    }
  }
});
// for the refresh I will pull the fetched api from the dataCache export and add to a trips array
router.get("/refresh", async (req, res) => {
  // using async since we are fetching from network and need a promise returned
  try {
    trips = await fetchData();
    fs.writeFileSync(tripsLocal, JSON.stringify(trips, null, 2), "utf-8");
    res.redirect("/trip");

  } catch (e) {
    if (e) {
      console.error(
        "There has been an error processing your request : ",
        e
      );
      res.render("trip", { trips });
    }
  }
});

module.exports = router;
