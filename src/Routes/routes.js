// src/routes/RouteCompileoutline.js
import { config } from "../Config";
import { Chat } from "../Pages/Chat/Chat";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";
import { Register } from "../Pages/Register/Register";
import { CreateSyllab } from "../components/CreateSyllab/CreateSyllab";
import { Profile } from "../components/Layouts/Profile/Profile";
import { ErrorPage } from "../Pages/Error/Error"; // Make sure to import your Error component

export const RouteCompileoutline = [
  {
    path: config.route.home,
    component: Home,
    isAuthencatied: true,
  },
  {
    path: config.route.login,
    component: Login,
    layout: null,
  },
  {
    path: config.route.register,
    component: Register,
    layout: null,
  },
  {
    path: config.route.profile,
    component: Profile,
  },
  {
    path: config.route.createSyllab,
    component: CreateSyllab,
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
