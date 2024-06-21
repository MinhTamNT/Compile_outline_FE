import { API, endpoints } from "../Service/ApiConfig";
import { loginUserStart, loginUserSuccess } from "./authSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginUserStart());
  try {
    const res = await API.post(endpoints["login"], user);
    dispatch(loginUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
