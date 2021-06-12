import React from "react";
import { Badge, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { endTransaction } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./TransactionCard.styles.scss";

const TransactionCard = ({
  currentUser,
  _id,
  startTime,
  endTime,
  status,
  areaAdmins,
  area,
  requestedBy,
  approvedBy,
  admin,
  refresh,
  classes
}) => {
  const endCurrentTransaction = async (status) => {
    const [error, result] = await endTransaction(
      _id,
      requestedBy.pubKey,
      status,
      currentUser.token
    );

    if (error) {
      console.log(error);
      console.log(error?.response?.data?.content);
    }

    console.log(result);

    refresh();
  };

  const approve = () => endCurrentTransaction("Approved");
  const decline = () => endCurrentTransaction("Rejected");

  const getStatus = () => {
    switch (status) {
      case "Approved":
        return (
          <Badge variant="color-success" className="ml-3">
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge variant="color-accent" className="ml-3">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="color-minor" className="ml-3">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div
      className={`transaction-card shadow ${
        status === "Pending" ? "bg-color-minor-light" : ""
      } ${status === "Rejected" ? "bg-color-accent-light" : ""} ${
        status === "Approved" ? "bg-color-success-light" : ""
      } ${classes}`}
    >
      <div className="transaction-card--container">
        <div className="transaction-card--left">
          <h4 className="mb-0">{area.name}</h4>
          <div className="d-flex align-items-center mb-1">
            <p className="text-color-success mb-0">{area.areaCode}</p>
            {getStatus()}
          </div>
          <p>Transaction ID: {_id}</p>
          <p className="text-secondary">
            {new Date(startTime).toLocaleString()} -{" "}
            {new Date(endTime).toLocaleString()}
          </p>
        </div>
        <div className="transaction-card--right">
          <div className="transaction-card--user">
            <p>Requested By: </p>
            <div className="d-flex align-items-baseline">
              <p className="transaction-card--user-name">{requestedBy.name}</p>
              <p className="ml-auto text-secondary">{requestedBy.idNo}</p>
            </div>
          </div>
          {approvedBy && (
            <>
              <hr />
              <div className="transaction-card--user">
                <p>{status} By: </p>
                <div className="d-flex align-items-baseline">
                  <p className="transaction-card--user-name">
                    {approvedBy.name}
                  </p>
                  <p className="ml-auto text-secondary">{approvedBy.idNo}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {status === "Pending" && admin && (
        <div className="d-flex justify-content-center">
          <Button variant="color-accent mr-3" onClick={decline}>
            Decline
          </Button>
          <Button variant="color-success " onClick={approve}>
            Approve
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(TransactionCard);
