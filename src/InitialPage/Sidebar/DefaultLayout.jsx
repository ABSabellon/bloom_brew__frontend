import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";

import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./sidebar";
// import { feather } from "../../assets/js/feather.min.js";

// import "../../assets/js/jquery-3.6.0.min.js"
// import "../../assets/js/feather.min.js"
// import "../../assets/js/jquery.slimscroll.min.js"
// import "../../assets/js/jquery.dataTables.min.js"
// import "../../assets/js/script.js"

const DefaultLayout =(props)=> {
    const { match } = props;
    
    // useEffect(() => {
    //   // Initialize Feather Icons when the component mounts
    //   feather.replace();
    // }, []);
  
    return (
      <>
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
        </div>
        <div className="sidebar-overlay"></div>
      </>
    );
}

export default withRouter(DefaultLayout);
