import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";
import { createStructuredSelector } from "reselect";
import { getAreaApi, getTransactionsByAreaApi } from "../../api/apicall";
import { setCurrentArea } from "../../redux/area/area.actions";
import { selectCurrentArea } from "../../redux/area/area.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import AddAdminForm from "../AddAdminForm/AddAdminForm";
import NotFound from "../NotFound/NotFound";
import TransactionCard from "../TransactionCard/TransactionCard";

import "./DashboardArea.styles.scss";

const DashboardArea = ({ currentArea, currentUser, setCurrentArea }) => {
  const { params } = useRouteMatch();
  const [transactions, setTransactions] = useState(null);

  const refresh = async () => {
    const [error, result] = await getTransactionsByAreaApi(currentArea._id,currentUser.token);

    if (error) {
      console.log(error);
    } else {
      console.log(result.content.transactions);
      setTransactions(result.content.transactions);
    }
  };

  useEffect(() => {
    const getTransactionsByAreaFromApi = async () => {
      const [error, result] = await getTransactionsByAreaApi(
        currentArea._id,
        currentUser.token
      );

      console.log( error?.response?.data);
      if (error) {
        console.log(error);
      } else {
        console.log(result.content.transactions);
        setTransactions(result.content.transactions);
      }
    };

   currentArea && getTransactionsByAreaFromApi();
  }, [currentUser, setTransactions, currentArea]);

  useEffect(() => {
    const getAreaFromApi = async () => {
      const [error, result] = await getAreaApi(
        currentUser.token,
        params.areaCode
      );

      if (error) {
        console.log(error);
      } else {
        setCurrentArea(result.content.area);
      }
    };

    getAreaFromApi();
  }, [currentUser, params, setCurrentArea]);

  const { name, areaCode, areaAdmins } = currentArea ? currentArea : {};

  return (
    <div className="area-page">
      <div className="area-page--header">
        <h2>{name}</h2>
        <p>Area Code : {areaCode}</p>
      </div>
      <div className="area-page--wrapper">
        <div className="area-page--transaction">
          <div>
            {transactions && transactions.length !== 0 ? (
              <div>
                <h2 className="mb-4">All Transactions</h2>
                {transactions.map((transaction) => (
                  <TransactionCard
                    refresh={refresh}
                    {...transaction}
                    key={transaction._id}
                  />
                ))}
              </div>
            ) : (
              <NotFound message="No transactions available for approval" />
            )}
          </div>
        </div>
        <div className="area-page--admins shadow">
          <Navbar
            bg="color-gray"
            sticky="top"
            className="align-items-baseline border-bottom"
          >
            <Nav>
              <p>Area Admins</p>
            </Nav>

            {currentUser.role === "Admin" && (
              <Nav className="ml-auto">
                <AddAdminForm />
              </Nav>
            )}
          </Navbar>
          {areaAdmins && areaAdmins.length !== 0 ? (
            areaAdmins.map(({ firstName, lastName, email, idNo }) => (
              <div className="area-page--admins-name" key={idNo}>
                <div className="d-flex align-items-baseline">
                  <p>{`${firstName} ${lastName}`}</p>
                  <p>{idNo}</p>
                </div>
                <p>{email}</p>
              </div>
            ))
          ) : (
            <div className="text-center pt-2">
              <p className="text-color-accent">No admins</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentArea: selectCurrentArea,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentArea: (area) => dispatch(setCurrentArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardArea);
