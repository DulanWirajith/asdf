// socket.js

import { io } from "socket.io-client";

// Update this URL if the server is running on a different host
const SOCKET_URL = "http://localhost:3000";  // Use localhost for local development

const socket = io(SOCKET_URL, {
  transports: ["websocket"],  // Use WebSocket transport
  reconnectionAttempts: 5,     // Try reconnecting up to 5 times if the connection fails
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);  // Logs connection issues
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("updateBookings", (data) => {
  console.log("Updated bookings:", data);
});

// Handling errors related to socket connection
socket.on("error", (error) => {
  console.error("Socket error:", error);  // Logs socket-related errors
});

export default socket;
