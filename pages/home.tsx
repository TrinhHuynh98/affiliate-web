import React from "react";
import Trending from "../components/Trending";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTopButton";
import Project from "../components/Project";

const HomePage = () => {
  return (
    <>
      <Layout>
        <Banner />
        <Project />
        <Trending />
        <Footer />
        <ScrollToTop />
      </Layout>
    </>
  );
};

export default HomePage;
