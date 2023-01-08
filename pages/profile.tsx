import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

import CreateBook from "../components/NewBook";
import SideBar from "../components/SideBar";
import { auth, db } from "../config/firebase";
import Link from "next/link";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import HomePage from "./home";
import Nav from "../components/Nav";
import { FiMenu } from "react-icons/fi";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const defaultIconSize = "1.875rem";

const Profile = () => {
  const [loggedInuser, loading, _error] = useAuthState(auth);
  const isAdmin = loggedInuser?.email === "sos9889yo@gmail.com";
  const queryBookDataCurrentUser = query(collection(db, "books"));
  const queryProjectDataCurrentUser = query(collection(db, "projects"));
  const [numberBook, setNumberBook] = useState(0);
  const [numberProject, setNumberProject] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bookSnapShot, __loading, __error] = useCollection(
    queryBookDataCurrentUser
  );

  const [projectSnapShot] = useCollection(queryProjectDataCurrentUser);

  useEffect(() => {
    setNumberBook(bookSnapShot?.docs?.length ? bookSnapShot?.docs?.length : 0);
    setNumberProject(
      projectSnapShot?.docs?.length ? projectSnapShot?.docs?.length : 0
    );
    // setNumberBook
  }, [bookSnapShot, projectSnapShot]);

  console.log("numberBook", numberBook);

  return (
    <div className="flex">
      <SideBar />

      {/* body */}
      <div className="py-5 px-5">
        <h1>Admin Page</h1>
        <div className="grid md:grid-cols-3 py-5 gap-8">
          <div className=" h-auto w-full p-5 shadow-gray-400 rounded-lg bg-orange-300 text-white text-center">
            <h3>Books</h3>
            <h2>{numberBook}</h2>
          </div>
          <div className=" h-auto w-full p-5 shadow-gray-400 rounded-lg bg-blue-300 text-white text-center">
            <h3>Project</h3>
            <h2>{numberProject}</h2>
          </div>
          <div className=" h-auto w-full p-5 shadow-gray-400 rounded-lg bg-red-300 text-white text-center">
            <h3>Posts</h3>
            <h2>{numberBook}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
