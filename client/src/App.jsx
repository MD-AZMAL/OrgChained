import React from "react";
import { Route, Switch } from "react-router";
import DSMPage from "./pages/DSMPage/DSMPage";

// style
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dsm" component={DSMPage} />
      </Switch>
    </div>
  );
};

export default App;
