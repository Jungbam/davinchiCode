import React from "react";
import { ICON } from "../../../helpers/Icons";
const DavinchiCard = ({ card, onClick, size }) => {
  const cardName = size + card?.color + card?.value;
  return (
    <img
      src={ICON[cardName]}
      alt="다빈치 코드"
      onClick={card.isOpen ? () => {} : onClick}
    />
  );
};
DavinchiCard.defaultProps = {
  onClick: () => {},
};
export default DavinchiCard;
