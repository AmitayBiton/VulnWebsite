import React from "react";

const Customer = (props) => {
  return (
    <div className="ui card" key={props.customerID}>
      <div className="content">
        <div className="header">{props.firstName + " " + props.lastName}</div>
        <div className="meta">
          <span className="right floated time">{props.customerID}</span>
          <span className="category">{props.phoneNumber}</span>
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
          {props.emailAddress}
        </div>
      </div>
    </div>
  );
};

export default Customer;
