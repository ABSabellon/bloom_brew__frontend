import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import IconMap from "../../components/iconMap/IconMap"

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const history = useHistory();

  const menus=[
    { 
      title: 'Main', icon: null, path:null, link: "#",
      submenus: [
        { title: 'Dashboard', icon: IconMap('LuLayoutDashboard',null,null,24),path:'dashboard', link: '/admin/dashboard'},
        { title: 'Menu', icon: IconMap('BiFoodMenu',null,null,24), path:'menu-',link: '/admin/menu/menu-list' },
        { title: 'Application', icon: IconMap('BsPhone',null,null,24), path:'/admin/application',link: "#", submenu_children:[
          {title: 'Chat', icon: null, path:'chat-applications', link:'/admin/applications/chat-applications'},
          { title: 'Calendar', icon: null, path:'calendar-applications', link:  '/admin/applications/calendar-applications' },
          { title: 'Email', icon: null, path:'email-applications', link:  '/admin/applications/email-applications' },
        ]},  
      ]
    },
    { 
      title: 'Manage', icon: null, path:null, link: "#",
      submenus: [
        { title: 'Manage Sales', icon: IconMap('AiOutlineShopping',null,null,24), path:'sales-manage', link: '/admin/manage/sales-manage'},
        { title: 'Manage Products', icon: IconMap('BiSolidCoffeeTogo',null,null,24),path:'products-', link: '#', submenu_children:[
          {title: 'Products', icon: null, path:'products-manage', link:'/admin/manage/products-manage'},
          { title: 'Categories', icon: null, path:'categories-manage', link:  '/admin/manage/categories-manage' },
        ]},
        { title: 'Manage Inventory', icon: IconMap('AiOutlineInbox',null,null,24), path:'inventory-', link: '#', submenu_children:[
          {title: 'Products', icon: null, path:'inventory-manage', link:'/admin/manage/inventory-manage'},
          { title: 'Categories', icon: null, path:'categories-manage', link:  '/admin/manage/categories-manage' },
        ]},
        { title: 'Users', icon: IconMap('FaUsersCog',null,null,24), path:'users-manage', link: '/admin/manage/users-manage'},
        { title: 'Suppliers', icon: IconMap('FaUserCog',null,null,24), path:'suppliers-manage', link: '/admin/manage/suppliers-manage' }, 
      ]
    },
    { 
      title: 'Reports', icon: null, path:null, link: "#",
      submenus: [
        { title: 'Sales Report', icon: IconMap('LuFileText',null,null,24), path:'inventory-reports', link: '/admin/reports/inventory-reports'},
        { title: 'Inventory Report', icon: IconMap('FiDatabase',null,null,24), path:'sales-reports', link: '/admin/reports/sales-reports' },
        { title: 'Supplier Report', icon: IconMap('AiOutlineGold',null,null,24), path:'supplier-reports', link: '/admin/reports/supplier-reports'},
      ]
    },
    { 
      title: 'Settings', icon: null, path:null, link: "#",
      submenus: [
        { title: 'Settings', icon: IconMap('FaCog',null,null,24), path:'generalsettings', link: "#", submenu_children:[
          {title: 'General Settings', icon: null, path:'general-settings', link:'/admin/settings/general-settings'},
          { title: 'User Permissions', icon: null, path:'user-permissions', link:  '/admin/settings/user-permissions' },
          { title: 'Email Settings', icon: null, path:'email-settings', link:  '/admin/settings/email-settings' },
        ]},
        { title: 'Logout', icon: IconMap('FiLogOut',null,null,24), path:'signIn', link: '/signIn' },
      ]
    },
  ];

  const toggleSidebar = (value) => {
    console.log('ToggleSlider ::: ', value)
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  let pathname = location.pathname;

  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseOver={expandMenuOpen}
              onMouseLeave={expandMenu}
            >
              <ul>
                {menus.map((menu,menuIndex)=>{
                  return(
                    <li key={menuIndex} className="submenu-open">
                      <h6 className="submenu-hdr">{menu.title}</h6>
                      <ul>
                        {menu.submenus.map((submenu,subIndex)=>{
                          return(
                            <li key={subIndex} className="submenu">
                              <Link 
                                to={submenu.link}
                                className={pathname.includes(submenu.path)? "subdrop active":"" 
                                || isSideMenu == submenu.title? "subdrop active" :""}
                                onClick={()=>toggleSidebar(isSideMenu == submenu.title ? "": submenu.title )}
                              >
                                {submenu.icon}
                                <span>{submenu.title}</span>{" "}
                                <span className={submenu.submenu_children? "menu-arrow":""}></span>
                              </Link>
                              {isSideMenu == submenu.title ? (
                                <ul>
                                  {submenu.submenu_children?.map((menu_child,childIndex)=>{
                                    return(
                                      <li key={childIndex}>
                                        <Link
                                        to={menu_child.link}
                                        className={pathname.includes(menu_child.path)? "active":""}
                                        >
                                          {menu_child.title}
                                        </Link>
                                      </li>
                                    );
                                  })                                  
                                  }
                                </ul>
                              ):("")}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );})
                }
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
