import React from "react";
import CourseTable from "./RequirementSubject";
import Objective from "./Objective";

export const SpecificationContent = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="information-specification">
        <h5 className="font-bold mt-4">
          I. Thông tin tổng quát - General information
        </h5>
        <p>1. Thông tin/Information </p>
        <div className="name-subject flex items-center">
          <p className="mb-0">
            Tên môn :<span className="font-bold mb-0"> Giải tích </span>
          </p>
          <p className="mb-0 me-2">
            - Mã Môn học:
            <span className="font-bold mb-0">MH1</span>
          </p>
        </div>
        <div className="department-info mb-2 flex items-center">
          <p className="mb-0 me-2">Khoa phụ trách:</p>
          <p className="font-bold mb-0">Công nghệ thông tin</p>
        </div>
        <div className="instructor-info mb-2 flex items-center">
          <p className="mb-0 me-2">Giáo viên biên soạn:</p>
          <p className="font-bold mb-0">Dương Hữu Thành</p>
        </div>
        <div className="instructor-email mb-2 flex items-center">
          <p className="mb-0 me-2">Email của giảng viên:</p>
          <p className="font-bold mb-0">duonghuuthanh@gmail.com</p>
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
            placeholder="1"
          />
        </div>
      </div>
      <div className="course-overview rounded-lg bg-white mt-4 ">
        <h5 className="font-bold text-lg mb-3">
          II. Thông tin về môn học - Course Overview
        </h5>
        <p>1.Mô Tả Đề Cương</p>
        <div className="text-justify leading-relaxed border rounded-lg p-4 text-gray-700">
          Môn Kỹ Thuật Lập Trình trang bị cho sinh viên một số kiến thức tiếp
          theo về lập trình cấu trúc mà chưa được đề cập trong môn Cơ sở lập
          trình. Nội dung môn học bao gồm: mảng nhiều chiều, đệ quy, con trỏ,
          chuỗi ký tự, các kiểu dữ liệu tự tạo và các thao tác với tập tin. Nội
          dung lập trình được dùng để minh họa là...
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2">2. Môn học điều kiện/Requirements:</p>
        <CourseTable />
      </div>
      <div className="mt-4">
        <p className="mb-2">3. Mục tiêu môn học/Course objectives:</p>
        <Objective />
      </div>
      <div className="mt-4">
        <p className="mb-2">
          4. Chuẩn đầu ra (CĐR) môn học – Course learning outcomes (CLOs)
        </p>
        <Objective />
      </div>
      <div className="mt-4">
        <p className="mb-2">5.Điểm đánh giá/Rating:</p>
        <Objective />
      </div>
    </div>
  );
};
