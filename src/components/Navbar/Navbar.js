import {
  List,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Clock,
  User,
} from "react-feather";
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

const Navbar = ({ toggle }) => {
  const router = useRouter();

  const logoutHandler = () => {
    // if (dispatch && dispatch !== null && dispatch !== undefined)
    //   dispatch(logout());
  };

  const loginHandler = () => {
    router.push("/auth/login");
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Nav>
        <NavbarContainer>
          <Link href="/">
            <NavLogo>Antique</NavLogo>
          </Link>
          <MobileIcon onClick={toggle}>
            <List size={28} />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <Link href="/products">
                <NavLinks isActive={router.pathname === "/products"}>
                  <ShoppingBag size={20} style={{ marginRight: 5 }} />
                  Shop
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/wishlist">
                <NavLinks isActive={router.pathname === "/wishlist"}>
                  <Heart size={20} style={{ marginRight: 5 }} /> WishList
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/cart">
                <NavLinks isActive={router.pathname === "/cart"}>
                  <ShoppingCart size={20} style={{ marginRight: 5 }} /> Cart
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/orders">
                <NavLinks isActive={router.pathname === "/orders"}>
                  <Clock size={20} style={{ marginRight: 5 }} /> Orders
                </NavLinks>
              </Link>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink loggedIn={isAuthenticated} onClick={logoutHandler}>
              Logout
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};

export default Navbar;
