import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Customers from "./Customers";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPaswword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLogIn, setisLogIn] = useState(false);
  const [loginTry, setLoginTry] = useState(false);
  const [pinCode, setPinCode] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const loginMessagge = (html) => {
    if (isLogIn) return;
    document.querySelector(".error").insertAdjacentHTML("beforeend", html);
    setTimeout(() => {
      const el = document.querySelector(".error");
      if (!el) return;
      el.innerHTML = "";
    }, 3000);
  };

  const pinCodeInput = () => {
    return (
      <form class="ui fluid form">
        <br />
        <div class="field" placeholder="Last Name">
          <div class="ui pointing below label">
            If the username exist, a pin code sent to your mail, please enter it
            and a new password below
          </div>
          <div
            class="ui input focus"
            onChange={(e) => setPinCode(e.target.value)}
            value={pinCode}
          >
            <input type="text" placeholder="Pin code" />
          </div>
          <br />
          <br />
          <div
            class="ui input focus"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          >
            <input type="text" placeholder="New Password" type="password" />
          </div>

          <button class="ui icon button" onClick={(e) => PinCodeSendBTN(e)}>
            Send
          </button>
        </div>
      </form>
    );
  };

  const PinCodeSendBTN = async (e) => {
    e.preventDefault();
    const url = `https://localhost:9000/users/${userID}/changeForgottenPassword`;

    const res = await axios
      .post(url, {
        pincode: pinCode,
        password: newPassword,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginPage = (html) => {
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
          {forgotPasswordClicked ? pinCodeInput() : ""}
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

  const forgotPasswordClick = async (e) => {
    e.preventDefault();
    setForgotPasswordClicked(true);

    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {
      console.log(err);
    });
    if (!res) return;

    const found = res?.data.find((element) => element.username === username);
    if (!found) return;
    setUserID(found.userID);
    url = `https://localhost:9000/users/${found.userID}/forgetPassword`;

    const res1 = await axios.post(url).catch((err) => {
      console.log(err);
    });
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

      if (res.status === 200 && res.data === "login Succeeded!") {
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
