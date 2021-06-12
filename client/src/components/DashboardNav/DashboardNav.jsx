import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setCurrentAreaNull,
  setCurrentAreasNull,
} from "../../redux/area/area.actions";
import { setCurrentUserNull } from "../../redux/user/user.actions";

const DashboardNav = ({
  setCurrentUserNull,
  setCurrentAreasNull,
  setCurrentAreaNull,
}) => {
  const logout = () => {
    setCurrentUserNull();
    setCurrentAreaNull();
    setCurrentAreasNull();
  };

  return (
    <Navbar bg="light" variant="light" className="shadow" sticky="top">
      <Navbar.Brand className="mr-auto">
        OrgChained
      </Navbar.Brand>

      <Nav>
        <Button variant="color-accent" onClick={logout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserNull: () => dispatch(setCurrentUserNull()),
  setCurrentAreasNull: () => dispatch(setCurrentAreasNull()),
  setCurrentAreaNull: () => dispatch(setCurrentAreaNull()),
});

export default connect(null, mapDispatchToProps)(DashboardNav);
