import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import DSMPage from "./pages/DSMPage/DSMPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Dashboard from "./pages/DashboardPage/DashboardPage";

// style
import "./App.scss";

const App = ({ currentUser }) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            currentUser ? <Redirect to="/dashboard" /> : <HomePage />
          }
        />
        <Route exact path="/dsm" component={DSMPage} />
        <Route
          
          path="/dashboard"
          render={() => (currentUser ? <Dashboard /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/register"
          render={() =>
            currentUser ? <Redirect to="/dashboard" /> : <RegisterPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
