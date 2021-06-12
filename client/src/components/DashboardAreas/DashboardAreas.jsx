import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAreasApi } from "../../api/apicall";
import { setCurrentAreas } from "../../redux/area/area.actions";
import { selectCurrentAreas } from "../../redux/area/area.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import AreaCard from "../AreaCard/AreaCard";
import NotFound from "../NotFound/NotFound";

const DashboardAreas = ({ currentUser, currentAreas, setCurrentAreas }) => {
  useEffect(() => {
    const getAreasFromApi = async () => {
      const [error, result] = await getAreasApi(currentUser.token);

      if (error) {
        console.log(error);
      } else {
        setCurrentAreas(result.content.areas);
      }
    };

    getAreasFromApi();
  }, [currentUser, setCurrentAreas]);

  console.log(currentAreas);

  return (
    <Container>
      <Row>
        {currentAreas && currentAreas.length !== 0 ? (
          currentAreas.map(({ name, areaCode }) => (
            <Col
              sm="4"
              key={`areas-${areaCode}`}
              className="d-flex align-items-stretch mb-4"
            >
              <AreaCard name={name} areaCode={areaCode} />
            </Col>
          ))
        ) : (
          <NotFound message="No areas with admin access" />
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentAreas: selectCurrentAreas,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentAreas: (areas) => dispatch(setCurrentAreas(areas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAreas);
