import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const Loading = () => {
  const [loggedInuser, loading, _error] = useAuthState(auth);
  console.log("loading", loading);
  return (
    <div className="flex flex-col justify-center items-center bg-cover bg-[url('/images/loading-bg.jpg')] h-screen">
      <h1 className="text-white px-5 ">{`WELLCOME TO JOSLIES'S BLOG`}</h1>

      {loading ? (
        <h2 className="text-cyan-300 animate-bounce">Wait a little bit!</h2>
      ) : (
        <Link legacyBehavior href="/home">
          <a>
            <button
              className={`mt-10 bg-teal-600 p-4 text-white rounded-full hover:bg-teal-900 hover:shadow-xl hover: scale-110 duration-300 `}
            >
              Come Home
            </button>
          </a>
        </Link>
      )}
      {/* <button
        className={`mt-10 bg-teal-600 p-4 text-white rounded-full hover:bg-teal-900 hover:shadow-xl hover: scale-110 duration-300 `}
      >
        <Link legacyBehavior href="/home">
          Come Home
        </Link>
      </button> */}
      <img
        src="/images/img1.png"
        alt="circle"
        className="z-20 w-6 absolute left-24 top-56 animate-ping"
      />
      <img
        src="/images/img1.png"
        alt="circle"
        className="z-20 w-6 absolute right-96 top-36 animate-ping"
      />
      <img
        src="/images/img1.png"
        alt="circle"
        className="z-20 w-6 absolute left-64 bottom-24 animate-ping"
      />
      <img
        src="/images/img1.png"
        alt="circle"
        className="z-20 w-6 absolute right-40 top-64 animate-ping"
      />
    </div>
  );
};

export default Loading;
