import React, { useState, useEffect } from "react";
import { ChatUserList } from "./ChatUserList";
import { db } from "../../Service/firebaseConfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessgae,";
import { ChatHeader } from "./ChatHeader";
export const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const currentUser = useSelector((state) => state?.user?.user?.currentUser);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setIsSidebarOpen(false);

    const roomId = await getOrCreateRoom(currentUser.username, user.username);
    setCurrentRoomId(roomId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const getOrCreateRoom = async (currentUsername, otherUsername) => {
    const roomsRef = collection(db, "rooms");

    const q = query(
      roomsRef,
      where("members", "array-contains-any", [currentUsername, otherUsername])
    );

    const querySnapshot = await getDocs(q);

    for (const docSnap of querySnapshot.docs) {
      const room = docSnap.data();
      if (
        room.members.includes(currentUsername) &&
        room.members.includes(otherUsername)
      ) {
        return docSnap.id; // Trả về ID của phòng chat đã có
      }
    }

    const newRoomRef = await addDoc(roomsRef, {
      members: [currentUsername, otherUsername],
      createdAt: new Date(),
    });

    return newRoomRef.id; // Trả về ID của phòng chat mới tạo
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
        <ChatUserList users={users} onUserSelect={handleUserSelect} />
      </div>
      <div className="flex flex-col flex-1">
        {selectedUser && currentRoomId && (
          <>
            <ChatHeader user={selectedUser} toggleSidebar={toggleSidebar} />
            <ChatMessages roomId={currentRoomId} />
          </>
        )}
      </div>
    </div>
  );
};
