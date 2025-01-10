import HomePageHeader from "./HomePageHeader";
import style from "./singlemoviepage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SingleMoviePage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [seats, setSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find((seat) => seat.id === seatId);
    if (seat && seat.occupied) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeats.length || !selectedDate || !selectedTime) {
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
      seatNumber: selectedSeats.join(", "),
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
      })
      .catch((error) => {
        console.error("Error making booking:", error);
        alert("Failed to book seats. Please try again.");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${id}`)
      .then((response) => {
        setMovieDetails(response.data.movie);
        if (response.data.movie) {
          const startDate = new Date(response.data.movie.releaseDate);
          const endDate = new Date(response.data.movie.endDate);
          generateDates(startDate, endDate);
        }
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  const generateDates = (start, end) => {
    const datesArray = [];
    let currentDate = new Date(start);

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

  const handleDateClick = (selectedDate) => {
    setSelectedDate(selectedDate);

    if (selectedDate && selectedTime) {
      axios
        .get("http://localhost:3000/movie/available-seats", {
          params: {
            movieId: id,
            date: selectedDate,
            time: selectedTime,
          },
        })
        .then((response) => {
          setSeats(response.data.seats);
        })
        .catch((error) =>
          console.error("Error fetching available seats:", error)
        );
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);

    if (selectedDate && e.target.value) {
      axios
        .get("http://localhost:3000/movie/available-seats", {
          params: {
            movieId: id,
            date: selectedDate,
            time: e.target.value,
          },
        })
        .then((response) => {
          setSeats(response.data.seats);
        })
        .catch((error) =>
          console.error("Error fetching available seats:", error)
        );
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HomePageHeader />
      <div className={style.innerContainer}>
        <div className={style.imageContainer}>
          <img
            src={movieDetails.nowshowingImage}
            alt={movieDetails.title || "Movie Poster"}
            className={style.img}
          />
          <div className={style.details}>
            <h3>Movie Title: {movieDetails.title}</h3>
            <h3>Movie Description: {movieDetails.description}</h3>
            <h3>
              Movie Release Date:{" "}
              {new Date(movieDetails.releaseDate).toISOString().split("T")[0]}
            </h3>
            <h3>
              Movie End Date:{" "}
              {new Date(movieDetails.endDate).toISOString().split("T")[0]}
            </h3>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Choose a Date:
              <input
                type="date"
                required
                onChange={(e) => handleDateClick(e.target.value)}
              />
            </label>

            <label>
              Choose a Show Time:
              <select required onChange={handleTimeChange}>
                <option value="" disabled>
                  Select a show time
                </option>
                <option value="9-12">9:00 AM - 12:00 PM</option>
                <option value="12-14">12:00 PM - 2:00 PM</option>
                <option value="14-17">2:00 PM - 5:00 PM</option>
                <option value="17-20">5:00 PM - 8:00 PM</option>
                <option value="20-23">8:00 PM - 11:00 PM</option>
              </select>
            </label>

            <div className="seat-container">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${
                    seat.occupied
                      ? "occupied"
                      : selectedSeats.includes(seat.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSeatClick(seat.id)}
                  style={{
                    cursor: seat.occupied ? "not-allowed" : "pointer",
                    backgroundColor: seat.occupied
                      ? "gray"
                      : selectedSeats.includes(seat.id)
                      ? "green"
                      : "white",
                  }}
                >
                  {seat.id}
                </div>
              ))}
            </div>

            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}
