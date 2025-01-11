import AdminDashboard from "./AdminDashboard";
import styles from "./addmoviespage.module.css";
import { Link } from "react-router-dom";

export default function AddMoviesPage() {
  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    const title = document.querySelector("[name='movieTitle']").value.trim();
    const description = document
      .querySelector("[name='movieDescription']")
      .value.trim();
    const actors = document.querySelector("[name='movieActors']").value.trim();
    const releaseDate = document
      .querySelector("[name='releaseDate']")
      .value.trim();
    const endDate = document.querySelector("[name='endDate']").value.trim();
    const nowshowingImage = document
      .querySelector("[name='nowShowing']")
      .value.trim();

    if (
      !title ||
      !description ||
      !actors ||
      !releaseDate ||
      !endDate ||
      !nowshowingImage
    ) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          actors,
          releaseDate,
          endDate,
          nowshowingImage,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <AdminDashboard />
      <div className={styles.innerContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Add Movies</h1>
          <form className={styles.form}>
            <div className={styles.formgroup}>
              <label htmlFor="movieTitle">Movie Title:</label>
              <input
                id="movieName"
                className={styles.input}
                placeholder="Movie Name"
                name="movieTitle"
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="movieDescription">Movie Description:</label>
              <input
                id="movieDescription"
                className={styles.input}
                placeholder="Movie Description"
                name="movieDescription"
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="actors">Actors:</label>
              <input
                id="actors"
                className={styles.input}
                placeholder="Actors"
                name="movieActors"
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="releaseDate">Release Date:</label>
              <input
                id="releaseDate"
                className={styles.input}
                placeholder="Release Date"
                type="date"
                name="releaseDate"
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="endDate">End Date:</label>
              <input
                id="releaseDate"
                className={styles.input}
                placeholder="Release Date"
                type="date"
                name="endDate"
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="nowShowing">Now Showing Movie Image:</label>
              <input
                id="nowShowing"
                className={styles.input}
                placeholder="Now Showing Movie"
                name="nowShowing"
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              onClick={() => handleSubmit()}
            >
              <Link to="/admindashboard">Submit</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
