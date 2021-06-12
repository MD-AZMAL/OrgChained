import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAreasApi } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import NotFound from "../NotFound/NotFound";
import RequestAreaTableData from "../RequestAreaTableData/RequestAreaTableData";

import "./DashboardRequest.styles.scss";

const DashboardRequest = ({ currentUser }) => {
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const getAreasFromApi = async () => {
      const [error, result] = await getAreasApi(currentUser.token, true);

      if (error) {
        console.log(error);
      } else {
        
        setAreas(result.content.areas);
      }
    };

    getAreasFromApi();
  }, [currentUser]);

  return (
    <div>
      {areas && areas.length !== 0 ? (
        <div className="area-table">
            <h2>All Areas</h2>
          <Table bordered>
            <tbody>
              {areas.map(({ name, areaCode }) => (
                <RequestAreaTableData
                  key={areaCode}
                  name={name}
                  areaCode={areaCode}
                />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NotFound message="No areas found to request" />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardRequest);
