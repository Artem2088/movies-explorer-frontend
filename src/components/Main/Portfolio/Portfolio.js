import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/icon/arrow.svg";

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title '>Портфолио</h3>
      <div className='portfolio__site'>
        Статичный сайт
        <a
          href='https://github.com/Artem2088/how-to-learn'
          className='portfolio__link'
        >
          <img src={arrow} alt='стрелка' className='portfolio_arrow' />
        </a>
      </div>
      <div className='portfolio__site portfolio__site_adaptiv'>
        Адаптивный сайт
        <a
          href='https://artem2088.github.io/russian-travel/'
          className='portfolio__link portfolio__link_adaptiv'
        >
          <img src={arrow} alt='стрелка' className='portfolio_arrow' />
        </a>
      </div>
      <div className='portfolio__site portfolio__site_spa'>
        Одностраничное приложение
        <a
          href='https://artem2088.github.io/mesto/'
          className='portfolio__link portfolio__link_spa'
        >
          <img
            src={arrow}
            alt='стрелка'
            className='portfolio_arrow portfolio_arrow_spa'
          />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
