import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import { Link } from "react-router-dom";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(async () => {
    const url = "https://localhost:9000/customers";
    const res = await axios(url);
    setCustomers(res.data);
  }, []);
  const addUser = () => {
    console.log("user");
  };

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

      <Link className="ui label large" to="/signup">
        <i className="user plus icon"></i>
        Add New Customer
      </Link>

      <div className="ui three column grid container">
        <br />
        <br />
        <br />

        <div className="column">{getAllCustomers}</div>
      </div>
    </div>
  );
};

export default Customers;
