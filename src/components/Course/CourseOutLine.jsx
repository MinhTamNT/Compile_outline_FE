import React from "react";

export const CourseOutline = ({ course }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <ul className="list-disc pl-6">
        <li>Số tín chỉ: {course.credit}</li>
        <li>Giảng viên: {course.instructor}</li>
      </ul>
    </div>
  );
};
