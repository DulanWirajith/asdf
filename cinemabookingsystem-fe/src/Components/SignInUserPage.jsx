import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import style from "./signinpage.module.css";

export default function SignInUserPage() {
  const handleLogin = async () => {
    const email = document.querySelector("[name='Email']").value.trim();
    const password = document.querySelector("[name='Password']").value.trim();
    if (!email || !password) {
      alert("Both email and password are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("id", data.id);
        localStorage.setItem("email", data.email);
        window.location.href = data.role === "User" ? "/homepage" : "/admindashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while logging in. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <HomePageHeader />
      <div className={style.signcontainer}>
        <div className={style.wrapper}>
          <h1>Sign In User</h1>
          <input type="email" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <button type="button" onClick={handleLogin}>
            Sign In
          </button>
          <div className={style.registerLink}>
            Not a member? <Link to="/signupadminanduser">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
