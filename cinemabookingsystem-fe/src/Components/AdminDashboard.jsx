import { useState } from "react";
import styles from "./homepageheader.module.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
  };
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
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <span>Logout</span>
              </Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
