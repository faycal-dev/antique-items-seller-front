import styled from "styled-components";
import colors from "../../constants/colors";

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.greyFade2};
  width: 100%;
  height: 90vh;
  padding: 1rem;
  padding-top: 2rem;
  margin-top: 5vh;
  margin-bottom: 5vh;
  border-radius: 1rem;
`;

export const LoginTextHeader = styled.h3`
    color: ${colors.brown};
    font-weight: bolder;
`;

export const LoginTextSecondHeader = styled.p`
    color: ${colors.brown};
    font-weight: 600;
    font-size: 18;
    text-align: center;
`;

