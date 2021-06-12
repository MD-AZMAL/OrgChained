import React from "react";
import { Image } from "react-bootstrap";
import DownArrow from '../../static/icons/down-arrow.svg';
import TransactionCard from "../TransactionCard/TransactionCard";

import "./BlockCard.styles.scss";

const BlockCard = ({ prevHash, transaction, currentHash }) => {
  return (
    <div className="mb-3">
      <div className="block-card shadow">
        <div className="block-card--hash block-card--hash-prev text-center p-2">
          <h6>Prev Hash</h6>
          <p>{prevHash}</p>
        </div>
        {!transaction ? (
          <div className="block-card--genesis">
            <h2>Genesis Block</h2>
          </div>
        ) : (
          <div>
            <TransactionCard
              {...transaction}
              classes={"mb-0 shadow-none rounded-none"}
            />
          </div>
        )}
        <div className="block-card--hash block-card--hash-curr text-center p-2">
          <h6>Current Hash</h6>
          <p>{currentHash}</p>
        </div>
      </div>
      <div className="text-center">
            <Image src={DownArrow} className="img-fluid" width={50} />
      </div>
    </div>
  );
};

export default BlockCard;
