const ChatMessage = ({ message }) => {
  const isUser = message.sender === "me";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs ${isUser ? "order-2" : ""}`}>
        <div
          className={`p-3 rounded-lg ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          <p>{message.text}</p>
          <span className="text-xs text-gray-400 mt-2 block">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
