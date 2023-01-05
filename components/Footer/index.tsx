import Link from "next/link";
import React from "react";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import NewLetter from "../_child/newletter";

const defaultIconSize = "1.875rem";

const socialMedia = [
  { icon: BsFacebook, link: "/" },
  { icon: BsInstagram, link: "/" },
  { icon: BsLinkedin, link: "/" },
];

const Footer = () => {
  return (
    <div className="bg-gray-50 mt-20">
      {<NewLetter />}

      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            {socialMedia.map(({ icon: Icon, ...menu }, index) => {
              return (
                <a
                  key={index}
                  href={menu?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="ml-3 mr-3 rounded-full shadow-lg p-2 shadow-gray-400 cursor-pointer hover:scale-105 ease-in duration-300">
                    <Icon size={defaultIconSize} />
                  </div>
                </a>
                // <Link href={"/"} legacyBehavior key={1}>
                //   <a className="p-2">
                //     <Icon className="cursor-pointer" size={defaultIconSize} />
                //   </a>
                // </Link>
              );
            })}
          </div>
          <p className="py-5 text-gray-400"> Copyright @2022 All right</p>
          <p className=" text-gray-400 text-center"> Term & Condition</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
