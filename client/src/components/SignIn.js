import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Customers from "./Customers";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPaswword] = useState("");
  const [isLogIn, setisLogIn] = useState(false);
  const [loginTry, setLoginTry] = useState(false);

  const loginMessagge = (html) => {
    if (isLogIn) return;
    document.querySelector(".error").insertAdjacentHTML("beforeend", html);
    setTimeout(() => {
      const el = document.querySelector(".error");
      if (!el) return;
      el.innerHTML = "";
    }, 3000);
  };

  const loginPage = () => {
    const html = `${username} unauthorized`;
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
            <button
              class="ui small button left"
              onClick={(e) => forgotPasswordClick(e)}
            >
              <i class="icon user"></i>
              Forgot your password?
            </button>

            <Link className="ui small button" to="/usersignup">
              <i className="user plus icon"></i>
              Add New User
            </Link>
          </form>

          {/* <div class="ui message">
          New to us? <Link to="/signup">Sign Up</Link>
        </div> */}
          <div className="ui error message">
            {loginTry && !isLogIn ? loginMessagge(html) : ""}
          </div>
        </div>
      </div>
    );
  };

  const CustomersPage = () => {
    return (
      <div className="ui">
        <Customers />
      </div>
    );
  };

  const onUserNameChange = (e) => {
    setLoginTry(false);
    document.querySelector(".error").insertAdjacentHTML("beforeend", "");
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setLoginTry(false);
    document.querySelector(".error").insertAdjacentHTML("beforeend", "");
    setPaswword(e.target.value);
  };

  const forgotPasswordClick = (e) => {
    e.preventDefault();
    console.log("forgot password");
    return;
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setLoginTry(true);
    const url = "https://localhost:9000/login/";

    try {
      const res = await axios
        .post(url, {
          username: username,
          password: password,
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            username === "" ||
            password === ""
          ) {
            console.log("User unauthorized");
            return loginPage();
          }
        });

      if (res.status === 200 && res.data === "loggin Succeeded!") {
        setisLogIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLogIn) {
    return loginPage();
  }
  return CustomersPage();
};

export default SignIn;
