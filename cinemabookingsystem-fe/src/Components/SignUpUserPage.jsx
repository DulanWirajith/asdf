import { Link, useNavigate } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import style from "./signinpage.module.css";

export default function SignUpUser() {
  const navigate = useNavigate();
  const handleSignUp = async () => {
    const username = document.querySelector("[name='Username']").value.trim();
    const email = document.querySelector("[name='Email']").value.trim();
    const password = document.querySelector("[name='Password']").value.trim();

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className={style.signcontainer}>
      <HomePageHeader />
      <center>
        <div className={style.wrapper}>
          <h1>Sign Up User</h1>
          <input type="username" placeholder="Username" name="Username" />
          <input type="email" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <button type="submit">
            <button type="button" onClick={() => handleSignUp()}>
              Sign Up
            </button>
          </button>
          <div>
            Not a member? <Link to="/signinadminanduser">Log Now</Link>
          </div>
        </div>
      </center>
    </div>
  );
}
