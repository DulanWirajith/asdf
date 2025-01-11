import HomePageHeader from "./HomePageHeader";
import style from "./singlemoviepage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "./../../socket";

export default function SingleMoviePage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null); // Changed to single seat
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [seats, setSeats] = useState([]);

  // Fetch available seats based on movie, date, and time
  const fetchAvailableSeats = (movieId, date, time) => {
    axios
      .get("http://localhost:3000/movie/available-seats", {
        params: {
          movieId: movieId,
          date: date,
          time: time,
        },
      })
      .then((response) => {
        setSeats(response.data.seats);
      })
      .catch((error) => {
        console.error("Error fetching available seats:", error);
      });
  };

  // Handle seat selection and deselection (only one seat allowed)
  const handleSeatClick = (seatId) => {
    const seat = seats.find((seat) => seat.id === seatId);
    if (seat && seat.occupied) return; // Prevent selection of occupied seats

    // If a seat is already selected, deselect it
    if (selectedSeat === seatId) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatId); // Allow only one seat to be selected
    }
  };

  // Handle the form submission for booking
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeat || !selectedDate || !selectedTime || selectedTime === "Select Time") {
      alert("Please select a seat, date, and time before booking.");
      return;
    }

    const userId = localStorage.getItem("id");

    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    const bookingData = {
      movie: id,
      date: selectedDate,
      seatNumber: selectedSeat, // Book only one seat
      user: userId,
      time: selectedTime,
    };

    axios
      .post("http://localhost:3000/booking/", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Booking successful!");
        setSelectedSeat(null); // Reset seat selection after booking
      })
      .catch((error) => {
        console.error("Error making booking:", error);
        alert("Failed to book seat. Please try again.");
      });
  };

  // Fetch movie details and generate dates
  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => {
        setMovieDetails(response.data.movie);
        if (response.data.movie) {
          const startDate = new Date();
          const endDate = new Date(response.data.movie.endDate);
          generateDates(startDate, endDate);
        }
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  // Handle new booking notifications and refresh seat data
  useEffect(() => {
    socket.on("newBooking", (data) => {
      console.log("New Booking Received:", data);
      fetchAvailableSeats(id, selectedDate, selectedTime);
    });

    return () => {
      socket.off("newBooking");
    };
  }, [id, selectedDate, selectedTime]);

  // Generate available dates based on release and end date
  const generateDates = (start, end) => {
    const datesArray = [];
    let currentDate = new Date(start);

    // Set current date as first date
    setSelectedDate(currentDate.toISOString().split("T")[0]);

    while (currentDate <= end) {
      datesArray.push({
        day: currentDate
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase(),
        date: currentDate.getDate(),
        fullDate: currentDate.toISOString().split("T")[0],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDates(datesArray);
  };

  // Handle date selection
  const handleDateClick = (selectedDate) => {
    setSelectedDate(selectedDate);

    if (selectedDate && selectedTime && selectedTime !== "Select Time") {
      fetchAvailableSeats(id, selectedDate, selectedTime);
    }
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setSelectedTime(selectedTime);

    if (selectedDate && selectedTime && selectedTime !== "Select Time") {
      fetchAvailableSeats(id, selectedDate, selectedTime);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const defaultImage = "https://via.placeholder.com/1000x400.png?text=No+Image+Available";

  // Get today's date and movie's end date for validation
  const today = new Date().toISOString().split("T")[0];
  const movieEndDate = new Date(movieDetails.endDate).toISOString().split("T")[0];

  return (
    <div>
      <HomePageHeader />
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src={movieDetails.nowshowingImage || defaultImage}
            alt={movieDetails.title || "Movie Poster"}
            className={style.img}
          />
          <div className={style.details}>
            <h3>Movie Title: {movieDetails.title}</h3>
            <h3>Movie Description: {movieDetails.description}</h3>
            <h3>Movie Release Date: {new Date(movieDetails.releaseDate).toISOString().split("T")[0]}</h3>
            <h3>Movie End Date: {movieEndDate}</h3>
          </div>
        </div>
        <div className={style.bookingSection}>
          <form onSubmit={handleSubmit}>
            <label className={style.formLabel}>
              Choose a Date:
              <input
                type="date"
                required
                min={today}
                max={movieEndDate}
                onChange={(e) => handleDateClick(e.target.value)}
                className={style.inputField}
                value={selectedDate}
              />
            </label>

            <label className={style.formLabel}>
              Choose a Show Time:
              <select
                required
                onChange={handleTimeChange}
                className={style.inputField}
                value={selectedTime}
              >
                <option value="Select Time" disabled>Select Time</option>
                <option value="9-12">9:00 AM - 12:00 PM</option>
                <option value="12-14">12:00 PM - 2:00 PM</option>
                <option value="14-17">2:00 PM - 5:00 PM</option>
                <option value="17-20">5:00 PM - 8:00 PM</option>
                <option value="20-23">8:00 PM - 11:00 PM</option>
              </select>
            </label>

            <div className={style.seatsContainer}>
              {seats.reduce((rows, seat, index) => {
                if (index % 6 === 0) rows.push([]);
                rows[rows.length - 1].push(seat);
                return rows;
              }, []).map((seatRow, rowIndex) => (
                <div key={rowIndex} className={style.seatRow}>
                  {seatRow.map((seat) => (
                    <div
                      key={seat.id}
                      className={`${style.seat} 
                        ${seat.occupied ? style.occupied : selectedSeat === seat.id ? style.selected : ""}`}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      {seat.id}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button type="submit" className={style.bookNowBtn}>Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}
