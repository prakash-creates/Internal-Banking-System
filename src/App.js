import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Applyloan from "./components/Applyloan";
//import Aboutus from "./components/About";
import Viewloan from "./components/Viewloan";
import axios from "axios";
import { Fragment } from "react";
import Forms from "./components/Forms";
import Container from "./components/Container";
import Registration from "./components/Registration";
import AdminViewloan from "./components/AdminViewloan";
import Modifyinterest from "./components/Modifyinterest";
import Menu from "./components/Menu";
import Resetpassword from "./components/Resetpassword";
import About from "./components/About"; 

export default function App() {
  axios.defaults.headers.common["Authorization"] = `${localStorage.token}`;

  return (
    <div className="App">
      <NavigationBar />

      {/* //To paste user welcome message */}
      <Routes>
      

        {localStorage.isLoggedIn && localStorage.isLoggedIn === "true" ? (
          <Fragment>
            <Route path="/" element={<Homepage />} />
            <Route path="/applyloan" element={<Applyloan />} />
            <Route path="/viewloan" element={<Viewloan />} />
            <Route path="/resetpass" element={<Resetpassword/>}/>
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forms />} />
            <Route path="/applyloan" element={<Applyloan />} />
            <Route path="/viewloan" element={<Viewloan />} />

            <Route path="/adminhome" element={<Container />} />
            <Route path="/container" element={<Container />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/adminviewloan" element={<AdminViewloan />} />
            <Route path="/modify" element={<Modifyinterest />} />

          </Fragment>
        )}

        {localStorage.username === "Admin" &&
        localStorage.isLoggedIn === "true" ? (
          <Fragment>
          {/* <Route path="/adminhome" element={<Container />} /> */}
            <Route path="/adminhome" element={<Container />} />
            <Route path="/container" element={<Container />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/adminviewloan" element={<AdminViewloan />} />
            <Route path="/modify" element={<Modifyinterest />} />
          </Fragment>
        ) : (
          <Route path="/" element={<Homepage />} />
        )}
  
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}