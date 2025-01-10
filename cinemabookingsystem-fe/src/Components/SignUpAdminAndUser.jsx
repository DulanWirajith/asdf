import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import styles from "./signinadminanduser.module.css";

export default function SignUpAdminAndUserPage() {
  return (
    <div>
      <div className={styles.signcontainer}>
        <HomePageHeader />
        <center>
          <div className={styles.wrapper}>
            <h1>Sign Up</h1>
            <button className={`${styles.button} ${styles.admin}`}>
              <Link
                to="/signupadmin"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Admin
              </Link>
            </button>
            <button className={`${styles.button} ${styles.user}`}>
              <Link
                to="/signupuser"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                User
              </Link>
            </button>
            <div>
              Allready in a member? <br />
              <Link to="/signinadminanduser">Log Now</Link>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}
