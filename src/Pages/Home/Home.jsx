import React from "react";
import TeacherDashboard from "../../components/Layouts/Teacher/TeacherDashboard ";
import StudentDashboard from "../../components/Layouts/Student/StudentDashboard";

export const Home = () => {
  const user = {
    role: "",
  };
  return user.role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
};
