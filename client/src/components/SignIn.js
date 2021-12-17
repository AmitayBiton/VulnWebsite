import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Plans from "./Plans";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPaswword] = useState("");
  const [isLogIn, setisLogIn] = useState(false);

  const loginPage = () => {
    return (
      <div className="ui middle aligned center aligned grid stacked segment container">
        <div className="column">
          <h2 className="ui black image header">
            <i className="sync alternate icon"></i>

            <div className="content">Log-in to your account</div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onUserNameChange}
                    placeholder="User Name"
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div
                className="ui fluid large black submit button"
                onClick={userLogin}
              >
                Login
              </div>
            </div>
          </form>

          {/* <div class="ui message">
          New to us? <Link to="/signup">Sign Up</Link>
        </div> */}
          <div className="ui error message">
            {username.length > 10
              ? document.querySelector("body").insertAdjacentHTML(
                  "beforeend",
                  `<img src="https://image.shutterstock.com/z/stock-vector-system-hacked-warning-alert-message-on-screen-of-hacking-attack-vector-spyware-or-malware-virus-2034804278.jpg" alt="Girl in a jacket" width="500" height="600">
`
                )
              : ""}
          </div>
        </div>
      </div>
    );
  };

  const plansPage = () => {
    return (
      <div className="ui">
        <Plans />
      </div>
    );
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPaswword(e.target.value);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/login/";
    const res = await axios.post(url, {
      username: username,
      password: password,
    });
    console.log(res);
    if (res.status === 200 && res.data === "OK") {
      setisLogIn(true);
    }
  };

  if (!isLogIn) {
    return loginPage();
  }
  return plansPage();
};

export default SignIn;
