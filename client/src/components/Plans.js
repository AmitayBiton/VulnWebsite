import React from "react";
import Plan from "./Plan";

const Plans = () => {
  return (
    <div className="ui three column grid container">
      <br />
      <h1 className="ui header">Our Plans</h1>

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
  );
};

export default Plans;
