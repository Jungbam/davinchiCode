import React from "react";
import { ICON } from "../../../helpers/Icons";
const DavinchiCard = ({ card, onClick }) => {
  const cardName = card?.color + card?.value;
  return <img src={ICON[cardName]} alt="다빈치 코드" onClick={onClick} />;
};
DavinchiCard.defaultProps = {
  onClick: () => {},
};
export default DavinchiCard;
