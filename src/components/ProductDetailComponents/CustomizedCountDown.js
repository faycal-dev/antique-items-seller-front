import { SmallText } from "./ProductDetailsComponents";

export const CountDownRender = ({ days, hours, minutes, completed }) => {
  if (completed) {
    // Render a completed state
    return <SmallText>The auction is finished</SmallText>;
  } else {
    // Render a countdown
    return (
      <SmallText>
        {days} days {hours} hours {minutes} minutes
      </SmallText>
    );
  }
};
