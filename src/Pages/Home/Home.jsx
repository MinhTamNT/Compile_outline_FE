import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SidebarSearch/SearchBar";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const courses = [
    {
      id: 1,
      title: "Đề cương môn học Giải Thuật",
      credits: 3,
      semester: "2024 Kì 1",
    },
    {
      id: 2,
      title: "Đề cương môn học Toán cao cấp",
      credits: 4,
      semester: "2024 Kì 2",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">
        Chào Giảng viên Nguyễn Sinh Hùng 👋
      </h2>
      <div className="flex items-center mb-4">
        <SearchBar />
        <button className="bg-blue-500 ml-2 text-white px-4 py-2 rounded-md flex items-center">
          <FaSearch className="mr-2" />
          Tìm kiếm
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-300 p-4 rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>

            <p className="text-gray-600 mb-2">Số tín chỉ: {course.credits}</p>
            <p className="text-gray-600 mb-2">Học kỳ: {course.semester}</p>
            <Link
              to={`/courses/${course.id}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
