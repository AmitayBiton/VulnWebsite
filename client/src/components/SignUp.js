import react, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const addNewUserBtnClicked = async (e) => {
    const url = "https://localhost:9000/customers/";

    const res = await axios.post(url, {
      lastName: lastName,
      firstName: firstName,
      emailAddress: mail,
      phoneNumber: phone,
    });
    setFirstName("");
    setLastName("");
    setMail("");
    setPhone("");
  };

  return (
    <div className="ui container segment">
      <form className="ui form">
        <h4 className="ui dividing header">Sign Up</h4>

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
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
    </div>
  );
}

export default SignUp;
