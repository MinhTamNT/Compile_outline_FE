import React from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const syllabi = [
    {
      id: 1,
      title: "Toán Cao Cấp",
      description: {
        subject: "Toán Cao Cấp",
        semester: "I",
        year: 2024,
      },
    },
    {
      id: 2,
      title: "Lập Trình C#",
      description: {
        subject: "Lập Trình C#",
        semester: "II",
        year: 2024,
      },
    },
    {
      id: 3,
      title: "Quản Trị Mạng",
      description: {
        subject: "Quản Trị Mạng",
        semester: "I",
        year: 2024,
      },
    },
  ];

  return (
    <div className="container mx-auto py-6 px-6">
      <h4 className="mb-10 ml-2 text-gray-800 text-[30px] font-bold">
        Chào Giảng Viên Dương Hữu Thành 👋
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center md:w-full">
          <div className="bg-gradient-to-r md:w-[600px] w-full from-blue-400 to-indigo-400 text-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden transform hover:scale-105">
            <div className="text-center p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h5 className="mb-4 text-gray-100 text-lg font-semibold">
                Tạo Đề Cương Mới
              </h5>
              <Link
                to="/create-syllabus"
                className="block w-full py-2 px-4 bg-white text-blue-500 hover:bg-gray-200 rounded-lg text-sm"
              >
                Bắt Đầu
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:w-full">
          <div className="bg-gradient-to-r from-green-400 md:w-[600px] w-full to-teal-400 text-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden transform hover:scale-105">
            <div className="text-center p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <h5 className="mb-4 text-gray-100 text-lg font-semibold">
                Quản Lý Đề Cương
              </h5>
              <Link
                to="/manage-syllabus"
                className="block w-full py-2 px-4 bg-white text-green-500 hover:bg-gray-200 rounded-lg text-sm"
              >
                Quản Lý
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h6 className="mb-4 text-gray-800 text-2xl font-semibold">
          Danh Sách Đề Cương
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syllabi.map((syllabus) => (
            <div key={syllabus.id} className="w-full h-auto mb-4">
              <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden">
                <div className="p-4">
                  <h6 className="text-lg font-semibold mb-2">
                    Đề cương: {syllabus.title}
                  </h6>
                  <p className="text-gray-700 text-sm">
                    Môn học : {syllabus.description.subject}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Học Kì: {syllabus.description.semester}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Năm Học : {syllabus.description.year}
                  </p>
                  <Link
                    to={`/edit-syllabus/${syllabus.id}`}
                    className="block w-[100px] mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Chỉnh Sửa
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
