import { config } from "../Config";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";
import { Register } from "../Pages/Register/Register";

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
];