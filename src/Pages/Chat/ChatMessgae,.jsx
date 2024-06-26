import React, { useState, useEffect } from "react";
import { db } from "../../Service/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { AiOutlinePicture } from "react-icons/ai";

export const ChatMessages = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedImage) return;

    try {
      if (selectedImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, "messages"), {
              text: downloadURL,
              sender: currentUser?.username,
              roomId: roomId,
              timestamp: new Date(),
              isImage: true,
            });
            setSelectedImage(null);
          }
        );
      } else {
        await addDoc(collection(db, "messages"), {
          text: newMessage,
          sender: currentUser?.username,
          roomId: roomId,
          timestamp: new Date(),
          isImage: false,
        });
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col overflow-auto flex-1">
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
              {msg.isImage ? (
                <img src={msg.text} alt="Sent Image" className="rounded h-60" />
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="mr-2">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="h-20 rounded"
          />
        </div>
      )}
      <div className="p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleMessageChange}
            className="flex-1 p-2 border rounded-md mr-2 focus:outline-none focus:ring focus:ring-blue-500"
          />

          <label htmlFor="file-input" className="cursor-pointer mr-2">
            <AiOutlinePicture size={32} />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
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
