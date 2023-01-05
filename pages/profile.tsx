import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import CreateBook from "../components/NewBook";
import SideBar from "../components/SideBar";
import { auth } from "../config/firebase";
import Link from "next/link";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const defaultIconSize = "1.875rem";

const socialMedia = [
  { icon: BsFacebook, link: "/" },
  { icon: BsInstagram, link: "/" },
  { icon: BsLinkedin, link: "/" },
];

const Profile = () => {
  const [loggedInuser, loading, _error] = useAuthState(auth);
  const isAdmin = loggedInuser?.email === "sos9889yo@gmail.com";
  const router = useRouter();

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        // this is a simple animation that fades in the page. You can do all kind of fancy stuff here
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src={loggedInuser?.photoURL}
            alt={loggedInuser?.displayName}
            className="rounded-full mt-10 mb-10"
            width={200}
            height={200}
          />

          <h2 className="mb-10">{loggedInuser?.displayName}</h2>

          {isAdmin && <CreateBook />}
        </div>
      </motion.div>

      <Footer />
    </Layout>
  );
};

export default Profile;
