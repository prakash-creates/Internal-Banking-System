import React, { useEffect } from "react";
import "./Menu.css";
import { Link } from "react";
import {
  FaHome,
  FaUserAlt,
  FaEdit,
  FaCalculator,
  FaUserPlus,
} from "react-icons/fa";
import { CgViewList, CgLogOut, CgInfo } from "react-icons/cg";

function Menu() {
  /* useEffect(() => {
    const mainMenuLi = document.getElementById("mainMenu").querySelector("li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    mainMenuLi.forEach((n) => n.addEventListner("click", changeActive));
  }, []); */
  const Icon = ({ icon, url }) => (
    <li>
      <a href={url}>{icon}</a>
    </li>
  );

  return (
    <menu style={{ minHeight: "100%" }}>
      {/* <img src={Logo} alt="" /> */}
      <ul id="mainMenu">
        <Icon url="/adminhome" icon={<FaHome />} />

        {/* <Icon icon={<FaUserAlt />} /> */}
        <Icon url="/modify" icon={<FaEdit />} />
        <Icon url="adminviewloan" icon={<CgViewList />} />
        {/* <Icon icon={<FaCalculator />} /> */}
        <Icon url="/register" icon={<FaUserPlus />} />
      </ul>
      {/* <ul id="admin-lastMenu">
        <Icon url="/about" icon={<CgInfo />} />
         <Icon icon={<CgLogOut />} /> 
      </ul> */}
    </menu>
  );
}

export default Menu;