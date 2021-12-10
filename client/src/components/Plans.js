import React from "react";
import Plan from "./Plan";

const Plans = () => {
  return (
    <div class="ui three column grid container">
      <br />
      <h1 class="ui header">Our Plans</h1>

      <div class="row">
        <div class="column">
          <Plan title={"Unlimited"} content={"my content"} />
        </div>
        <div class="column">
          <Plan />
        </div>
        <div class="column">
          <Plan />
        </div>
      </div>
      <div class="row">
        <div class="column">
          <Plan />
        </div>
        <div class="column">
          <Plan />
        </div>
        <div class="column">
          <Plan />
        </div>
      </div>
      <div class="row">
        <div class="column">
          <Plan />
        </div>
        <div class="column">
          <Plan />
        </div>
        <div class="column">
          <Plan />
        </div>
      </div>
    </div>
  );
};

export default Plans;
