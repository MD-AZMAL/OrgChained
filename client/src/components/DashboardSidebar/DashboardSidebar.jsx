import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import AddAreaForm from "../AddAreaForm/AddAreaForm";

import "./DashboardSidebar.styles.scss";

const DashboardSidebar = ({ currentUser }) => {
  return (
    <div id="dashboard-sidebar">
      <div className="text-center py-5">
        <h6 className="mb-0">Welcome</h6>
        <h5>{currentUser.name}</h5>
      </div>
      {currentUser.role === "Admin" && (
        <div className="sidebar-admin mb-5 py-2">
          <AddAreaForm />
          <Button as={Link} to="/dashboard/blockchain" variant="color-minor" block>
            View Blockchain
          </Button>
        </div>
      )}
      <div>
        <Button as={Link} to="/dashboard" variant="color-major" block>
          Areas
        </Button>
        <Button as={Link} to="/dashboard/transactions" variant="color-major" block>
          Transactions
        </Button>
        <Button as={Link} to="/dashboard/request" variant="color-major" block>
          Request Access
        </Button>
        <Button as={Link} to="/dashboard/transactions/request" variant="color-major" block>
          Incomming Request
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardSidebar);
