import React, { useMemo, useState } from "react";
import CollapsIcon from "../icons/CollapsIcon";
import { BiHomeSmile, BiBookAlt, BiStore } from "react-icons/bi";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const defaultIconSize = "1.875rem";

const sidebarItems = [
  {
    id: 1,
    label: "Home",
    icon: BiHomeSmile,
    link: "#home",
  },
  {
    id: 2,
    label: "Books",
    icon: BiBookAlt,
    link: "#book",
  },
  {
    id: 3,
    label: "Themes",
    icon: BiStore,
    link: "#projects",
  },
  {
    id: 4,
    label: "Connect",
    icon: BsInstagram,
    link: "#connect",
  },
  {
    id: 5,
    label: "Profile",
    icon: VscAccount,
    link: "profile",
  },
];

const Header = () => {
  const route = useRouter();
  const [loggedInuser, loading, _error] = useAuthState(auth);
  const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);

  const activeMenu = useMemo(
    () => sidebarItems.find((menu) => menu.link === route.pathname),
    [route.pathname]
  );

  const getNavItemClassese = (menu: any) => {
    return classNames(
      ` cursor-pointer hover:bg-[#FFB26B] mt-2 px-1 rounded-md`,
      {
        ["border-b-2 border-[#FFB26B] rounded-md rounded-b-none"]:
          activeMenu?.id === menu.id,
      }
    );
  };

  const router = useRouter();
  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/home");
    } catch (error) {
      console.log("error logout", error);
    }
  };

  console.log("isNavMenuMobileOpen", isNavMenuMobileOpen);
  return (
    <header className="border-b border-gray-50 py-2">
      <div className="flex text-[#181D31] items-center justify-between md:max-w-full md:mx-auto py-2 px-[8%] flex-wrap w-full">
        <div className="flex ">
          <GiFallingStar size={defaultIconSize} className="animate-bounce" />
          <span className="ml-3 hover:text-[#181D31] font-bold">JOSLY</span>
        </div>

        <FiMenu
          aria-controls="mobile-menu"
          className="md:hidden block cursor-pointer"
          size={defaultIconSize}
          onClick={() => setIsNavMenuMobileOpen(!isNavMenuMobileOpen)}
        />
        <nav
          className={`${
            isNavMenuMobileOpen ? "block" : "hidden"
          } w-full md:flex items-center md:w-auto`}
        >
          {/* <div className="flex items-center justify-center gap-2 md:gap-8"> */}
          {sidebarItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClassese(menu);
            return (
              <div className={classes} key={1}>
                <Link legacyBehavior href={menu?.link}>
                  <a className="md:flex px-3 py-2 items-center w-full h-full text-[#181D31] hover:text-white ">
                    <span>{menu.label}</span>
                  </a>
                </Link>
              </div>
            );
          })}
          {loggedInuser && (
            <button
              className="rounded-md bg-[#FFB26B] text-white hover:bg-orange-500 mt-2 px-3 py-2 center ml-3"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
