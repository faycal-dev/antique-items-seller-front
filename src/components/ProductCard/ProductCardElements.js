import styled from "styled-components";
import colors from "../../constants/colors";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background: ${colors.white};
  cursor: pointer;
  /* box-shadow: 5px 5px 5px ${colors.greyFade}; */

  &:hover {
    transition: 0.5s all ease-in-out;
    transform: translateY(-5px);
    box-shadow: 5px 15px 20px ${colors.silver};
  }
`;

export const CardPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;
`;

export const PriceText = styled.p`
  color: ${colors.brown};
  font-size: 1.05rem;
  font-weight: 700;
`;

export const RatingText = styled.p`
  color: ${colors.dark};
  font-size: 1.05rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  /* margin-top: 2rem; */
`;

export const CardStatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
`;


export const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${colors.white};
  background-color: ${colors.brown};
  width: 100%;
  height: 100%;
  border-width: 0;
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

export const LinkText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 12px;
`;
