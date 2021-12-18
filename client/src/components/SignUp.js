import react from "react";

function SignUp() {
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
                name="shipping[first-name]"
                placeholder="First Name"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="shipping[last-name]"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <div className="fields">
            <div className="sixteen wide field">
              <input type="text" name="shipping[address]" placeholder="Email" />
            </div>
          </div>
        </div>

        <div className="field">
          <label>Password</label>
          <div className="fields">
            <div className="eight wide field">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Password"
              />
            </div>

            <div className="eight wide field">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Enter the password again"
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label>Billing Address</label>
          <div className="fields">
            <div className="twelve wide field">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Street Address"
              />
            </div>
            <div className="four wide field">
              <input
                type="text"
                name="shipping[address-2]"
                placeholder="Apt #"
              />
            </div>
          </div>
        </div>

        <div className="two fields">
          <div className="field">
            <label>City</label>
            <select className="ui fluid dropdown">
              <option value="AL">Tel Aviv</option>
              <option value="PT">Petah Tikva</option>
              <option value="RG">Ramat Gan</option>
              <option value="GT">Givatayim</option>
            </select>
          </div>
        </div>
        <h4 className="ui dividing header">Billing Information</h4>
        <div className="field">
          <label>Card Type</label>
          <div className="ui selection dropdown">
            <input type="hidden" name="card[type]" />
            <div className="default text">Type</div>
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item" data-value="visa">
                <i className="visa icon"></i>
                Visa
              </div>
              <div className="item" data-value="amex">
                <i className="amex icon"></i>
                American Express
              </div>
              <div className="item" data-value="discover">
                <i className="discover icon"></i>
                Discover
              </div>
            </div>
          </div>
        </div>
        <div className="fields">
          <div className="seven wide field">
            <label>Card Number</label>
            <input
              type="text"
              name="card[number]"
              maxLength="16"
              placeholder="Card #"
            />
          </div>
          <div className="three wide field">
            <label>CVC</label>
            <input
              type="text"
              name="card[cvc]"
              maxLength="3"
              placeholder="CVC"
            />
          </div>
          <div className="six wide field">
            <label>Expiration</label>
            <div className="two fields">
              <div className="field">
                <select
                  className="ui fluid search dropdown"
                  name="card[expire-month]"
                >
                  <option value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="field">
                <input
                  type="text"
                  name="card[expire-year]"
                  maxLength="4"
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ui button" tabIndex="0">
          Sign Up
        </div>
      </form>
    </div>
  );
}

export default SignUp;
