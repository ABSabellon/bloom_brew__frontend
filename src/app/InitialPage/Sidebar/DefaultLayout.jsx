import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import CoffeeLoader from "../../components/loaders/coffeeloader";

const DefaultLayout = (props) => {
  const { match } = props;
  const location = useLocation();
  const pathname = location.pathname;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname.includes("pos")) {
      document.body.classList.remove("expand-menu");
      document.body.classList.add("mini-sidebar");
      
      // document.querySelector(".header-left").classList.add("menu-header");
    } else {
      document.body.classList.remove("mini-sidebar");
    }
    setIsLoading(false);
  }, [pathname]); 

  return (
    <>
      {isLoading ? (
        <CoffeeLoader />
      ) : (
        <div className="main-wrapper">
          <Header />
          <div>
            {routerService &&
              routerService.map((route, key) => (
                <Route
                  key={key}
                  path={`${match.url}/${route.path}`}
                  component={route.component}
                />
              ))}
          </div>
          <Sidebar />
          <div className="sidebar-overlay"></div>
        </div>
      )}
    </>
  );
};

export default withRouter(DefaultLayout);
