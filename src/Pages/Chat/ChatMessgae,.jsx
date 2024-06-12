import React, { useState } from "react";

export const ChatMessages = ({ user }) => {
  const [newMessage, setNewMessage] = useState(""); // State để lưu trữ nội dung tin nhắn mới
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: user.name },
    { id: 2, text: "How are you?", sender: "You" },
    { id: 3, text: "I'm good, thank you!", sender: user.name },
  ]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Chỉ gửi tin nhắn nếu nội dung không trống
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
      };
      setMessages([...messages, newMsg]);
      setNewMessage(""); // Xóa nội dung tin nhắn trong input sau khi gửi
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.sender === "You" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
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
