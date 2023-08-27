import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  Expense,
  People,
  Places,
  Product,
  Purchase,
  Quotation,
  Return,
  Sales1,
  Time,
  Transfer,
  menu_icon,
  settings,
} from "../../components/imagePath/imagePath";

const Topbar = (props) => {

  const menuItems = [
    { title: "Main Menu", icon: menu_icon, link: "#",
      submenus:[
        { title: "Dashboard", icon: Dashboard, link: "/admin/index-three"},
        { title: "Products", icon: Product, link: "#",
          submenu_children:[
            {title: "Product List", link: "/admin/index-three"},
            {title: "Add Product", link: "/admin/index-three"},
            {title: "Category List", link: "/admin/index-three"},
          ]
        },
        { title: "Sales", icon: Sales1, link: "#",
          submenu_children:[
            {title: "Sales Return List", link: "/admin/index-three"},
            {title: "New Sales Return", link: "/admin/index-three"},
            {title: "Category List", link: "/admin/index-three"},
          ]
        },
      ]
    },
    // Add other main menu items here
  ];

  const [openMenu, setOpenMenu] = useState(-1);
  const openMenuToggle = (index) => {
    if(openMenu == index){
      setOpenMenu(menuItems.length);
    } else {
      setOpenMenu(index);
    }
    setOpenSubMenu(-1);
  };

  const [openSubMenu, setOpenSubMenu] = useState(0);
  const openSubMenuToggle = (index) => {
    console.log(index)
    if(openSubMenu == index){
      setOpenSubMenu(-index);
    } else {
      setOpenSubMenu(index);
    }
  };
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar topbar new-header">
        <div className="container">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul className="nav">
              {menuItems.map((menu, menu_index) => {
                return(
                  <li className="submenu" key={menu_index} >
                    <Link
                      to={menu.link}
                      className={` ${openMenu === menu_index ? "subdrop" : ""}`}
                      // className={`menuItem ${openMenu === index ? "d-block" : ""}`}
                      onClick={() => openMenuToggle(menu_index)}
                    >
                      <img src={menu.icon} alt="img" /> 
                      <span> {menu.title}</span> <span className="menu-arrow" />
                    </Link>
                    <ul className={`${openMenu === menu_index ? "d-block" : ""}`}>
                      {menu.submenus.map((submenu,sub_index)=>{
                        return(
                          <li className="submenu"  key={sub_index}>
                            <Link to={submenu.link}
                            className={` ${openSubMenu === sub_index ? "subdrop" : ""}`}
                            onClick={() => openSubMenuToggle(sub_index)}>
                              <img src={submenu.icon} alt="img" />
                              <span> {submenu.title}</span> <span className={` ${submenu.submenu_children ? "menu-arrow" : ""}`} />
                            </Link>
                            <ul className={`${openSubMenu === sub_index ? "d-block" : ""}`}>
                              {submenu.submenu_children?.map((submenu_children,child_index)=>{
                                return(
                                  <li key={child_index}>
                                    <Link to={submenu_children.link}>
                                      {submenu_children.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                    {/* Render submenus here if needed */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* /Sidebar */}
    </>
  );
};
export default Topbar;
