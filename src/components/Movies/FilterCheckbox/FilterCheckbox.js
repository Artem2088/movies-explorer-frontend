import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <div className='filterCheckbox'>
      <p className='checkBox__title'>Короткометражки</p>
      <div className='checkBox__switch'>
        <input type='checkbox' />
      </div>
    </div>
  );
};

export default FilterCheckbox;
