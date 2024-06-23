import React, { useState, useEffect } from "react";
import { db } from "../../Service/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";

export const ChatMessages = ({ roomId }) => {
  console.log("roomId", roomId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);
  console.log(messages);
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        sender: currentUser?.username,
        roomId: roomId,
        timestamp: new Date(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  console.log(messages);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 p-4 h-screen overflow-y-auto bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.sender === currentUser.username
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.sender === currentUser.username
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleMessageChange}
            className="flex-1 p-2 border rounded-md mr-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
