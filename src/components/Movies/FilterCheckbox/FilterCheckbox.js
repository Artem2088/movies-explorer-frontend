import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";

const FilterCheckbox = ({
  handleShortMovieAdd,
  updateData,
  handleShortMovie,
}) => {
  const [checked, setChecked] = useState(false);
  const [activBox, setActivBox] = useState(false);
  const pathname = useLocation();

  useEffect(() => {
    if (!activBox) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [changeActivbox]);

  function changeActivbox() {
    setActivBox(!activBox);
  }

  function handleCheckbox() {
    if (pathname == "/movies") {
      return handleShortMovie();
    } else {
      handleShortMovieAdd();
    }
  }

  function onChange() {
    handleCheckbox();
    updateData(checked);
    changeActivbox();
    localStorage.setItem("togle", checked);
  }

  return (
    <div className='filterCheckbox'>
      <div className='checkBox__switch'>
        <input
          type='checkbox'
          onChange={() => {
            onChange();
          }}
        />
      </div>
      <p className='checkBox__title'>Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
