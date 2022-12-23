import styled from "styled-components";
import colors from "../../constants/colors";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background: ${colors.white};
  box-shadow: 1px 3px 5px ${colors.greyFade2};

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  border-radius: 5px;
`;

export const NavLogo = styled.a`
  justify-self: flex-start;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 25px;
  font-weight: bold;
  text-decoration: none;
  color: ${colors.brown};

  &:hover {
    transition: 0.5s all ease-in-out;
    transform: scale(1.05);
    color: ${colors.brown};
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 25%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${colors.dark};
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-top: 15px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 65px;
  align-items: center;
  display: flex;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  min-height: 65px;
  font-weight: 600;
  padding-bottom: 0.3rem;
  justify-content: flex-end;
  flex-direction: column;
  cursor: pointer;
  border-bottom: ${({ isActive }) =>
    isActive ? `3px solid ${colors.brown}` : ""};
  color: ${({ isActive }) => (isActive ? colors.brown : colors.dark)};

  &:hover {
    transition: 0.1s all ease-in-out;
    color: ${colors.brown};
    transform: scale(1.05);
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const NavBtnLink = styled.a`
  border-radius: 5px;
  background: ${colors.danger};
  white-space: nowrap;
  padding: 6px 13px;
  color: ${colors.white};
  border: 2px solid ${colors.danger};

  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${colors.danger};
    background: ${colors.white};
  }
`;
