import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state?.user?.user?.currentUser);
  const [userInfo, setUserInfo] = useState(user);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const infoFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="container mt-10 mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-2/3 mx-auto">
        <div className="p-8 lg:flex lg:items-center">
          <div className="lg:w-1/3 text-center lg:py-12 lg:border-r">
            <img
              src={userInfo.avatar}
              alt="avatar-user"
              className="rounded-full w-32 h-32 mx-auto mb-4 lg:mb-0 lg:w-48 lg:h-48 object-cover border-4 border-blue-500"
            />
            <h3 className="text-lg font-semibold mt-4">{userInfo.username}</h3>
            <p className="text-sm text-gray-500">{userInfo.role}</p>
          </div>
          <div className="lg:w-2/3 p-4">
            <h2 className="text-3xl font-semibold mb-4">
              Thông Tin Người Dùng
            </h2>
            {infoFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block font-semibold text-gray-600 mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={userInfo[field.name]}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md shadow-sm focus:outline-none ${
                    isEditing
                      ? "bg-white border-blue-500 focus:ring-2 focus:ring-blue-200"
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
              </div>
            ))}
            <div className="flex justify-center lg:justify-start mt-6">
              <button
                className={`py-2 px-6 rounded-md focus:outline-none transition duration-300 ${
                  isEditing
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                }`}
                onClick={toggleEdit}
              >
                {isEditing ? "Lưu Thông Tin" : "Chỉnh Sửa Thông Tin"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
