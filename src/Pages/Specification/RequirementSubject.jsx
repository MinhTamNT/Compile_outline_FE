import React from "react";

export const CourseTable = ({ requirements }) => {
  const labels = [
    { id: 1, title: "STT/No." },
    { id: 2, title: "Môn học điều kiện/Requirements" },
    { id: 3, title: "Mã môn học/Code" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y shadow-md rounded-lg">
        <thead>
          <tr>
            {labels.map((label) => (
              <th
                key={label.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {label.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requirements?.map((requirement, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {requirement.subjectRequirements.subjectName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                MH{requirement.requirements.id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
