import React from "react";

const Message = ({ message }) => {
    const curUser=localStorage.getItem("currUser");

  return (
    <div
      className={`chat-bubble ${message.uid === curUser? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};
export default Message;
