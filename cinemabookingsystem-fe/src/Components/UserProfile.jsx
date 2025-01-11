import userprofile from "./../../public/assets/images/userprofile.jpg";
import HomePageHeader from "./HomePageHeader";
import styles from "./userprofile.module.css";

export default function UserProfile() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div>
      <HomePageHeader />
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <img src={userprofile} alt="User Avatar" className={styles.avatar} />
          </div>
          <div className={styles.profileInfo}>
            <h2>User Profile</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
