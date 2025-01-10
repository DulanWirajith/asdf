import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin-model.js";
import Movie from "../models/Movie-model.js";
import Bookings from "../models/Bookings-model.js";


export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const {
    title,
    description,
    releaseDate,
    endDate,
    nowshowingImage,
    actors,
  } = req.body;
  console.log(req.body);
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() == "" ||
    !endDate ||
    endDate.trim() === "" ||
    !releaseDate ||
    releaseDate.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      endDate: new Date(`${endDate}`),
      actors,
      admin: adminId,
      nowshowingImage,
      title,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!movie) {
    return res.status(404).json({ message: "Inavalid Movie ID" });
  }
  return res.status(200).json({ movie });
};

export const getAvailableSeats = async (req,res,next)=>{
  console.log("QUERY", req.query)
  const { movieId, date, time } = req.query;
  

  if (!movieId || !date || !time) {
    return res.status(400).json({ message: 'Movie ID, date, and time are required.' });
  }

  try {
    // Convert the date to a Date object and normalize time zone (if needed)
    const selectedDate = new Date(date);

    // Get all the seats (or load from the Seat model if you have a separate collection for seats)
    const allSeats = [
      { id: "A1", occupied: false },
      { id: "A2", occupied: false },
      { id: "A3", occupied: false },
      { id: "A4", occupied: false },
      { id: "A5", occupied: false },
      { id: "A6", occupied: false },
      { id: "B1", occupied: false },
      { id: "B2", occupied: false },
      { id: "B3", occupied: false },
      { id: "B4", occupied: false },
      { id: "B5", occupied: false },
      { id: "B6", occupied: false },
      { id: "C1", occupied: false },
      { id: "C2", occupied: false },
      { id: "C3", occupied: false },
      { id: "C4", occupied: false },
      { id: "C5", occupied: false },
      { id: "C6", occupied: false },
      { id: "D1", occupied: false },
      { id: "D2", occupied: false },
      { id: "D3", occupied: false },
      { id: "D4", occupied: false },
      { id: "D5", occupied: false },
      { id: "D6", occupied: false }
    ];

    // Find all bookings for the specific movie, date, and time
    const bookings = await Bookings.find({ movie: movieId, date: selectedDate, time: time });

    // Mark the seats as occupied based on the bookings
    const occupiedSeats = bookings.map((booking) => booking.seatNumber);

    // Now, we update the 'occupied' field for each seat in the ⁠ allSeats ⁠ array
    const updatedSeats = allSeats.map(seat => {
      return {
        ...seat,
        occupied: occupiedSeats.includes(seat.id) ? true : seat.occupied
      };
    });

    // Return both occupied and available seats
    res.status(200).json({ seats: updatedSeats });
  } catch (error) {
    console.error("Error fetching available seats:", error);
    res.status(500).json({ message: 'Error fetching available seats.' });
  }
}
