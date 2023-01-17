export const getTier = (tier) => {
  switch (tier) {
    case "diamond":
      return <img alt="diamond" />;
    case "gold":
      return <img alt="gold" />;
    case "silver":
      return <img alt="silver" />;
    case "bronze":
      return <img alt="bronze" />;
    default:
      break;
  }
};
