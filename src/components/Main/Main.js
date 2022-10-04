import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import "./Main.css";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

const Main = () => {
  return (
    <>
      <main className='main'>
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
};

export default Main;
