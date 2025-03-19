import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Message from "./Message";

const Chat = ({ room, setCurrentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(""); // this is input.

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter the valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, room), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: Date.now(),
      uid,
    });
    setMessage("");
    // scroll to the bottom of messages.
    scrollRef.current.scroll({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const q = query(collection(db, room), orderBy("createdAt"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let theseMessages = [];
      QuerySnapshot.forEach((doc) => {
        theseMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(theseMessages);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    scrollRef.current.scroll({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  let scrollRef = useRef(null);
  return (
    <div className="mt-10 w-full border-2 bg-[#f4e1db] shadow-xl rounded-xl p-5 h-[90%] flex flex-col relative">
      <div
        onClick={() => setCurrentRoom("")}
        className="absolute left-2 top-2 p-7 text-white bg-[#ea4040] rounded-xl text-2xl z-[30]"
      >
        Exit room
      </div>
      <div className="w-full overflow-auto h-[90%] pt-20 mt-3" ref={scrollRef}>
        {messages?.map((curr) => {
          return (
            <Message
              key={curr.uid}
              userName={curr.disaplayName}
              text={curr.text}
              imageSource={curr.avatar}
              isOfUser={auth.currentUser.displayName === curr.name}
              createdAt={curr.createdAt}
            />
          );
        })}
      </div>
      <div className="w-full rounded-xl text-sm flex justify-between absolute bottom-3 left-1 right-0 px-6 gap-4">
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 overflow-auto border-2 rounded-xl"
          autoFocus
          value={message}
        />
        <button
          onClick={sendMessage}
          className="border-2 p-3 rounded-xl bg-green-600 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
