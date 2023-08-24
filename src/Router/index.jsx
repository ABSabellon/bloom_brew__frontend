import Applications from "../MainPage/Main/Application";
import DashboardIndex from "../MainPage/Main/Dashbord/Dashboard";
import MenuIndex from "../MainPage/Main/Menu";
import ManageIndex from "../MainPage/Manage";
import ProfileIndex from "../MainPage/Profile";
import ReportsIndex from "../MainPage/Reports";
import SettingsIndex from "../MainPage/settings";
import Activities from "../MainPage/Activities";
import BlankPage from "../MainPage/BlankPage";
import Error404 from "../MainPage/ErrorPage/Error404";
import Error500 from "../MainPage/ErrorPage/Error500";

export default [
  { path: "applications", component: Applications,},

  { path: "dashboard", component: DashboardIndex, },

  { path: "menu", component: MenuIndex, },

  { path: "manage", component: ManageIndex, },

  { path: "profile", component: ProfileIndex, },

  { path: "reports", component: ReportsIndex, },

  { path: "settings", component: SettingsIndex, },

  { path: "activities", component: Activities, },

  { path: "blankpage", component: BlankPage, },

  { path: "error404", component: Error404, },

  { path: "error500", component: Error500, },
];
