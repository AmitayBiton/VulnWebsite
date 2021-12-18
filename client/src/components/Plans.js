import React from "react";
import Plan from "./Plan";
import { Link } from "react-router-dom";

const Plans = () => {
  const addUser = () => {
    console.log("user");
  };
  return (
    <div className="ui container">
      <h1 className="ui header">Customers</h1>

      <Link className="ui label large" to="/signup">
        <i className="user plus icon"></i>
        Add New Customer
      </Link>

      <div className="ui three column grid container">
        <br />
        <br />
        <br />

        <div className="row">
          <div className="column">
            <Plan title={"Unlimited"} content={"my content"} />
          </div>
          <div className="column">
            <Plan />
          </div>
          <div className="column">
            <Plan />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Plan />
          </div>
          <div className="column">
            <Plan />
          </div>
          <div className="column">
            <Plan />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Plan />
          </div>
          <div className="column">
            <Plan />
          </div>
          <div className="column">
            <Plan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
