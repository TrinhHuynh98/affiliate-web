import Link from "next/link";
import React from "react";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import Typewriter from "typewriter-effect";

const defaultIconSize = "1.875rem";

const socialMedia = [
  { icon: BsFacebook, link: "/" },
  { icon: BsInstagram, link: "https://www.instagram.com/joslies98/" },
  { icon: BsLinkedin, link: "/" },
];

const Banner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto md:px-20">{Slide()}</div>
    </section>
  );
};

export default Banner;

const Slide = () => {
  return (
    <div id="home" className="grid md:grid-cols-2">
      <div className="image">
        <Link href={"/home"} legacyBehavior>
          <a>
            <img
              className=""
              src={"/images/banner1.png"}
              alt="..."
              width={400}
              height={300}
            />
          </a>
        </Link>
      </div>

      <div className="info mt-10 mr-5">
        {/* <div className="cat"> */}
        {/* <Link href={"/"} legacyBehavior> */}
        <a className="text-orange-600 text-xl md:text-3xl hover:text-orange-800">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(`Hi! I'm Joslies!`)
                .callFunction(() => {
                  console.log("String typed out!");
                })
                .pauseFor(2500)

                .start();
            }}
          />
        </a>

        <div className="title mt-10">
          <Link href={"/"} legacyBehavior>
            <a className="text-black text-3xl md:text-6xl font-bold hover:text-gray-800">{`Creating a beautiful the website is my passion. `}</a>
          </Link>
        </div>
        <p className="text-gray-500 mt-10">
          Extensive knowledge of the Front end of a completed web application.
          Because of this, I am able to adapt the business requirements to meet
          the technical demands.
        </p>
        <p className="text-orange-600 text-bold mt-10">Following here</p>
        <div className="flex my-4 sm:w-[80%] ">
          {socialMedia.map(({ icon: Icon, ...menu }, index) => {
            return (
              // <div className="px-2">
              <a key={index} href={menu?.link} target="_blank" rel="noreferrer">
                <div className="ml-3 mr-3 rounded-full shadow-lg p-2 shadow-gray-400 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Icon size={defaultIconSize} />
                </div>
              </a>
              // <Link href={menu.link} legacyBehavior key={1}>
              //   <a className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
              //     <Icon className="cursor-pointer" size={defaultIconSize} />
              //   </a>
              // </Link>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
