import React, { useState } from "react";

const sampleMessages = [
  { id: 1, text: "Hello!", sender: "John Doe" },
  { id: 2, text: "Hi there!", sender: "You" },
  { id: 3, text: "How are you?", sender: "John Doe" },
  { id: 4, text: "I'm good, thanks!", sender: "You" },
];

export const ChatMessages = ({ user }) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg mr-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
