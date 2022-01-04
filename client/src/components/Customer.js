import React from "react";

const Customer = (props) => {
  const html = props.firstName + " " + props.lastName;
  return (
    <div className="ui card">
      <div className="content">
        <div
          className="header"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div className="meta">
          <span className="right floated time">{props.customerID}</span>
          <span className="category">{props.phoneNumber}</span>
        </div>
        <div className="description">
          <p></p>
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
    </div>
  );
};

export default Customer;
