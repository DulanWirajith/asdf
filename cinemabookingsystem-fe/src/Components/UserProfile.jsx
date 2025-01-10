import userprofile from "./../../public/assets/images/userprofile.jpg";
import HomePageHeader from "./HomePageHeader";

export default function UserProfile() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div>
      <HomePageHeader />
      <div>
        <img src={userprofile} alt="User Avatar" />
      </div>
      <div>
        <p>{email}</p>
        <p>{role}</p>
      </div>
    </div>
  );
}
