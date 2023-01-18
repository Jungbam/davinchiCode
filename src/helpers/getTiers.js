export const getTier = (tier) => {
  switch (tier) {
    case "4":
      return <img alt="diamond" />;
    case "3":
      return <img alt="gold" />;
    case "2":
      return <img alt="silver" />;
    case "1":
      return <img alt="bronze" />;
    case "0":
      return <img alt="none" />;
    default:
      break;
  }
};
