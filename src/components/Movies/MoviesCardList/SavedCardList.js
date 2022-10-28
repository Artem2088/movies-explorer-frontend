import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const SavedCardList = () => {
  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        <MoviesCard />
      </ul>
    </section>
  );
};

export default SavedCardList;
