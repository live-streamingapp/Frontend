import React, { useState, useRef, useEffect } from "react";
import Header from "../Header/Header";
import { IoMdArrowBack, IoMdArrowForward, IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdChat } from "react-icons/md";
import { GroupChatsData } from "../../utils/constants";

const StudentGroupChat = () => {
  const [chats, setChats] = useState(GroupChatsData);
  const [activeChatId, setActiveChatId] = useState(GroupChatsData[0].id);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, messageObj] }
          : chat
      )
    );

    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  return (
    <>
      <Header />
      <div className="flex mx-[1.5rem]">
        {/* Sidebar */}
        <div
          className={`fixed min-[600px]:static max-[600px]:h-screen top-[13%] left-0 bg-[#f4f4f4] border-r border-gray-300 
            transition-transform duration-300 z-50
            ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
            min-[600px]:translate-x-0 w-[300px]`}
        >
          <h2 className="my-[1rem] font-semibold text-[1.15rem] text-gray-800 flex justify-between items-center px-3">
            Group Chats
            <div className="hidden max-[600px]:block cursor-pointer rounded-full">
              <RxCross2 onClick={() => setShowSidebar(false)} />
            </div>
          </h2>

          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                setShowSidebar(false);
              }}
              className={`flex flex-col border-b border-gray-300 p-2 cursor-pointer ${
                chat.id === activeChatId ? "bg-white" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    chat.participants[0].avatar ||
                    "/images/astrologer-avatar.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{chat.name}</span>
              </div>
              <div className="text-xs text-gray-500">{chat.lastMessage}</div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex flex-col flex-1">
          <span className="w-fit my-[1rem] min-[600px]:hidden border text-gray-700 p-[8px] rounded-full shadow-lg cursor-pointer">
            <MdChat size={22} onClick={() => setShowSidebar(true)} />
          </span>
          <div className="overflow-y-auto h-[500px] p-[1rem] thin-scrollbar">
            {activeChat.messages.map((msg) => {
              const senderData = activeChat.participants.find(
                (p) => p.id === msg.sender
              );
              return (
                <div key={msg.id}>
                  <div
                    className={`flex mb-1 ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[60%] px-4 py-2 rounded-2xl min-shadow ${
                        msg.sender === "me"
                          ? "bg-[#d20000] text-white"
                          : "bg-gray-100 border border-gray-200 text-black"
                      }`}
                    >
                      {msg.sender !== "me" && (
                        <div className="text-[11px] font-semibold mb-[2px]">
                          {senderData?.name}
                        </div>
                      )}
                      {msg.text}
                    </div>
                  </div>
                  <div
                    className={`text-[10px] mx-[1rem] opacity-60 ${
                      msg.sender === "me" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3 p-3 border-t border-gray-300">
            <input
              type="text"
              placeholder="Write your query..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border border-gray-300 bg-[#ddd] rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#d20000] text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              <IoMdSend size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentGroupChat;
