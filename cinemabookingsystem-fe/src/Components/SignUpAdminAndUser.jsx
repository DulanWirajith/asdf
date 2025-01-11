import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import styles from "./signupadminanduser.module.css";

export default function SignUpAdminAndUserPage() {
  return (
    <div>
      <div>
        <HomePageHeader />
        <div className={styles.signcontainer}>
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
          <div className={styles.signupPrompt}>
            Already a member? <br />
            <Link to="/signinadminanduser">Log In Now</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
