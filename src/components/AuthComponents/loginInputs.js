import styled from "styled-components";
import colors from "../../constants/colors";

export const LoginButton = styled.button`
  width: 100%;
  background-color: ${colors.brown};
  color: ${colors.white};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.brown};

  &:hover {
    transition: all 0.5s ease-in-out;
    transform: scale(1.05);
  }
`;

export const InputLabel = styled.strong`
  font-weight: 400;
  color: ${colors.greyDark};
`;

export const ShowPasswordComponent = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${colors.silver};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ fill }) => (fill == "false" ? colors.brown : colors.white)}; 
  cursor: pointer;
`;
