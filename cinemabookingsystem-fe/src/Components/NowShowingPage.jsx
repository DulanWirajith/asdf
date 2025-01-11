import style from "./nowshowingpage.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NowShowingPage() {
  const [nowShowMovies, setNowShowMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie")
      .then((response) => {
        setNowShowMovies(response.data.movies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className={style.nowshowing}>
      <h1 className={style.heading}>NOW SHOWING</h1>
      <div className={style.gridContainer}>
        {nowShowMovies.length > 0 ? (
          nowShowMovies.map((movie, index) => (
            <div key={index} className={style.card}>
              <Link to={`/singlemoviepage/${movie._id}`} className={style.link}>
                <img
                  src={movie.nowshowingImage}
                  alt={movie.title || "Movie Poster"}
                  className={style.cardImg}
                />
              </Link>
              <button
                className={style.button}
                onClick={() => console.log(`Buying tickets for ${movie.title}`)}
              >
                Buy Tickets
              </button>
            </div>
          ))
        ) : (
          <p className={style.noMovies}>No movies currently showing</p>
        )}
      </div>
    </div>
  );
}
