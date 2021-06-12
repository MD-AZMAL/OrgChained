import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getTransactionsApi } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import NotFound from "../NotFound/NotFound";
import TransactionCard from "../TransactionCard/TransactionCard";

const DashboardTransaction = ({ currentUser }) => {
  const [transactions, setTransactions] = useState(null);

  const refresh = async () => {
    const [error, result] = await getTransactionsApi(currentUser.token);

    if (error) {
      console.log(error);
    } else {
      console.log(result.content.transactions);
      setTransactions(result.content.transactions);
    }
  };

  useEffect(() => {
    const getTransactionsFromApi = async () => {
      const [error, result] = await getTransactionsApi(currentUser.token);

      if (error) {
        console.log(error);
      } else {
        console.log(result.content.transactions);
        setTransactions(result.content.transactions);
      }
    };

    getTransactionsFromApi();
  }, [currentUser, setTransactions]);

  console.log(transactions);

  return (
    <div>
      {transactions && transactions.length !== 0 ? (
        <div>
          <h2 className="mb-4">All Transactions</h2>
          {transactions.map((transaction) => (
            <TransactionCard refresh={refresh} {...transaction} key={transaction._id} />
          ))}
        </div>
      ) : (
        <NotFound message="No transactions to display" />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardTransaction);
