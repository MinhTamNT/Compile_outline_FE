import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import ChatMessage from "./ChatMessgae,";

export const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "other", timestamp: "10:00 AM" },
    { id: 2, text: "Hi, how are you?", sender: "me", timestamp: "10:01 AM" },
    {
      id: 3,
      text: "I'm good, thanks!",
      sender: "other",
      timestamp: "10:02 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          sender: "me",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  const chatUser = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    status: "Online",
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader user={chatUser} />
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
      <div className="flex-none p-4 bg-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
