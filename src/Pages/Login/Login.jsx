import React from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Vui Lòng nhập tên tài khoản"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Vui Lòng nhập mật khẩu"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setTimeout(() => {
        alert("Logged in successfully!");
        setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  UserName
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
                    placeholder="Enter your UserName"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
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
                    placeholder="Enter your password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={"/"}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="mt-2 gap-2 text-center text-sm text-gray-600 max-w">
              <Link
                to="/register"
                className="font-medium ml-2 text-lg text-blue-600 hover:text-blue-500"
              >
                Create an account ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
