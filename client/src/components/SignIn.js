import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Customers from "./Customers";
import App from "../App";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPaswword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLogIn, setisLogIn] = useState(false);
  const [loginTry, setLoginTry] = useState(false);
  const [pinCode, setPinCode] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [changePassErr, setChangePassErr] = useState("");

  const loginMessagge = (errMessage) => {
    // return setTimeout(() => {
    //   <div className="ui error message">bla bla bla</div>;
    // }, 3000);
    return (
      <div
        className="ui error message"
        dangerouslySetInnerHTML={{ __html: errMessage }}
      ></div>
    );
  };

  const findUserName = async () => {
    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {});
    if (!res) return false;

    const found = res?.data.find((element) => element.username === username);
    if (!found) {
      setChangePassErr(`${username} not found`);
      return false;
    } else return true;
  };

  const pinCodeInput = () => {
    return (
      <form class="ui fluid form">
        <br />
        <br />
        <div class="field" placeholder="Last Name">
          <div class="ui pointing below label">
            If the user name exist, A pin code sent to your mail, please enter
            it and a new password below
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
          <div>
            <br />
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
      .then(() => {
        setPinCode("");
        setChangePassErr(`The password changed succeffuly`);
        setNewPassword("");
        setTimeout(() => {
          setForgotPasswordClicked(false);
          setChangePassErr(``);
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          setChangePassErr(`${username} not found`);
        } else setChangePassErr(err.response.data);
        return;
      });
  };

  const loginPage = () => {
    // const isLoggedIn = localStorage.getItem("isLoggedin");
    // if (isLoggedIn) {
    //   return <App Component={<Customers />} />;
    // } else
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
              <button
                disabled={username && password ? false : true}
                className="ui fluid large black submit button forgot"
                onClick={userLogin}
              >
                Login
              </button>
            </div>
          </form>

          {/* <div class="ui message">
          New to us? <Link to="/signup">Sign Up</Link>
        </div> */}

          {loginTry && !isLogIn
            ? loginMessagge(`${username} unauthorized`)
            : ""}
          <br />

          <button
            type="button"
            title="click here"
            disabled={username ? false : true}
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
          {forgotPasswordClicked && findUserName().then((t) => t)
            ? pinCodeInput()
            : ""}

          {username && forgotPasswordClicked && changePassErr
            ? loginMessagge(changePassErr)
            : ""}
        </div>
      </div>
    );
  };

  const CustomersPage = () => {
    return (
      <div className="ui">
        <Customers userName={username} />
      </div>
    );
  };

  const onUserNameChange = (e) => {
    setLoginTry(false);
    setUserName(e.target.value);
    setForgotPasswordClicked(false);
  };

  const onPasswordChange = (e) => {
    setLoginTry(false);
    setPaswword(e.target.value);
  };

  const forgotPasswordClick = async (e) => {
    e.preventDefault();
    setForgotPasswordClicked(true);

    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {
      console.log(err);
      setChangePassErr(err?.response?.data);
    });
    if (!res) return;

    const found = res?.data.find((element) => element.username === username);
    if (!found) return;
    setUserID(found.userID);
    url = `https://localhost:9000/users/${found.userID}/forgetPassword`;

    const res1 = await axios.post(url).catch((err) => {
      console.log(err);
      setChangePassErr(err?.response.data);
      return true;
    });
    return true;
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setLoginTry(true);

    // localStorage.setItem("isLoggedin", true);
    // setTimeout(() => {
    //   localStorage.setItem("isLoggedin", false);
    // }, 20000);

    const url = "https://localhost:9000/login/";

    try {
      const res = await axios
        .post(
          url,
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
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
        setLoginTry(true);
      }
    } catch (err) {
      console.log(err);
      setisLogIn(false);
    }
  };

  if (!isLogIn) {
    return loginPage();
  }
  return CustomersPage();
};

export default SignIn;
