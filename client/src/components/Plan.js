import React from "react";

const Plan = (props) => {
  return (
    <div class="ui card">
      <div class="content">
        <div class="header">{props.title || "Plan"}</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Plan</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                {props.content || "bla bla bla bla bla bla"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <button class="ui button">Join Plan</button>
      </div>
    </div>
  );
};

export default Plan;
