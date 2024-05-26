import { CourseOutline } from "./CourseOutLine";

export const CourseList = ({ courses }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <CourseOutline key={index} course={course} />
      ))}
    </div>
  );
};
