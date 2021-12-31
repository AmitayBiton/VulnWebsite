import react, { useState } from "react";
import axios from "axios";
import Customers from "./Customers";
import SignIn from "./SignIn";
import App from "../App";
import { Link } from "react-router-dom";

function UserSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, setAddUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [signUpErr, setSignUpErr] = useState("");

  const addNewUserBtnClicked = async (e) => {
    setAddUser(true);
    setUserCreated(false);
    const url = "https://localhost:9000/register";

    const res = await axios
      .post(url, {
        lastName: lastName,
        firstName: firstName,
        emailAddress: mail,
        username: userName,
        password: password,
      })
      .catch((err) => {
        console.log(lastName, firstName, mail, userName, password);
        if (err.response.status !== 200) {
          setUserCreated(false);
          setSignUpErr(err.response.data);
          return;
        }
      });

    if (res && res.status === 200) {
      setAddUser(false);
      setUserCreated(true);
      // setFirstName("");
      // setLastName("");
      // setMail("");
      // setPhone("");
      // setPassword("");
      // setUserName("");
      setSignUpErr(`Success!
        <a className="active item" href="/">
          Home
        </a>
        `);
    }
  };
  if (!userCreated) {
    return (
      <div className="ui container segment">
        <form className="ui form">
          <h4 className="ui dividing header">User Sign Up</h4>

          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Contact</label>
            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Login Details</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            className="ui button"
            tabIndex="0"
            onClick={(e) => addNewUserBtnClicked(e)}
          >
            Sign Up
          </div>
        </form>
        <div
          className="ui error message"
          dangerouslySetInnerHTML={{ __html: signUpErr }}
        ></div>
      </div>
    );
  } else {
    setUserCreated(false);
    return (
      <div className="ui">
        <App />
      </div>
    );
  }
}

export default UserSignUp;
