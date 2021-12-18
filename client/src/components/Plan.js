import React from "react";

const Plan = (props) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">Name</div>
        <div className="meta">
          <span className="right floated time">2 days ago</span>
          <span className="category">Premium</span>
        </div>
        <div className="description">
          <p></p>
        </div>
      </div>
      <div className="extra content">
        <div className="right floated author">
          <img
            className="ui avatar image"
            src="https://www.w3schools.com/images/w3schools_green.jpg"
          />{" "}
          Matt
        </div>
      </div>
    </div>
  );
};

export default Plan;
