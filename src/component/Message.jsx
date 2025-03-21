import React from "react";

const Message = ({
  isOfUser = false,
  text = "initially empty",
  imageSource,
  userName = "empty",
  createdAt,
}) => {
  return (
    <div
      className={`bg-transparent w-full flex text-white gap-2 text-sm mb-2 mt-4 ${
        isOfUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isOfUser && (
        <div className="rounded-[3rem] overflow-hidden w-[2.5rem] h-[2.5rem]">
          <img
            src={imageSource}
            alt="avatar"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="w-[15rem] p-4 text-start bg-blue-600 rounded-xl h-auto relative pb-8">
        {text}
        <div
          className={`bottom-2 text-xs font-light absolute ${
            !isOfUser ? "right-4" : "left-4"
          }`}
        >
          {new Date(createdAt).toDateString()}
        </div>
      </div>
      {isOfUser && (
        <div className="rounded-[3rem] overflow-hidden w-[2.5rem] h-[2.5rem]">
          <img
            src={imageSource}
            alt="avatar"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
