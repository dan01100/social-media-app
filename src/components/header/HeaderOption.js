import React from "react";
import "./HeaderOption.css";

function HeaderOption({ Icon, title, onClick }) {
  return (
    <div onClick={onClick} className="header_option">
      <Icon className="header_option_icon" />
      <h3 className="header_option_title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
