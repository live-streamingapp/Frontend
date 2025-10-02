import React, { useState, useRef, useEffect } from "react";
import Header from "../Header/Header";
import { IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdChat } from "react-icons/md";
import axios from "axios";
import socket from "../../utils/socket.js";
import { Socket } from "socket.io-client";

const AstrologerChat = ({ astrologerId, studentId }) => {
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          { withCredentials: true }
        );
        setStudents(res.data.data.students); // students array
        if (res.data.data.students.length) {
          setActiveStudentId(res.data.data.students[0]._id); // default active student
        }
        console.log("students", res.data.data.students);
      } catch (err) {
        console.log("something went wrong", err);
      }
    };
    fetchStudents();
  }, []);
  useEffect(() => {
    if (!astrologerId || !activeStudentId) return;

    socket.emit("joinChat", {
      userId: astrologerId,
      targetUserId: activeStudentId,
    });
  }, [astrologerId, activeStudentId]);

  // Fetch chat messages for active student
  useEffect(() => {
    if (!activeStudentId || !astrologerId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/chats/chat?userId=${astrologerId}&targetUserId=${activeStudentId}`,
          { withCredentials: true }
        );
        setMessages(
          (res.data.messages || []).map((msg) => ({
            ...msg,
            time: new Date(msg.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      } catch (err) {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [activeStudentId, astrologerId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      name: "Astrologer", // Or fetch actual name
      userId: astrologerId,
      targetUserId: activeStudentId,
      message: newMessage,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setNewMessage("");
  };

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "them",
          text: msg.message,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const activeStudent = students.find((s) => s._id === activeStudentId);

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
            Students
            <div className="hidden max-[600px]:block cursor-pointer rounded-full">
              <RxCross2 onClick={() => setShowSidebar(false)} />
            </div>
          </h2>

          <div className="overflow-y-auto max-h-[80vh]">
            {students.map((student) => (
              <div
                key={student._id}
                onClick={() => {
                  setActiveStudentId(student._id);
                  setShowSidebar(false);
                }}
                className={`flex flex-col border-b border-gray-300 p-2 cursor-pointer ${
                  student._id === activeStudentId ? "bg-white" : ""
                }`}
              >
                <div className="font-medium">{student.name}</div>
                <div className="text-xs text-gray-500">{student.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col flex-1">
          <span className="w-fit my-[1rem] min-[600px]:hidden border text-gray-700 p-[8px] rounded-full shadow-lg cursor-pointer">
            <MdChat size={22} onClick={() => setShowSidebar(true)} />
          </span>

          {activeStudent ? (
            <>
              {/* Messages */}
              <div className="overflow-y-auto h-[500px] p-[1rem] thin-scrollbar">
                {messages.map((msg) => (
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
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-3 p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Write your reply..."
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
            </>
          ) : (
            <div className="flex justify-center items-center h-[500px] text-gray-500">
              Select a student to start chatting
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AstrologerChat;
