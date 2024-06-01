import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io"; // Using an icon for the back button

export const ChatHeader = ({ user }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="flex items-center p-4 bg-blue-600 text-white">
      <button
        onClick={handleBack}
        className="mr-4 text-white hover:text-gray-300 focus:outline-none"
      >
        <IoMdArrowBack size={24} />
      </button>
      <img
        src={user.avatar}
        alt={user.name}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm opacity-75">{user.status}</p>
      </div>
    </div>
  );
};
