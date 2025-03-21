import { useState } from "react";
import "./App.css";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Chat from "./component/Chat";
import RoomForm from "./component/RoomForm";

function App() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState("");

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const { uid, displayName, photoURL } = await auth.currentUser;
    await addDoc(collection(db, "Users"), {
      name: displayName,
      avatar: photoURL,
      createdAt: Date.now(),
      uid,
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="text-xl w-full h-screen px-[5%] text-center font-semibold flex flex-col">
      <div className="flex justify-between w-full h-auto items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-900">
          Chat App
        </h1>
        {user && <h2>Welcome {user.displayName}</h2>}
        {user ? (
          <button
            onClick={signOut}
            className="border-gray border-2 rounded-xl font-bold p-4 text-center w-[13rem] cursor-pointer bg-[#d59d80]"
          >
            SignOut
          </button>
        ) : (
          <button
            onClick={googleSignIn}
            className="border-black border-2 rounded-xl font-bold p-4 text-center w-[13rem] cursor-pointer bg-[#d59d80]"
          >
            Google Sign in
          </button>
        )}
      </div>
      {!user && (
        <div className="w-full h-[25rem] flex justify-center items-center font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-800">
          Welcome to the Chat Application, Sign in to Continue.
        </div>
      )}
      {user && currentRoom && (
        <Chat setCurrentRoom={setCurrentRoom} room={currentRoom} />
      )}
      {user && !currentRoom && <RoomForm setCurrentRoom={setCurrentRoom} />}
    </div>
  );
}

export default App;
