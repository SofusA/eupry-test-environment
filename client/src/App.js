import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Location, Locations, Login, Profile} from "./components";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Locations />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/location" exact component={() => <Location />} />
          <Route path="/profile" exact component={() => <Profile />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
