import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerSignUp from "./components/CustomerSignUp";
import UserSignUp from "./components/UserSignUp";
import SignIn from "./components/SignIn";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/customersignup"
          element={<App Component={<CustomerSignUp />} />}
        ></Route>
        <Route
          path="/usersignup"
          element={<App Component={<UserSignUp />} />}
        ></Route>
        <Route path="/" element={<App Component={<SignIn />} />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
