import React from "react";
import "./Techs.css";

const Techs = () => {
  return (
    <div className='techs' id='techs'>
      <div className='techs__header main-header__project'>
        <p className='techs__title main-title__project'>Технологии</p>
      </div>
      <div className='techs-description__block'>
        <h3 className='techs-description__title'>7 технологий</h3>
        <p className='techs-description__about'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className='techs__lists'>
        <div className='tech__list'>HTML</div>
        <div className='tech__list'>CSS</div>
        <div className='tech__list'>JS</div>
        <div className='tech__list'>React</div>
        <div className='tech__list'>Git</div>
        <div className='tech__list'>Express.js</div>
        <div className='tech__list'>mongoDB</div>
      </div>
    </div>
  );
};

export default Techs;
