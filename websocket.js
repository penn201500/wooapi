"use strict";

// import WebSocket from "ws";

const API_SERVER_WSS = 'wss://wss.woo.org/ws/stream';

function initWebSocket(applicationId) {
    const wssUrl = `${API_SERVER_WSS}/${applicationId}`;
    const socket = new WebSocket(wssUrl);
    console.log('WebSocket URL:', wssUrl);

    socket.onopen = function (event) {
        console.log('WebSocket is connected.');

        // The server will send a ping command to the client every 10 seconds.
        // If the pong from client is not received within 10 seconds for 10 consecutive times,
        // it will actively disconnect the client.
        const pongMsg = JSON.stringify({event: 'pong'});

        // Send a pong message every 10 seconds to keep the connection alive
        setInterval(() => {
            console.log('Sending pong to keep the connection alive.');
            displayMessage(pongMsg, false)
            socket.send(pongMsg);
        }, 10000);
    };

    socket.onmessage = function (event) {
        console.log('Message from server:', event.data);
        displayMessage(event.data, true)
        const data = JSON.parse(event.data);

        // If the server requires a pong message, respond accordingly
        if (data && data.event === 'ping') {
            socket.send(JSON.stringify({event: 'pong'}));
        }
    };

    socket.onerror = function (error) {
        console.error('WebSocket Error:', error);
    };

    socket.onclose = function (event) {
        console.log('WebSocket is closed now.');
    };

    function displayMessage(message, isFromServer) {
        const messagesContainer = document.getElementById('websocket-messages');
        if (!messagesContainer) {
            console.error('The #websocket-messages element is not found in the DOM.');
            return;
        }
        const msgElement = document.createElement('div');
        const prefix = isFromServer ? "Received: " : "Sent: ";
        msgElement.textContent = prefix + message;
        messagesContainer.appendChild(msgElement);
    }

}

fetch('/config.json') // Adjust the path if your config.json is located elsewhere
    .then(response => response.json())
    .then(config => {
        initWebSocket(config.WOO_API_APP_ID);
    })
    .catch(error => console.error('Error loading the configuration:', error));
