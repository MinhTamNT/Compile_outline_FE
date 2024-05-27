import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUserCircle } from "react-icons/fa";
import { InputField } from "./InputField";
import { Loading } from "../../components/Loading/Loading";

export const Register = () => {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      avatar: Yup.mixed().required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setIsloading(true);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        setIsloading(false);
      }, 2000);
    },
  });

  const fields = [
    {
      id: "firstName",
      label: "Họ",
      type: "text",
      placeholder: "Nhập vào Họ",
    },
    {
      id: "lastName",
      label: "Tên",
      type: "text",
      placeholder: "Nhập vào tên",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Nhập vào email",
    },
    {
      id: "password",
      label: "Mật Khẩu",
      type: "password",
      placeholder: "Nhập vào mật khẩu",
    },
    {
      id: "confirmPassword",
      label: "Nhập Lại Mật khẩu",
      type: "password",
      placeholder: "Nhập lại mật khẩu",
    },
  ];

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("avatar", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-2" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="avatar"
                className="block  text-center text-lg font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="mt-1 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="h-20 w-20 rounded-full object-cover cursor-pointer"
                    onClick={handleIconClick}
                    role="button"
                    tabIndex="0"
                  />
                ) : (
                  <FaUserCircle
                    size={100}
                    className="h-20 w-20  text-gray-400 cursor-pointer"
                    onClick={handleIconClick}
                  />
                )}
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {formik.touched.avatar && formik.errors.avatar ? (
                <div className="text-red-500 text-center text-sm mt-1">
                  {formik.errors.avatar}
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.slice(0, 2).map((field) => (
                <InputField key={field.id} {...field} formik={formik} />
              ))}
            </div>
            <div>
              {fields.slice(2).map((field) => (
                <InputField key={field.id} {...field} formik={formik} />
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={formik.isSubmitting}
              >
                Đăng kí
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="mt-2 gap-2 text-center text-sm text-gray-600 max-w">
              Already have an account?
              <Link
                to="/login"
                className="font-medium ml-2 text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
