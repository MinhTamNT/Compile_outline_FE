import React, { useEffect, useState } from "react";
import { StudentDashboard } from "../../components/Layouts/Student/StudentDashboard";
import { useDispatch, useSelector } from "react-redux";
import { ModalCheck } from "../../components/Modal/ModalCheck";
import {
  getCurrentUserFail,
  getCurrentUserStart,
  getCurrentUserSuccess,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "../../Redux/userSlice";
import { authApi, endpoints } from "../../Service/ApiConfig";

export const Home = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsCheck(false);
  };
  useEffect(() => {
    if (user?.dateJoined === null || user?.dateJoined === "N/A") {
      setIsCheck(true);
    }
  }, [user]);
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

    fetchCurrentUser();
  }, [accessToken, isCheck]);
  return (
    <>
      <StudentDashboard />
      {isCheck && <ModalCheck isOpen={isCheck} onClose={handleClose} />}
    </>
  );
};
