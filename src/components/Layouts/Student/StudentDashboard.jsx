import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../Service/ApiConfig";
import { useSelector } from "react-redux";

export const StudentDashboard = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lecturerQuery, setLecturerQuery] = useState("");
  const [creditsQuery, setCreditsQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector((state) => state?.auth?.accessToken);

  // Calculate the list of years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();

  useEffect(() => {
    const getSpecification = async () => {
      setIsLoading(true);
      try {
        let url = `${endpoints["specification"]}?subjectName=${
          searchParams.get("subjectName") || ""
        }&year=${searchParams.get("year") || ""}&credits=${
          searchParams.get("credits") || ""
        }&lecturerName=${searchParams.get("lecturerName") || ""}`;
        const response = await authApi(accessToken).get(url);
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getSpecification();
  }, [searchParams]);

  const handleSearch = () => {
    const results = courses.filter((course) => {
      const courseYears = course.years.map((y) => y.year);
      return (
        (selectedYear ? courseYears.includes(parseInt(selectedYear)) : true) &&
        (searchQuery
          ? course.subject.toLowerCase().includes(searchQuery.toLowerCase())
          : true) &&
        (lecturerQuery
          ? course.lecturerName
              .toLowerCase()
              .includes(lecturerQuery.toLowerCase())
          : true) &&
        (creditsQuery ? course.credits === parseInt(creditsQuery) : true)
      );
    });

    const newFilters = [];
    if (selectedYear) newFilters.push({ type: "year", value: selectedYear });
    if (searchQuery) newFilters.push({ type: "search", value: searchQuery });
    if (lecturerQuery)
      newFilters.push({ type: "lecturer", value: lecturerQuery });
    if (creditsQuery) newFilters.push({ type: "credits", value: creditsQuery });

    setFilteredCourses(results);
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (filter) => {
    if (filter.type === "year") setSelectedYear("");
    if (filter.type === "search") setSearchQuery("");
    if (filter.type === "lecturer") setLecturerQuery("");
    if (filter.type === "credits") setCreditsQuery("");

    const newFilters = activeFilters.filter((f) => f.type !== filter.type);
    setActiveFilters(newFilters);

    const results = courses.filter((course) => {
      const courseYears = course.years.map((y) => y.year);
      return (
        (newFilters.find((f) => f.type === "year")
          ? courseYears.includes(
              parseInt(newFilters.find((f) => f.type === "year").value)
            )
          : true) &&
        (newFilters.find((f) => f.type === "search")
          ? course.subject
              .toLowerCase()
              .includes(
                newFilters.find((f) => f.type === "search").value.toLowerCase()
              )
          : true) &&
        (newFilters.find((f) => f.type === "lecturer")
          ? course.lecturerName
              .toLowerCase()
              .includes(
                newFilters
                  .find((f) => f.type === "lecturer")
                  .value.toLowerCase()
              )
          : true) &&
        (newFilters.find((f) => f.type === "credits")
          ? course.credits ===
            parseInt(newFilters.find((f) => f.type === "credits").value)
          : true)
      );
    });

    setFilteredCourses(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Danh sách các đề cương
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col md:flex-row md:col-span-3 md:items-center">
              <div className="flex-grow">
                <label
                  htmlFor="search"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Tìm kiếm
                </label>
                <input
                  type="text"
                  id="search"
                  className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên môn học"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto md:mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Theo Năm
              </label>
              <select
                id="year"
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
            <div>
              <label
                htmlFor="lecturer"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Theo Giảng Viên
              </label>
              <input
                type="text"
                id="lecturer"
                className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên giảng viên"
                value={lecturerQuery}
                onChange={(e) => setLecturerQuery(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="credits"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Theo Tín Chỉ
              </label>
              <input
                type="number"
                id="credits"
                className="block w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số tín chỉ"
                value={creditsQuery}
                onChange={(e) => setCreditsQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full"
              >
                {filter.type === "year" && <span>Năm: {filter.value}</span>}
                {filter.type === "search" && (
                  <span>Tìm kiếm: {filter.value}</span>
                )}
                {filter.type === "lecturer" && (
                  <span>Giảng viên: {filter.value}</span>
                )}
                {filter.type === "credits" && (
                  <span>Tín chỉ: {filter.value}</span>
                )}
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Đề Cương Môn Học
          </h2>
          {isLoading ? (
            <p className="text-gray-500">Đang tải...</p>
          ) : filteredCourses.length > 0 ? (
            <ul className="space-y-4">
              {filteredCourses.map((course) => (
                <li key={course.id} className="border-b pb-2 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">
                        Đề cương môn học : {course.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        Năm áp dụng :{" "}
                        {course.years.map((y) => y.year).join("-")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Giảng viên: {course.lecturerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tín chỉ: {course.credits}
                      </p>
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
