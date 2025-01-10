import styles from "./homepageheader.module.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <header>
        <div className={styles.header}>
          <h1 className={styles.title}>Cinema Hub</h1>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchBar}
              placeholder="Search for Moives..."
            ></input>
            <button className={styles.searchButton}>
              <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
              Search
            </button>
          </div>
          <div className={styles.links}>
            <span>Admin</span>
            <span>|</span>
            <Link
              to="/addmovies"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span>Add Movies</span>
            </Link>
            <span>|</span>
            <Link
              to="/userprofile"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span>User Profile</span>
            </Link>
            <span>|</span>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
