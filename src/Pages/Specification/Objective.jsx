import React from "react";

const Objective = () => {
  const requirements = [
    { id: 1, type: "Mathematics" },
    { id: 2, type: "Physics" },
  ];

  const specification = {
    subject: {
      subjectRequirements: [
        {
          id: 1,
          objectiveNumber: 1,
          objectiveDescription: "Study calculus concepts thoroughly.",
          requirements: { id: 1 },
        },
        {
          id: 2,
          objectiveNumber: 2,
          objectiveDescription: "Master linear algebra techniques.",
          requirements: { id: 1 },
        },
        {
          id: 3,
          objectiveNumber: 1,
          objectiveDescription: "Understand principles of mechanics.",
          requirements: { id: 2 },
        },
      ],
    },
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
        <thead className="">
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
          {requirements.map((req, reqIndex) => (
            <React.Fragment key={req.id}>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {reqIndex + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {specification.subject.subjectRequirements
                    .filter((sR) => sR.requirements.id === req.id)
                    .map((sR) => (
                      <div key={sR.id}>
                        <div className="font-medium">{sR.objectiveNumber}</div>
                        <div>{sR.objectiveDescription}</div>
                      </div>
                    ))}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Objective;
