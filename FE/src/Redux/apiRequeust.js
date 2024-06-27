import { API, authApi, endpoints } from "../Service/ApiConfig";
import { loginUserStart, loginUserSuccess } from "./authSlice";
import {
  commentSpecificationFail,
  commentSpecificationStart,
  commentSpecificationSuccess,
} from "./commentSLice";
import {
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginUserStart());
  try {
    const res = await API.post(endpoints["login"], user);
    dispatch(loginUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (updateUser, dispatch, accessToken) => {
  dispatch(updateUserStart());
  try {
    const res = await authApi(accessToken).post(
      endpoints["change-required"],
      updateUser,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateUserFail());
  }
};

export const commentSpecification = async (
  accessToken,
  newComment,
  dispatch,
  specId
) => {
  dispatch(commentSpecificationStart());
  try {
    const res = await authApi(accessToken).post(
      endpoints["comment-specifcation"](specId),
      newComment
    );
    dispatch(commentSpecificationSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(commentSpecificationFail());
  }
};
