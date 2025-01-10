import HomePage from "./Components/HomePage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import image1 from "./../public/assets/images/1st.jpg";
import image2 from "./../public/assets/images/2nd.webp";
import image3 from "./../public/assets/images/3rd.webp";
import image4 from "./../public/assets/images/4th.jpg";
import AdminDashboard from "./Components/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInAdminPage from "./Components/SignInAdminPage";
import SignInUserPage from "./Components/SignInUserPage";
import SignInAdminAndUserPage from "./Components/SignInAdminandUser";
import SignUpAdminAndUserPage from "./Components/SignUpAdminAndUser";
import SignUpAdmin from "./Components/SignUpAdmin";
import SignUpUser from "./Components/SignUpUserPage";
import AdminPage from "./Components/AdminPage";
import AddMoviesPage from "./Components/AddMoviesPage";
import UserProfile from "./Components/UserProfile";
import SingleMoviePage from "./Components/SingleMoviePage";
import SeatBooking from "./Components/SeatBooking";

const carouselData = [
  { src: image1, alt: "1st image" },
  { src: image2, alt: "2nd image" },
  { src: image3, alt: "3rd image" },
  { src: image4, alt: "4th image" },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path= "/" element= {<HomePage />} />
          <Route path= "/signinadminanduser" element= {<SignInAdminAndUserPage />} />
          <Route path= "/signupadminanduser" element= {<SignUpAdminAndUserPage />} />
          <Route path= "/signinadmin" element= {<SignInAdminPage />} />
          <Route path= "/signinuser" element= {<SignInUserPage />} />
          <Route path= "/signupadmin" element= {<SignUpAdmin />} />
          <Route path= "/signupuser" element= {<SignUpUser />} />
          <Route path= "/admindashboard" element= {<AdminPage />} />
          <Route path= "/homepage" element= {<HomePage />} />
          <Route path= "addmovies" element= {<AddMoviesPage />} />
          <Route path= "/userprofile" element= {<UserProfile />} />
          <Route path= "/singlemoviepage/:id" element= {<SingleMoviePage />} /> 
          <Route path= "/seatbooking" element= {<SeatBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
