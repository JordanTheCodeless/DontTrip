const axios = require("axios");
async function fetchData() {
    // JavaScript Example: Fetch All Data
    // This function demonstrates how to fetch all data using the Fetch API.

    const limit = 5;
    const keyword = "Dublin";

    fetch(`https://freetestapi.com/api/v1/destinations?limit=${limit}?search=${keyword}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
fetchData();
