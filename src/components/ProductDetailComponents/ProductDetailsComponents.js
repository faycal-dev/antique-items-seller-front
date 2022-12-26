import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import colors from "../../constants/colors";

export const ImageContainer = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? colors.greyFade2 : "transparent"};
`;

export const AutoBidButton = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.white};
  color: ${colors.greyDark};
  border: 1px solid ${colors.greyDark};

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.05);
    background-color: ${colors.greyFade2};
  }
`;

export const BidButton = styled.div`
  margin-right: 1rem;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.brown};
  color: ${colors.white};

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.05);
  }
`;

export const Wrraper = styled(Row)`
  background-color: ${colors.white};
  width: 100%;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 1px ${colors.greyFade};
  margin-top: 2rem;
`;

export const PriceText = styled.p`
  font-size: 20px;
  color: ${colors.brown};
  font-weight: 500;
  margin-right: 2rem;
`;

export const SmallImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${colors.greyFade};
  border-bottom: 1px solid ${colors.greyFade};
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const SpecificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.greyFade};
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
`;

export const SmallText = styled.small`
  color: ${colors.brown};
  font-weight: 600;
  margin-left: 0.5rem;
  margin-right: 2rem;
`;
