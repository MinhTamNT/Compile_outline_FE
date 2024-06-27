import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/apiRequeust";

export const ModalCheck = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  const avatarInputRef = useRef(null); // useRef for file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData, dispatch, accessToken);
      setFormData({
        oldPassword: "",
        newPassword: "",
        file: null,
      });
      setPreview(null);
      onClose(formData);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    { label: "Mật khẩu cũ : ", type: "password", name: "oldPassword" },
    { label: "Mật Khẩu mới : ", type: "password", name: "newPassword" },
  ];

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl text-red-500 text-center font-bold mb-4">
          Vui lòng cập nhật
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <div className="flex items-center">
              <button onClick={handleAvatarClick}>
                <img
                  src={preview || "https://via.placeholder.com/150"}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full object-cover cursor-pointer mr-4"
                />
              </button>
              <input
                ref={avatarInputRef}
                id="avatarInput"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          {fields.map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                className="w-full px-3 py-2 border rounded"
                value={formData[field.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
