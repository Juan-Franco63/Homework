// src/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import menuData from "./menuData";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const renderMenu = (menu, index) => {
    return (
      <ul key={menu.title}>
        <li className="menu-item">
          <Link
            to={menu.link}
            onClick={() => handleSubMenuToggle(index)}
            className="menu-link"
          >
            {/* Iconos con Font Awesome */}
            <i className={`fas fa-${menu.icon}`} style={{ marginRight: "10px" }}></i>
            {menu.title}
          </Link>
          {menu.subMenus.length > 0 && openSubMenu === index && (
            <ul className="sub-menu">
              {menu.subMenus.map((subMenu, subIndex) =>
                renderMenu(subMenu, subIndex)
              )}
            </ul>
          )}
        </li>
      </ul>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      {menuData.map((menu, index) => renderMenu(menu, index))}
    </div>
  );
};

export default Sidebar;
