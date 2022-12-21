import styled from "styled-components";
import colors from "../../constants/colors";

export const HomeWrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
  padding: 2rem;
  background: radial-gradient(
    50.53% 50.53% at 75.23% 49.47%,
    ${colors.white} 0%,
    ${colors.silver} 100%
  );
`;