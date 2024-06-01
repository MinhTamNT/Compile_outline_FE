import React from "react";

export const ChatUserList = ({ users, onUserSelect }) => {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <button
          key={user.id}
          className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer w-full text-left"
          onClick={() => onUserSelect(user)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full mr-4 border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.status}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
