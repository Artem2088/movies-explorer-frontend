import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <div className='filterCheckbox'>
      <div className='checkBox__switch'>
        <input type='checkbox' />
      </div>
      <p className='checkBox__title'>Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
