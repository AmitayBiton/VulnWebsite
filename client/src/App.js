import Menu from "./components/Menu";
import SignIn from "./components/SignIn";

const App = ({ Component }) => {
  return (
    <div>
      <div>
        <Menu />
        {Component}
      </div>
    </div>
  );
};

export default App;
