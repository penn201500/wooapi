"use strict";

import express from "express";
import axios from "axios";
import cors from "cors";
import cryptoJS from 'crypto-js';
import { config } from "dotenv";

const { HmacSHA256 } = cryptoJS;

config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const app = express();
const port = 63343;

app.use(cors());

const apiKey = process.env.WOO_API_KEY;
const apiSecret = process.env.WOO_API_SECRET;
console.log("API Key:", apiKey, "API Secret:", apiSecret);

// Updated generate signature function
async function getSignature(method, requestPath, requestBody = '') {
    const xApiTimestamp = Date.now().toString();
    const signString = xApiTimestamp + method + requestPath + requestBody; // Concatenate as per the new rule
    const signature = HmacSHA256(signString, apiSecret).toString();
    return {
        'Content-Type': 'application/json', // Ensure this matches the expected Content-Type
        'x-api-key': apiKey,
        'x-api-signature': signature,
        'x-api-timestamp': xApiTimestamp,
        'cache-control': 'no-cache'
    };
}

app.get("/getAccountInfo", async (req, res) => {
    const method = "GET";
    const requestPath = "/v3/accountinfo"; // Update as per the actual request path
    const headerInfo = await getSignature(method, requestPath);

    // Log the header information
    console.log('Header Info:', headerInfo);

    const url = `https://api.woo.org${requestPath}`; // Update the base URL as needed

    try {
        const response = await axios.get(url, { headers: headerInfo });
        console.log("Data fetched successfully");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
