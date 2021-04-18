import React from "react";
import { Route, Switch } from "react-router";
import DSMPage from "./pages/DSMPage/DSMPage";

// style
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dsm" component={DSMPage} />
        <Route exact path="/register" component={RegisterPage} />

      </Switch>
    </div>
  );
};

export default App;
