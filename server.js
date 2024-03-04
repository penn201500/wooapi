"use strict";

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
let cryptoJS = require("crypto-js");
const port = 3000;

app.use(cors());

const apiKey = process.env.WOO_API_KEY;
const apiSecret = process.env.WOO_API_SECRET;
console.log("API Key:", apiKey, "API Secret:", apiSecret);

// generate singnature
async function getAccountInfo() {
    const xApiTimestamp = Date.now();
    const queryString = '|' + xApiTimestamp;
    const signature = cryptoJS.HmacSHA256(queryString, apiSecret).toString();
    return  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': apiKey,
        'x-api-signature': signature,
        'x-api-timestamp': xApiTimestamp,
        'cache-control': 'no-cache'
    }
}


app.get("/getAccountInfo", async (req, res) => {
    const url = 'https://api.woo.org' + '/v1/client/info';

    try {
        const response = await axios.get(url, {
            headers: await getAccountInfo()
        });
        console.log("Data fetched successfully");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({message: "Error fetching data"});
    }

})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
