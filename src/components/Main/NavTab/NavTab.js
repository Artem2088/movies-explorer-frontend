import React from "react";
import "./NavTab.css";

const NavTab = () => {
  return (
    <nav className='navtab__group'>
      <ul className='navtab__links'>
        <li>
          <a href='#aboutProject' className='navtab__link'>
            О проекте
          </a>
        </li>
        <li>
          <a href='#techs' className='navtab__link'>
            Технологии
          </a>
        </li>
        <li>
          <a href='#aboutMe' className='navtab__link'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
