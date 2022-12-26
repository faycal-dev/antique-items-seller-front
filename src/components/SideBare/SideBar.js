import React from "react";
import Link from "next/link";
import {
  Icon,
  SideBareContainer,
  SideBarLink,
  SideBareWrapper,
  SideBarMenu,
  SideBarRoute,
  SideBtnWrap,
} from "./SideBareElements";
import { useRouter } from "next/router";
import { XCircle, ShoppingBag, User } from "react-feather";
import { logoutHandler } from "../../utils/logoutHandler";

const SideBar = ({ isOpen, toggle }) => {
  const router = useRouter();

  return (
    <SideBareContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <XCircle color="white" onClick={toggle} />
      </Icon>
      <SideBareWrapper>
        <SideBarMenu>
          <Link className="text-decoration-none" href="/home">
            <SideBarLink isActive={router.pathname === "/home"}>
              <ShoppingBag size={20} style={{ marginRight: 5 }} /> Shop
            </SideBarLink>
          </Link>
          <Link className="text-decoration-none" href="/profile">
            <SideBarLink isActive={router.pathname === "/profile"}>
              <User size={20} style={{ marginRight: 5 }} /> Profile
            </SideBarLink>
          </Link>
        </SideBarMenu>
        <SideBtnWrap>
          <SideBarRoute onClick={() => logoutHandler(router)}>
            Log out
          </SideBarRoute>
        </SideBtnWrap>
      </SideBareWrapper>
    </SideBareContainer>
  );
};

export default SideBar;
