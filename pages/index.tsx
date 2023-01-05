import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import AuthButton from "../components/AuthButton";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  return (
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
      <Loading />
    </motion.div>
  );
};

export default Home;
