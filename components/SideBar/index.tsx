import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import Logo from "../icons/Logo";
import CollapsIcon from "../icons/CollapsIcon";
import { BiHomeSmile, BiBookAlt, BiStore } from "react-icons/bi";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Footer from "../Footer";
import Link from "next/link";

const defaultIconSize = "1.875rem";

const sidebarItems = [
  {
    id: 1,
    label: "Home",
    icon: BiHomeSmile,
    link: "/home",
  },
  {
    id: 5,
    label: "Dashboard",
    icon: BiBookAlt,
    link: "/profile",
  },
  {
    id: 2,
    label: "Books",
    icon: BiBookAlt,
    link: "/books",
  },
  {
    id: 3,
    label: "Project",
    icon: BiStore,
    link: "/projects",
  },
  {
    id: 4,
    label: "Blogs",
    icon: VscAccount,
    link: "/blog",
  },
];

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error logout", error);
  }
};

const SideBar = () => {
  const [toggleCollage, setToggleCollage] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const route = useRouter();
  const wrapperClasses = classNames(
    "md:h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col bg-black",
    {
      ["w-80"]: !toggleCollage,
      ["w-20"]: toggleCollage,
    }
  );
  const collapesIconClasses = classNames(
    "p-4 rounded-full bg-orange-500 absolute right-0",
    {
      "rotate-180": toggleCollage,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSideBarToggle = () => {
    setToggleCollage(!toggleCollage);
  };

  const activeMenu = useMemo(
    () => sidebarItems.find((menu) => menu.link === route.pathname),
    [route.pathname]
  );

  const getNavItemClassese = (menu: any) => {
    return classNames(
      `flex items-center cursor-pointer hover:bg-orange-600 mt-2 rounded-full w-full overflow-hidden whitespace-nowrap`,
      {
        ["bg-orange-600"]: activeMenu?.id === menu.id,
      },
      {
        ["rounded"]: toggleCollage,
      }
    );
  };
  const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 animate-bounce">
            {/* <Logo /> */}
            <GiFallingStar className="fill-orange-500 w-10 h-10" />
            <span
              className={classNames("text-xl font-medium text-white", {
                hidden: toggleCollage,
              })}
            >
              Josly
            </span>
          </div>
          <FiMenu
            className="cursor-pointer md:hidden"
            size={defaultIconSize}
            onClick={() => setIsNavMenuMobileOpen(!isNavMenuMobileOpen)}
          />
          {isCollapsible && (
            <button
              className={collapesIconClasses}
              onClick={handleSideBarToggle}
            >
              {" "}
              <CollapsIcon className="stroke-orange-600" />
            </button>
          )}
        </div>
        {/* Menu body */}
        <div className={`${isNavMenuMobileOpen ? "" : "hidden"} md:block`}>
          <div className={`flex flex-col items-start mt-24`}>
            {sidebarItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClassese(menu);
              return (
                <div className={classes} key={1}>
                  <Link legacyBehavior href={menu?.link}>
                    <a className="flex py-4 px-3 items-center w-full h-full">
                      <div style={{ width: "2.5rm" }}>
                        <Icon
                          size={defaultIconSize}
                          className="mr-4 fill-orange-500 hover:stroke-white"
                        />
                      </div>
                      {!toggleCollage && (
                        <span className="text-white">{menu.label}</span>
                      )}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
