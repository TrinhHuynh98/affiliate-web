import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";

const Layout = ({ children }: any) => {
  return (
    <div className="">
      {/* <SideBar /> */}
      <Header />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;
