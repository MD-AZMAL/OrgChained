import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import DashboardArea from "../../components/DashboardArea/DashboardArea";
import DashboardAreas from "../../components/DashboardAreas/DashboardAreas";
import DashboardBlockchain from "../../components/DashboardBlockchain/DashboardBlockchain";
import DashboardIncommigRequest from "../../components/DashboardIncommigRequest/DashboardIncommigRequest";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import DashboardRequest from "../../components/DashboardRequest/DashboardRequest";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import DashboardTransaction from "../../components/DashboardTransaction/DashboardTransaction";

import "./DashboardPage.styles.scss";

const DashboardPage = () => {
  const {path} = useRouteMatch();

  return (
    <div id="dashboard">
      <DashboardSidebar />
      <div id="dashboard-main">
        <DashboardNav />
        <div id="dashboard-content">
          <Switch>
            <Route exact path={path} component={DashboardAreas} />
            <Route exact path={`${path}/area/:areaCode`} component={DashboardArea} />
            <Route exact path={`${path}/blockchain`} component={DashboardBlockchain} />
            <Route exact path={`${path}/request`} component={DashboardRequest} />
            <Route exact path={`${path}/transactions`} component={DashboardTransaction} />
            <Route exact path={`${path}/transactions/request`} component={DashboardIncommigRequest} />

          </Switch>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
