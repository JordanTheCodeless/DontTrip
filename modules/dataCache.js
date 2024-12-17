const axios = require("axios");
const fs = require("fs");

async function fetchData() {
    let limit = 5;
    let url = `https://freetestapi.com/api/v1/destinations?limit=${limit}`;

    try {
        let response = await axios.get(url);
        let cachedData = response.data.map((post) => ({
                id: post.id,
                name: post.name,
                image: post.image,
                population: post.population,
                description: post.description,
                visits: 3
        }
             // default value for times visited
        ));
        return cachedData;

    } catch (error) {
        console.error("Error", error.message);
        return [];
    }
}

module.exports = fetchData;
