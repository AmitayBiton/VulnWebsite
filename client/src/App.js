import Menu from "./components/Menu";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Main from "./components/Main";

const App = () => {
  return (
    <div>
      <div>
        <Menu />
        <SignIn />
      </div>
    </div>
  );
};

export default App;
