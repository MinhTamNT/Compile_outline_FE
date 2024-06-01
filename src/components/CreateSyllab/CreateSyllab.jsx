import React from "react";
import GeneralInformation from "./GeneralInformation/GeneralInformation";

export const CreateSyllab = () => {
  return (
    <div className="w-full flex flex-col ">
      <header className="mx-auto text-[20px] mt-2">
        <p className="text-center">BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
        <p className="text-center">MINISTRY OF EDUCATION AND TRAINING </p>
        <p className="font-bold underline">
          TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH
        </p>
        <p className="text-center font-roboto underline">
          HO CHI MINH CITY OPEN UNIVERSITY
        </p>
      </header>
      <div className="content-syllab">
        <GeneralInformation />
      </div>
    </div>
  );
};
