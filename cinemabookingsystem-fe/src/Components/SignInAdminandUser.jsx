import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import styles from "./signinadminanduser.module.css";

export default function SignInAdminAndUserPage() {
  return (
    <div>
        <HomePageHeader />
      <div className={styles.signcontainer}>
        <div className={styles.wrapper}>
          <h1>Sign In</h1>
          <button className={`${styles.button} ${styles.admin}`}>
            <Link
              to="/signinadmin"
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
              to="/signinuser"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              User
            </Link>
          </button>
          <div className={styles.signupPrompt}>
            Not a member? <br />
            <Link to="/signupadminanduser">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
