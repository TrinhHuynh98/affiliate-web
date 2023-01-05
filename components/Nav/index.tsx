import React, { useState } from "react";
import { BiHome, BiBookAlt } from "react-icons/bi";
import { FiInstagram, FiMenu, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import NavItem from "./NavItem";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Link from "next/link";

const defaultIconSize = "1.875rem";

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error logout", error);
  }
};

const items = [
  {
    label: "Home",
    icon: (
      <>
        <Link href="/">
          <BiHome size={defaultIconSize} />
        </Link>
      </>
    ),
    active: true,
  },
  {
    label: "Books",
    icon: <BiBookAlt size={defaultIconSize} />,
  },
  {
    label: "Connect",
    icon: (
      <>
        <Link href="https://www.instagram.com/joslies98/">
          <FiInstagram size={defaultIconSize} />
        </Link>
      </>
    ),
  },
  {
    label: "Profile",
    icon: (
      <Link href="/profile">
        <CgProfile size={defaultIconSize} />
      </Link>
    ),
  },
  {
    label: "Logout",
    icon: <FiLogOut size={defaultIconSize} onClick={logout} />,
  },
];

const NavItemsContainer = () => (
  <>
    {items.map((item, index) => (
      <NavItem item={item} key={index} />
    ))}
  </>
);

const Nav = () => {
  const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);
  return (
    <nav className="col-span-1 bg-[#F9F9F9] h-screen">
      <div className="flex mx-4 justify-between items-center md:block">
        <h4 className="uppercase font-bold text-primary py-4 border-b border-primary text-right">
          Josly
        </h4>
        <FiMenu
          className="cursor-pointer md:hidden"
          size={defaultIconSize}
          onClick={() => setIsNavMenuMobileOpen(!isNavMenuMobileOpen)}
        />
      </div>
      <ul
        className={`mx-4 my-2 ${isNavMenuMobileOpen ? "" : "hidden"} md:block`}
      >
        <NavItemsContainer />
      </ul>
    </nav>
  );
};

export default Nav;
