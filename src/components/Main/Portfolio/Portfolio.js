import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/icon/arrow.svg";

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title '>Портфолио</h3>
      <ul className='portfolio__block'>
        <li className='portfolio__site'>
          Статичный сайт
          <a
            href='https://artem2088.github.io/how-to-learn/'
            className='portfolio__link'
            target='blank'
          >
            <img src={arrow} alt='стрелка' className='portfolio_arrow' />
          </a>
        </li>
        <li className='portfolio__site portfolio__site_adaptiv'>
          Адаптивный сайт
          <a
            href='https://artem2088.github.io/russian-travel/'
            className='portfolio__link portfolio__link_adaptiv'
            target='blank'
          >
            <img src={arrow} alt='стрелка' className='portfolio_arrow' />
          </a>
        </li>
        <li className='portfolio__site portfolio__site_spa'>
          Одностраничное приложение
          <a
            href='https://artem2088.github.io/mesto/'
            className='portfolio__link portfolio__link_spa'
            target='blank'
          >
            <img
              src={arrow}
              alt='стрелка'
              className='portfolio_arrow portfolio_arrow_spa'
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
