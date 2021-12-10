import Menu from "./components/Menu";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Menu />
          <Route path="/signup" exact component={SignUp} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
