import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import { Link } from "react-router-dom";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [changePassErr, setChangePassErr] = useState("");
  const [isLogIn, setisLogIn] = useState(false);
  const [loginTry, setLoginTry] = useState(false);
  const [pinCode, setPinCode] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    setChangePasswordClicked(true);

    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {
      console.log(err);
      setChangePassErr(err?.response?.data);
    });
    if (!res) return;

    const found = res?.data.find((element) => element.username === username);
    if (!found) return;
    setUserID(found.userID);
    url = `https://localhost:9000/users/${found.userID}/changePassword`;

    const res1 = await axios
      .post(url, {
        oldPassword: oldPassword,
        password: password,
      })
      .catch((err) => {
        console.log(err);
        setChangePassErr(err?.response.data);
        return true;
      });
    return true;
  };

  const pinCodeInput = () => {
    return (
      <form class="ui fluid form">
        <br />
        <br />
        <div class="field" placeholder="Last Name">
          {/* <div class="ui pointing below label">
            If the user name exist, A pin code sent to your mail, please enter
            it and a new password below
          </div> */}
          <div
            class="ui input focus"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          >
            <input type="text" placeholder="Old Password" />
          </div>
          <br />
          <br />
          <div
            class="ui input focus"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          >
            <input type="text" placeholder="New Password" type="password" />
          </div>
          <div>
            <br />
          </div>

          <button class="ui icon button" onClick={(e) => changePassword(e)}>
            Send
          </button>
        </div>
      </form>
    );
  };

  useEffect(async () => {
    const url = "https://localhost:9000/customers";
    const res = await axios(url);
    setCustomers(res.data);
  }, []);

  const getAllCustomers = customers?.map((el, index) => {
    return (
      <Customer
        firstName={el.firstName}
        lastName={el.lastName}
        emailAddress={el.emailAddress}
        phoneNumber={el.phoneNumber}
        customerID={el.customerID}
        key={el.customerID}
      />
    );
  });

  return (
    <div className="ui container">
      <h1 className="ui header">Customers</h1>

      <div className="ui grid">{getAllCustomers}</div>

      <div>
        <br />
        <Link className="ui label large" to="/customersignup">
          <i className="user plus icon"></i>
          Add New Customer
        </Link>
        <a className="ui label large right" href="/">
          <i className="sign out alternate icon"></i>
          Sign Out
        </a>
        <button
          className="ui button small "
          onClick={() => setChangePasswordClicked(true)}
        >
          <i className="user plus icon"></i>
          Change Password
        </button>
      </div>
      {changePasswordClicked ? pinCodeInput() : ""}
      <div></div>
    </div>
  );
};

export default Customers;
