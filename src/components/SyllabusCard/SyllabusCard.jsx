import React from "react";
import { Link } from "react-router-dom";

const SyllabusCard = ({ syllabus, isTeacher }) => {
  return (
    <div className="rounded-lg bg-white overflow-hidden hover:shadow-lg transition-all">
      <div className="p-4 h-[200px]">
        <h5 className="font-bold text-gray-800 mb-2 text-lg">
          {syllabus.title}
        </h5>
        {!isTeacher && (
          <div className="text-gray-600 mb-2">
            <p className="font-bold">Giảng Viên : Dương Hữu Thành</p>
          </div>
        )}
        <p className="text-gray-600 mb-4 text-sm">{syllabus.description}</p>
        <div className="flex justify-between">
          <Link
            to={`/syllabus/${syllabus.id}`}
            className="text-blue-500 border border-blue-500 hover:bg-blue-50 px-4 py-2 rounded text-sm"
          >
            Xem Chi Tiết
          </Link>
          {isTeacher && (
            <Link
              to={`/edit-syllabus/${syllabus.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Chỉnh Sửa
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllabusCard;
