import React from "react";
import { IoMdMenu } from "react-icons/io";

export const ChatHeader = ({ user, toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <IoMdMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold text-lg">Đang chat với {user.fullname}</span>
      </div>
    </div>
  );
};
