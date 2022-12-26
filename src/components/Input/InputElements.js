import styled from "styled-components";
import colors from "../../constants/colors";

export const InputContainer = styled.div`
  height: 40px;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 5px 5px 5px ${colors.greyFade};
`;

export const CustumInput = styled.input`
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 100%;
  width: 100%;
  background-color: ${colors.white};
  padding-left: 1rem;

  &:active {
    outline: none;
    border: 1px solid ${colors.brown};
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.brown};
  }
`;

export const InputButton = styled.div`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 60px;
  height: 100%;
  background-color: ${colors.brown};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
