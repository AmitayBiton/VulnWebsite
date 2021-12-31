import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerSignUp from "./components/CustomerSignUp";
import UserSignUp from "./components/UserSignUp";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/customersignup" element={<CustomerSignUp />}></Route>
        <Route path="/usersignup" element={<UserSignUp />}></Route>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
