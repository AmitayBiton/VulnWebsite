import Menu from "./components/Menu";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Plans from "./components/Plans";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Menu />
          <Plans />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
