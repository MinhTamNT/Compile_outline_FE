import React from "react";
import { FaSpinner } from "react-icons/fa";

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <FaSpinner className="animate-spin h-12 w-12 text-white" />
    </div>
  );
};
