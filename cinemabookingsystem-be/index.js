import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRoutes from "./routes/booking-routes.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRoutes);

app.get("/", (req, res) => [res.send("Hello Node API")]);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

mongoose
  .connect(
    "mongodb+srv://kalanisathyangi:Fmm8ncu3xBlRdBig@cinema-booking-system-d.1ahkq.mongodb.net/Cinema-Booking-System?retryWrites=true&w=majority&appName=Cinema-booking-system-DB"
  )
  .then(() => {
    console.log("Connected to the Database!!");
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed!!");
  });

  export { app, io };