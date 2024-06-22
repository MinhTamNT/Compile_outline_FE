import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getCurrentUserFail,
  getCurrentUserStart,
  getCurrentUserSuccess,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "../../Redux/userSlice";
import { authApi, endpoints } from "../../Service/ApiConfig";

export const RequiredAuth = ({ children }) => {
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      dispatch(getCurrentUserStart());
      dispatch(updateUserStart());
      try {
        const res = await authApi(accessToken).get(endpoints["current-user"]);
        dispatch(getCurrentUserSuccess(res.data));
        dispatch(updateUserSuccess(res.data));
      } catch (error) {
        console.log(error);
        dispatch(getCurrentUserFail());
        dispatch(updateUserFail());
      }
    };

    if (accessToken) {
      fetchCurrentUser();
    }
  }, [accessToken]);

  return accessToken ? children : <Navigate to="/login" />;
};
