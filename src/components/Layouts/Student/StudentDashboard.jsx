import React, { useState } from "react";

const courses = [
  { id: 1, department: "Khoa học máy tính", year: 2023, title: "Cấu trúc dữ liệu", instructor: "Nguyễn Văn A", semester: "Học kỳ 1" },
  { id: 2, department: "Khoa học máy tính", year: 2024, title: "Thuật toán", instructor: "Trần Thị B", semester: "Học kỳ 2" },
  { id: 3, department: "Toán học", year: 2023, title: "Giải tích I", instructor: "Lê Văn C", semester: "Học kỳ 1" },
  { id: 4, department: "Toán học", year: 2024, title: "Đại số tuyến tính", instructor: "Phạm Thị D", semester: "Học kỳ 2" },
];

const departments = ["Khoa học máy tính", "Toán học"];
const years = [2023, 2024];

export const StudentDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filteredCourses = courses.filter((course) => {
    return (
      (selectedDepartment ? course.department === selectedDepartment : true) &&
      (selectedYear ? course.year === selectedYear : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Danh sách các đề cương</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Theo Khoa</label>
              <select
                className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Tất cả các khoa</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Theo Năm</label>
              <select
                className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Tất cả các năm</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Đề Cương Môn Học</h2>
          {filteredCourses.length > 0 ? (
            <ul className="space-y-4">
              {filteredCourses.map((course) => (
                <li key={course.id} className="border-b pb-2 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">{course.title}</p>
                      <p className="text-sm text-gray-600">
                        {course.department} - {course.year} - {course.semester}
                      </p>
                      <p className="text-sm text-gray-600">Giảng viên: {course.instructor}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Không tìm thấy môn học nào</p>
          )}
        </div>
      </div>
    </div>
  );
};
