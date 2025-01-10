import express from "express";
import { addMovie, getAllMovies, getAvailableSeats, getMovieById } from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get('/available-seats', getAvailableSeats);
movieRouter.get("/:id",getMovieById);


export default movieRouter;
