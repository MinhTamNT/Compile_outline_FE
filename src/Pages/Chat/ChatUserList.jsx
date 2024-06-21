import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ChatUserList = ({ users, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const currentUser = useSelector((state) => state?.user?.user?.currentUser);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      {filteredUsers.map((user) => {
        if (
          currentUser?.username === user.username ||
          user.role !== "ROLE_LECTURER"
        ) {
          return null;
        }
        return (
          <button
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer w-full text-left"
            onClick={() => onUserSelect(user)} 
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full mr-4 border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user.username}
              </h2>
              <p className="text-sm text-gray-600">{user.status}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatUserList;
