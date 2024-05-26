import React from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <nav className=" hidden w-[300px] bg-gray-800 text-white py-4">
      <div className="px-2 space-y-2">
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-700">
          Trang Chủ
        </Link>
        <Link
          to="/courses"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Các môn học
        </Link>
        <Link
          to="/contact"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Liên Hệ
        </Link>
        <Link
          to="/notifications"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Thông báo
        </Link>
        <Link
          to="/messages"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Nhắn tin
        </Link>
      </div>
    </nav>
  );
};
