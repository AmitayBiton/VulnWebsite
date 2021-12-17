import React from "react";

const Plan = (props) => {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{props.title || "Plan"}</div>
      </div>
      <div className="content">
        <h4 className="ui sub header">Plan</h4>
        <div className="ui small feed">
          <div className="event">
            <div className="content">
              <div className="summary">
                {props.content || "bla bla bla bla bla bla"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <button className="ui button">Join Plan</button>
      </div>
    </div>
  );
};

export default Plan;
