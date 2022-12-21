import styled from "styled-components";
import colors from "../../constants/colors";

export const NavButton = styled.div`
  width: 100px;
  background-color: ${({ fill }) => (fill ? colors.brown : "transparent")};
  border: ${({ fill }) => (fill ? "none" : `1px solid ${colors.brown}`)};
  color: ${({ fill }) => (fill ? colors.white : colors.brown)};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transition: all 0.5s ease-in-out;
    opacity: 0.8;
    background-color: ${colors.brown};
    color: ${colors.white};
    transform: scale(1.05);
  }
`;

export const PageButton = styled.div`
  max-width: fit-content;
  background-color: "transparent";
  border: 1px solid ${colors.brown};
  color: ${colors.brown};
  cursor: pointer;
  padding-right: 20px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 2rem;

  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
  }
`;
