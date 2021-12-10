import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const menuItemClick = (e) => {
  if (e.target.classList.contains("item")) {
    console.log(e.target.classList);
    const menu = document.querySelectorAll(".item");
    menu.forEach((men) => {
      men.classList.remove("active");
    });
    e.target.classList.add("active");
  }
};

function Menu() {
  return (
    <div className="ui inverted segment">
      <div className="ui inverted secondary menu ">
        <Link className="active item" to="/">
          Home
        </Link>
        <Link className="item" to="/">
          Plans & prices{" "}
        </Link>
        <Link className="item right" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Menu;
