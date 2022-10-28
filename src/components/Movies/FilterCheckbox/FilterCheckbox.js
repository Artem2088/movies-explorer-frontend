import { React, useEffect, useState } from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ short, short_status }) => {
  return (
    <div className='filterCheckbox'>
      <div className='checkBox__switch'>
        <input
          type='checkbox'
          onChange={(e) => short(e.target.checked)}
          checked={short_status}
        />
      </div>
      <p className='checkBox__title'>Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
