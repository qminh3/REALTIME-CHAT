import React, { useRef } from "react";

const RoomForm = ({ setCurrentRoom }) => {
  let inputRef = useRef(null);

  return (
    <div
      className="w-full h-full  py-4 flex items-center justify-center 
    "
    >
      <div className="w-[22rem] h-[22rem] flex flex-col justify-center items-center gap-4 bg-[#daf1de] rounded-xl mb-2.5 ">
        <h3 className=" font-semibold text-2xl">
          Enter the ID to join the Chat Room
        </h3>
        <input
          autoFocus
          ref={inputRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              //joining the room
              setCurrentRoom(inputRef.current.value);
            }
          }}
          type="text"
          placeholder="Enter Room-Id"
          className="p-5 font-medium focus:outline-none border-2 border-gray-700 rounded-lg text-center"
        />
        <button
          onClick={() => setCurrentRoom(inputRef.current.value)}
          className="p-5 bg-[#163832] text-white rounded-lg cursor-pointer m-4"
        >
          Enter Chat Room
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
