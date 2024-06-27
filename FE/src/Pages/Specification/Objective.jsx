import React from "react";

const Objective = ({ objectiveSubject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              STT/No.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Mô tả mục tiêu môn học / Course objectives
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {objectiveSubject?.map((objective, index) => (
            <tr key={objective.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                {objective.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Objective;
