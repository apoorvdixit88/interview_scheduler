import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navBar/navbar";
import CreateInterview from "./components/createInterview/createInterview";
import ViewInterview from "./components/viewInterview/viewInterview";
import UpdateInterview from "./components/updateInterview/updateInterview";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ViewInterview}></Route>
          <Route path="/create" component={CreateInterview}></Route>
          <Route path="/update" component={UpdateInterview}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
