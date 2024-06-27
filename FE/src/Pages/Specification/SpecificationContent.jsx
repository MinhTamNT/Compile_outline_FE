import React from "react";
import { CourseTable } from "./RequirementSubject";
import Objective from "./Objective";
import { OutComesSpecification } from "./OutCome";
import { Ratting } from "./Ratting";

export const SpecificationContent = ({ specification }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="information-specification">
        <h5 className="font-bold mt-4">
          I. Thông tin tổng quát - General information
        </h5>
        <p>1. Thông tin/Information </p>
        <div className="name-subject flex items-center">
          <div className="mb-0">
            Tên môn :
            <span className="font-bold mb-0 ml-2">
              {specification?.subject?.subjectName}
            </span>
          </div>
          <div className="mb-0 text-red-500 ml-2 me-2">
            - Khoá áp dụng:
            <span className="font-bold ml-2 mb-0">
              {specification?.years?.map((year, index) => (
                <span key={year.id}>
                  {year.year}
                  {index !== specification.years.length - 1 ? " - " : ""}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="department-info mb-2 flex items-center">
          <p className="mb-0 me-2">Khoa phụ trách:</p>
          <p className="font-bold mb-0">{specification?.faculty}</p>
        </div>
        <div className="instructor-info mb-2 flex items-center">
          <p className="mb-0 me-2">Giáo viên biên soạn:</p>
          <p className="font-bold mb-0">{specification?.fullname}</p>
        </div>
        <div className="instructor-email mb-2 flex items-center">
          <p className="mb-0 me-2">Email của giảng viên:</p>
          <p className="font-bold mb-0">{specification?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>2. Số tín chỉ/Credits : </p>
          <input
            path="credits"
            type="number"
            min="1"
            max="5"
            step="0.5"
            className="px-2"
            id="credits"
            value={specification?.credits}
          />
        </div>
      </div>
      <div className="course-overview rounded-lg bg-white mt-4 ">
        <h5 className="font-bold text-lg mb-3">
          II. Thông tin về môn học - Course Overview
        </h5>
        <p>1.Mô Tả Đề Cương</p>
        <div className="text-justify leading-relaxed border rounded-lg p-4 text-gray-700">
          {specification?.description}
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2">2. Môn học điều kiện/Requirements:</p>
        <CourseTable requirements={specification?.subjectRequirements} />
      </div>
      <div className="mt-4">
        <p className="mb-2">3. Mục tiêu môn học/Course objectives:</p>
        <Objective objectiveSubject={specification?.objectives} />
      </div>
      <div className="mt-4">
        <p className="mb-2">
          4. Chuẩn đầu ra (CĐR) môn học – Course learning outcomes (CLOs)
        </p>
        <OutComesSpecification outComes={specification?.outcomes} />
      </div>
      <div className="mt-4">
        <p className="mb-2">5.Điểm đánh giá/Rating:</p>
        <Ratting ratting={specification?.specificationRatings} />
      </div>
    </div>
  );
};
