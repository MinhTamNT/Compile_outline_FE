import React, { useState } from "react";
import { Typography, Grid, TextField, MenuItem } from "@mui/material";
import SyllabusCard from "../../SyllabusCard/SyllabusCard";
import Pagination from "@mui/material/Pagination";

const StudentDashboard = () => {
    const syllabi = [
        {
          id: 1,
          title: "Đề Cương Toán Cao Cấp",
          description: "Toán Cao Cấp - Kỳ I 2024",
          faculty: "Khoa Khoa Học Tự Nhiên",
          year: "2024",
        },
        {
          id: 2,
          title: "Đề Cương Lập Trình C#",
          description: "Lập Trình C# - Kỳ II 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        {
          id: 3,
          title: "Đề Cương Quản Trị Mạng",
          description: "Quản Trị Mạng - Kỳ I 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        {
          id: 4,
          title: "Đề Cương Toán Cao Cấp",
          description: "Toán Cao Cấp - Kỳ II 2023",
          faculty: "Khoa Khoa Học Tự Nhiên",
          year: "2023",
        },
        {
          id: 5,
          title: "Đề Cương Lập Trình Java",
          description: "Lập Trình Java - Kỳ I 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        {
          id: 6,
          title: "Đề Cương Quản Trị Cơ Sở Dữ Liệu",
          description: "Quản Trị Cơ Sở Dữ Liệu - Kỳ II 2023",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2023",
        },
        {
          id: 7,
          title: "Đề Cương Kỹ Thuật Máy Tính",
          description: "Kỹ Thuật Máy Tính - Kỳ I 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        {
          id: 8,
          title: "Đề Cương Toán Rời Rạc",
          description: "Toán Rời Rạc - Kỳ II 2023",
          faculty: "Khoa Khoa Học Tự Nhiên",
          year: "2023",
        },
        {
          id: 9,
          title: "Đề Cương Lập Trình Python",
          description: "Lập Trình Python - Kỳ II 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        {
          id: 10,
          title: "Đề Cương An Toàn Thông Tin",
          description: "An Toàn Thông Tin - Kỳ I 2024",
          faculty: "Khoa Công Nghệ Thông Tin",
          year: "2024",
        },
        // Add more syllabi as needed
      ];
      ;

  const [filter, setFilter] = useState({ faculty: "", year: "" });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredSyllabi = syllabi.filter(
    (s) =>
      (filter.faculty === "" || s.faculty === filter.faculty) &&
      (filter.year === "" || s.year === filter.year)
  );

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredSyllabi.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedSyllabi = filteredSyllabi.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="container mx-auto py-6 px-6">
      <Typography variant="h4" className="mb-6 text-center text-gray-800">
        Danh Sách Đề Cương
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-1">
          <Typography variant="h6" className="mb-4">
            Bộ Lọc
          </Typography>
          <div className="mb-4">
            <TextField
              select
              label="Chọn Khoa"
              name="faculty"
              value={filter.faculty}
              onChange={handleFilterChange}
              fullWidth
              variant="outlined"
              color="primary"
            >
              <MenuItem value="">Tất Cả</MenuItem>
              <MenuItem value="Khoa Khoa Học Tự Nhiên">
                Khoa Khoa Học Tự Nhiên
              </MenuItem>
              <MenuItem value="Khoa Công Nghệ Thông Tin">
                Khoa Công Nghệ Thông Tin
              </MenuItem>
            </TextField>
          </div>
          <div>
            <TextField
              select
              label="Chọn Năm"
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
              fullWidth
              variant="outlined"
              color="primary"
            >
              <MenuItem value="">Tất Cả</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </TextField>
          </div>
        </div>
        <div className="md:col-span-2">
          <Grid container spacing={3}>
            {paginatedSyllabi.map((syllabus) => (
              <Grid item xs={12} md={6} key={syllabus.id}>
                <SyllabusCard syllabus={syllabus} isTeacher={false} />
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
