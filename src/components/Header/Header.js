import React from "react";
import './Header.scss';
import logo from "../../images/disease.png";

const Header = () => {
  return (
    <nav className="nav">
      <img src={logo} className="nav--icon"></img>
      <h1 className="nav--logo_text">COVID-19 Worldwide</h1>   
    </nav>
  );
};

export default Header;
