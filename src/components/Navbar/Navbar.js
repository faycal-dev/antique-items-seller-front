import { List, ShoppingBag, User } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Nav,
  NavLogo,
  NavbarContainer,
  MobileIcon,
  NavItem,
  NavLinks,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { logoutHandler } from "../../utils/logoutHandler";

const Navbar = ({ toggle }) => {
  const router = useRouter();

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo
            onClick={() => {
              router.push("/");
            }}
          >
            Antique
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <List size={28} />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <Link className="text-decoration-none" href="/home">
                <NavLinks isActive={router.pathname === "/home"}>
                  <ShoppingBag size={20} style={{ marginRight: 5 }} />
                  Shop
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="text-decoration-none" href="/profile">
                <NavLinks isActive={router.pathname === "/profile"}>
                  <User size={20} style={{ marginRight: 5 }} />
                  Profile
                </NavLinks>
              </Link>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={() => logoutHandler(router)}>
              Logout
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};

export default Navbar;
