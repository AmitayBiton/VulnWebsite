import React from "react";
import Plan from "./Plan";

const Plans = () => {
  return (
    <div className="ui container">
      <h1 className="ui header">Customers</h1>

      <a class="ui label large">
        <i class="user plus icon"></i>
        Add New Customer
      </a>

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
