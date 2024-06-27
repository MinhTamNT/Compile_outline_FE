import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/apiRequeust";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Phải ít hơn hoặc bằng 15 ký tự")
        .required("Vui lòng nhập tên tài khoản"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setLoading(true);
      try {
        const user = {
          username: values.username,
          password: values.password,
        };
        await loginUser(user, dispatch); 
        navigate("/"); 
      } catch (error) {
        console.log(error);
        toast.error("Tài khoản hoặc mật khẩu sai vui lòng thừ lại")
      } finally {
        setLoading(false);
        toast.error("Tài khoản hoặc mật khẩu sai vui lòng thừ lại")
        setSubmitting(false); 
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {loading && <Loading />}
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-2" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên tài khoản
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`input-field-login ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Nhập tên tài khoản của bạn"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`input-field-login ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Nhập mật khẩu của bạn"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link
                to="/register"
                className="font-medium ml-2 text-lg text-blue-600 hover:text-blue-500"
              >
                Tạo tài khoản mới?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
