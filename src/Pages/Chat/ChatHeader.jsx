import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdMenu } from "react-icons/io"; // Import IoMdMenu icon

export const ChatHeader = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center p-4 bg-blue-600 text-white">
      <button
        onClick={toggleSidebar} // Call the toggleSidebar function
        className="mr-4 text-white hover:text-gray-300 focus:outline-none md:hidden" // Hide the button on medium screens and above
      >
        <IoMdMenu size={24} />
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
