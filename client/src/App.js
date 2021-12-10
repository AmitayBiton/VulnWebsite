import Menu from "./components/Menu";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Menu />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
