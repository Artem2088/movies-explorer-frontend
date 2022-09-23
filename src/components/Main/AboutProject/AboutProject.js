import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <div className='aboutProject' id='aboutProject'>
      <div className='aboutProject__header main-header__project'>
        <p className='aboutProject__title main-title__project'>О проекте</p>
      </div>
      <div className='aboutProject__block'>
        <div className='aboutProject__main-left'>
          <h3 className='aboutProject__title-left'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutProject__description-left'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutProject__main-right'>
          <h3 className='aboutProject__title-right'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutProject__description-right'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='aboutProject__progress'>
        <div className='aboutProject__back'>
          <span className='aboutProject__title-back'>1 неделя</span>
          <span className='aboutProject__title-back_span'>Back-end</span>
        </div>
        <div className='aboutProject__front'>
          <span className='aboutProject__title-front'>4 неделя</span>
          <span className='aboutProject__title-front_span'>Front-end</span>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
