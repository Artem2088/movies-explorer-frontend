import React from "react";
import "./Promo.css";
import promoImage from "../../../images/image/landing-logo.png";

const Promo = () => {
  return (
    <div className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img src={promoImage} alt='Промо' className='promo__image' />
    </div>
  );
};

export default Promo;
