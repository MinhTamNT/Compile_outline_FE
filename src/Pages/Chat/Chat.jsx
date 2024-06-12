import React, { useState } from "react";
import { ChatMessages } from "./ChatMessgae,";
import { ChatHeader } from "./ChatHeader";
import { ChatUserList } from "./ChatUserList";
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99hEiDGWLpnid1kGLmnOs8RMuyaitDLM2GA&s",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99hEiDGWLpnid1kGLmnOs8RMuyaitDLM2GA&s",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99hEiDGWLpnid1kGLmnOs8RMuyaitDLM2GA&s",
  },
];

export const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(sampleUsers[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarOpen(false); // Close sidebar on mobile when a user is selected
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity duration-200 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 overflow-y-auto z-20 transform transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/4`}
      >
        <ChatUserList  users={sampleUsers} onUserSelect={handleUserSelect} />
      </div>
      <div className="flex flex-col flex-1">
        <ChatHeader user={selectedUser} toggleSidebar={toggleSidebar} />
        <ChatMessages user={selectedUser} />
      </div>
    </div>
  );
};
