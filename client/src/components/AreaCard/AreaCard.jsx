import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

import ClassroomLogo from "../../static/icons/classroom.svg";

import "./AreaCard.styles.scss";

const AreaCard = ({ name, areaCode }) => {
  const { path } = useRouteMatch();

  return (
    <Card className="area-card">
      <Link to={`${path}/area/${areaCode}`}>
        <Card.Body className="p-0">
          <div className="text-center">
            <Image src={ClassroomLogo} alt="logo" className="img-fluid" />
          </div>
          <div className="area-card--info border-top">
            <h5 className="mr-4">{name}</h5>
            <p>{areaCode}</p>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default AreaCard;
