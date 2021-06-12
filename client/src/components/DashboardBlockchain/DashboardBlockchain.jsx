import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getBlockchainApi } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import BlockCard from "../BlockCard/BlockCard";
import NotFound from "../NotFound/NotFound";

const DashboardBlockchain = ({ currentUser }) => {
  const [blockchain, setBlockchain] = useState(null);

  useEffect(() => {
    const getBlockchainFromApi = async () => {
      const [error, result] = await getBlockchainApi(currentUser.token);

      if (error) {
        console.log(error);
        console.log(error?.response?.data);
      } else {
        console.log(result.content.blockchain);
        setBlockchain(result.content.blockchain);
      }
    };

    getBlockchainFromApi();
  }, [currentUser, setBlockchain]);

  return (
    <div>
      {blockchain && blockchain.length !== 0 ? (
        <div>
          <h2>Blockchain</h2>

          {blockchain.map((block) => (
            <BlockCard {...block} key={block.currentHash} />
          ))}
        </div>
      ) : (
        <NotFound message="Blockchain is empty" />
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardBlockchain);
