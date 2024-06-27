import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    getDocs,
    serverTimestamp,
    addDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRjcxoBo2ezaS89SwsrFAuEJ-4pd0sU6k",
    authDomain: "chatrealtime-cb6a0.firebaseapp.com",
    projectId: "chatrealtime-cb6a0",
    storageBucket: "chatrealtime-cb6a0.appspot.com",
    messagingSenderId: "156500470716",
    appId: "1:156500470716:web:1a180086bd4e4e056a19b9",
    measurementId: "G-DY06R8Q9NC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", async () => {
    let username = localStorage.getItem("username");
    if (!username) {
        username = prompt("Please enter your username:");
        localStorage.setItem("username", username);
    }

    let currentRoomId = null;

    const renderMessage = (text, sender, timestamp, isImage = false) => {
        const messagesContainer = document.getElementById("chat-messages");
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (sender === username) {
            messageElement.classList.add("message-incoming");
        } else {
            messageElement.classList.add("message-outgoing");
        }

        let messageContent = isImage ?
            `<img src="${text}" alt="${text}" class="message-image" width="100" height="100">` :
            `<p>${text}</p>`;

        messageElement.innerHTML = `
            <div class="message-content" style="display: flex;flex-direction: column; margin: 10px">
                ${messageContent}
                <span class="message-time">${formatDate(timestamp)}</span>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    };

    // Function to format timestamp
    const formatDate = (timestamp) => {
        return timestamp.toDate().toLocaleTimeString();
    };

    const startChatWithUser = async (selectedId, isRoom = false) => {
        try {
            let roomId = selectedId;

            if (!isRoom) {
                const roomQuery = query(
                    collection(db, 'rooms'),
                    where('members', 'array-contains', username)
                );
                const roomSnapshot = await getDocs(roomQuery);
                roomSnapshot.forEach(doc => {
                    const room = doc.data();
                    if (room.members.includes(selectedId)) {
                        roomId = doc.id;
                    }
                });

                if (selectedId !== roomId) {
                    const roomData = {
                        members: [username, selectedId],
                        createdAt: serverTimestamp()
                    };
                    const newRoomRef = await addDoc(collection(db, 'rooms'), roomData);
                    roomId = newRoomRef.id;
                }
            }

            currentRoomId = roomId;

            const messagesQuery = query(
                collection(db, 'messages'),
                where('roomId', '==', currentRoomId),
                orderBy('timestamp')
            );
            onSnapshot(messagesQuery, (querySnapshot) => {
                const messagesContainer = document.getElementById("chat-messages");
                messagesContainer.innerHTML = "";
                querySnapshot.forEach(doc => {
                    const message = doc.data();
                    renderMessage(message.text, message.sender, message.timestamp, message.isImage,);
                });
            });

        } catch (error) {
            console.error("Error starting chat: ", error);
        }
    };

    // Event listener for the send button
    document.getElementById("send-button").addEventListener("click", async () => {
        const messageInput = document.getElementById("message-input");
        const fileInput = document.getElementById("file-input");
        const text = messageInput.value.trim();
        const file = fileInput.files[0];
        console.log(file)

        if (text && currentRoomId || file && currentRoomId) {
            try {
                if (file) {
                    const storageRef = ref(storage, "images/" + file.name);
                    const uploadTask = uploadBytesResumable(storageRef,file)
                    const snapshot = await  uploadTask;
                    const imageUrl = await getDownloadURL(snapshot.ref);
                    await addDoc(collection(db, "messages"), {
                        text: imageUrl,
                        sender: username,
                        roomId: currentRoomId,
                        timestamp: new Date(),
                        isImage: true
                    })
                } else {
                    await addDoc(collection(db, 'messages'), {
                        text: text,
                        sender: username,
                        roomId: currentRoomId,
                        timestamp: new Date(),
                        isImage: false,
                    });
                }

                messageInput.value = "";
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        } else {
            console.log("Message input is empty or no room selected");
        }
    });

    const renderRooms = (rooms) => {
        const chatListContainer = document.querySelector('.chat-list');
        chatListContainer.innerHTML = '';

        rooms.forEach(room => {
            const roomItem = document.createElement('div');
            roomItem.classList.add('p-2', 'border-bottom');
            roomItem.innerHTML = `
                <a href="#!" class="d-flex justify-content-between room-item" data-room-id="${room.id}">
                    <div class="d-flex flex-row">
                        <div>
                            <img src="https://via.placeholder.com/60" alt="avatar" class="d-flex align-self-center me-3 rounded-circle" width="60">
                        </div>
                        <div class="pt-1">
                            <p class="fw-bold mb-0"> Dang chat ${room.members[0]}</p>
                        </div>
                    </div>
                </a>
            `;
            chatListContainer.appendChild(roomItem);

            // Add event listener to each room item
            roomItem.addEventListener('click', async (event) => {
                event.preventDefault(); // Prevent default link behavior
                const selectedRoomId = room.id;
                await startChatWithUser(selectedRoomId, true); // Pass true to indicate it's a room
            });
        });
    };

    // Function to fetch and render list of rooms in real-time
    const fetchUserRooms = async () => {
        const username = localStorage.getItem("username");
        if (!username) {
            console.log("Username not found in localStorage");
            return;
        }

        const roomsQuery = query(
            collection(db, 'rooms'),
            where('members', 'array-contains', username)
        );

        onSnapshot(roomsQuery, (querySnapshot) => {
            const userRooms = [];
            querySnapshot.forEach(doc => {
                userRooms.push({id: doc.id, ...doc.data()});
            });
            renderRooms(userRooms);
        }, (error) => {
            console.error("Error fetching user's rooms: ", error);
        });
    };

    fetchUserRooms();
});
