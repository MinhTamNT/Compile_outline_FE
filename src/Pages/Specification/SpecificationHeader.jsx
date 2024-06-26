import React from "react";
import { FcDocument } from "react-icons/fc";
export const SpecificationHeader = () => {
  return (
    <div className="">
      <div className="specification-header text-[20px] flex items-center gap-2">
        <FcDocument size={32} />
        <p className="">Đề cương chi tiết</p>
      </div>
      <div className="header px-2  border-b-gray-100 py-2 mb-4 border-bottom border-gray">
        <p className="text-center text-[16px] font-bold  mb-0">
          BỘ GIÁO DỤC VÀ ĐÀO TẠO
        </p>
        <p className="text-center text-[16px] font-bold  mb-0">
          MINISTRY OF EDUCATION AND TRAINING
        </p>
        <p className="text-center text-[16px] font-bold mb-0">
          TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH
        </p>
        <p className="text-center text-[16px] font-bold">
          HO CHI MINH CITY OPEN UNIVERSITY
        </p>
      </div>
      <div className="name-specification-subject mb-4">
        <p className="text-center font-bold text-xl">Đề cương Môn Học</p>
        <p className="text-center font-bold text-xl">COURSE SPECIFICATION</p>
      </div>
    </div>
  );
};
