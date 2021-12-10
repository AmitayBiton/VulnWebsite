import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

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
    <Router>
      <div className="ui inverted segment">
        <div
          className="ui inverted secondary menu "
          onClick={(e) => menuItemClick(e)}
        >
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
    </Router>
  );
}

export default Menu;
