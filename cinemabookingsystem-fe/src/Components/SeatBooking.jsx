import React, { useState } from "react";
import "./style.css";

function SeatBooking() {
const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = [
    { id: "A1", occupied: false },
    { id: "A2", occupied: true },
    { id: "A3", occupied: false },
    { id: "A4", occupied: false },
    { id: "A5", occupied: true },
    { id: "A6", occupied: false },
    { id: "B1", occupied: false },
    { id: "B2", occupied: false },
    { id: "B3", occupied: true },
    { id: "B4", occupied: false },
    { id: "B5", occupied: false },
    { id: "B6", occupied: false },
    { id: "C1", occupied: false },
    { id: "C2", occupied: false },
    { id: "C3", occupied: false },
    { id: "C4", occupied: true },
    { id: "C5", occupied: true },
    { id: "C6", occupied: false },
    { id: "D1", occupied: false },
    { id: "D2", occupied: false },
    { id: "D3", occupied: false },
    { id: "D4", occupied: false },
    { id: "D5", occupied: false },
    { id: "D6", occupied: false }
  ];

  const handleSeatClick = (seatId) => {
    if (seats.find((seat) => seat.id === seatId).occupied) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Seats booked: ${selectedSeats.join(", ")}`)
  };

  return ( 
    <div className="App">
      <h1>Film Booking</h1>
      <form onSubmit={handleSubmit}>
        {/* Film Selector */}
        <label>
          Choose a Film:
          <select required>
            <option value="" disabled>
              Select a film
            </option>
            <option value="Inception">Inception</option>
            <option value="Interstellar">Interstellar</option>
            <option value="The Dark Knight">The Dark Knight</option>
          </select>
        </label>

        {/* Date Picker */}
        <label>
          Choose a Date:
          <input type="date" required />
        </label>

        {/* Time Slot Selector */}
        <label>
          Choose a Show Time:
          <select required>
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

        {/* Seat Selection */}
        <div className="seat-container">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${
                seat.occupied ? "occupied" : selectedSeats.includes(seat.id) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seat.id}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default SeatBooking;



