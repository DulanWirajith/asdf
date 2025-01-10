import { Link } from "react-router-dom";
import styles from "./homepageheader.module.css";
import { useEffect, useState } from "react";

export default function HomePageHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); 
    };

    
    const interval = setInterval(checkToken, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <header>
      <div className={styles.header}>
        <h1 className={styles.title}>Cinema Hub</h1>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchBar}
            placeholder="Search for Movies..."
          />
          <button className={styles.searchButton}>
            <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
            Search
          </button>
        </div>
        <button className={styles.signInButton}>
          <Link to="/signinadminanduser" className={styles.linkStyle}>
            Sign In
          </Link>
        </button>
        <div className={styles.links}>
          {isLoggedIn ? (
            <>
              <Link
                to="/userprofile"
                style={{ textDecoration: "none", color: "white" }}
              >
                <span>User Profile</span>
              </Link>
              <span> | </span>
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
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
