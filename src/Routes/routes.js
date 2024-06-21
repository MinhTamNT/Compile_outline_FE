// src/routes/RouteCompileoutline.js
import { config } from "../Config";
import { Chat } from "../Pages/Chat/Chat";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";
import { Profile } from "../components/Layouts/Profile/Profile";
import { ErrorPage } from "../Pages/Error/Error"; // Make sure to import your Error component

export const RouteCompileoutline = [
  {
    path: config.route.home,
    component: Home,
  },
  {
    path: config.route.login,
    component: Login,
    layout: null,
  },

  {
    path: config.route.profile,
    component: Profile,
  },

  {
    path: config.route.chat,
    component: Chat,
    layout: null,
  },
  {
    path: "*",
    component: ErrorPage,
    layout: null,
  },
];
