import React, { useState } from "react";

const GeneralInformation = () => {
  const [courseTitleVietnamese, setCourseTitleVietnamese] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitleEnglish, setCourseTitleEnglish] = useState("");

  return (
    <div className="px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">
        I. Thông tin tổng quát - General information
      </h2>
      <div className="mb-4">
        <label className="block mb-2">
          Tên môn học tiếng Việt / Course title in Vietnamese:
        </label>
        <input
          type="text"
          value={courseTitleVietnamese}
          onChange={(e) => setCourseTitleVietnamese(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Mã môn học / Course code:</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>
      <div>
        <label className="block mb-2">
          Tên môn học tiếng Anh / Course title in English:
        </label>
        <input
          type="text"
          value={courseTitleEnglish}
          onChange={(e) => setCourseTitleEnglish(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>
    </div>
  );
};

export default GeneralInformation;
