import React from "react";

const CourseTable = () => {
  const requirements = [
    { id: 1, type: "Mathematics" },
    { id: 2, type: "Physics" },
  ];

  const specification = {
    subject: {
      subjectRequirements: [
        {
          id: 1,
          subjectName: "Calculus",
          requirements: { id: 1 },
        },
        {
          id: 2,
          subjectName: "Linear Algebra",
          requirements: { id: 1 },
        },
        {
          id: 3,
          subjectName: "Mechanics",
          requirements: { id: 2 },
        },
      ],
    },
  };

  const labels = [
    { id: 1, title: "STT/No." },
    { id: 2, title: "Môn học điều kiện/Requirements" },
    { id: 3, title: "Mã môn học/Code" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y shadow-md rounded-lg">
        <thead className="">
          <tr>
            {labels.map((label) => (
              <th
                key={label.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {label.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requirements.map((r, rIndex) => (
            <React.Fragment key={r.id}>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rIndex + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {r.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              </tr>
              {specification.subject.subjectRequirements
                .filter((sR) => sR.requirements.id === r.id)
                .map((sR) => (
                  <tr key={sR.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pl-8">
                      {sR.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      MH{sR.id}
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
