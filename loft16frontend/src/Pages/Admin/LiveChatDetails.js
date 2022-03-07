import React, { useState, useEffect } from "react";

import { parseDateTime } from "../../Helpers/uitils";
import API from "../../Helpers/api"
import { RiMessage3Fill, RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineLoading, AiFillDelete } from "react-icons/ai";
import { Textarea } from "@windmill/react-ui";

const LiveChatDetails = ({ userId, messages, profile_info, adminData }) => {
    const [writeMsg, setWriteMsg] = useState("");
    const [sending, setSending] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  const scrollDown = () => {
    var elem = document.getElementById("messages");
    elem.scrollTop = elem.scrollHeight;
  };


  const send = async () => {
    try {
      const response = await API.post("/admin/sendMessage", {
        _id: userId,
        message: {
          type: 1,
          profile: {
            name: adminData.name,
            profile: adminData.profile_picture,
            role: adminData.role,
          },
          message: writeMsg,
          cat: new Date(),
        },
      });

      setWriteMsg('')
    } catch (e) {}
  };


  useEffect(() => {
    scrollDown();
    return () => {
      setUnmounted(true);
    };
  }, [messages]);

  return (
    <>
      <div className="col-span-3 w-full h-4/6">
        <div className="w-full">
          <div
            id="messages"
            className="w-full overflow-y-auto  space-y-4 p-10 relative scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            style={{ maxHeight: "60vh" }}
          >
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  className={`flex  ${
                    msg.type === 1 ? "justify-end" : "items-end"
                  }`}
                >
                  <div
                    className={`relative flex flex-col space-y-2 text-xs max-w-xs mx-2  ${
                      msg.type === 1
                        ? "items-end order-1"
                        : "items-start order-2"
                    }`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={parseDateTime(new Date(msg.cat))}
                  >
                    <div className="cursor-default">
                      <span
                        className={`px-4 py-2 rounded-lg inline-block rounded-br-none ${
                          msg.type === 1
                            ? "bg-blue-500 text-white "
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {msg.message}
                      </span>
                    </div>

                    {idx === 0 ? (
                      <>
                        <p
                          className="absolute font-medium text-gray-500 -top-10"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {msg.type === 1 ? (
                            "You"
                          ) : (
                            <>{profile_info.user_name}</>
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        {messages[idx - 1].type !== msg.type ? (
                          <>
                            <p
                              className="absolute font-medium text-gray-500 -top-7"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {msg.type === 1 ? "You" : <>{profile_info.name}</>}
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                  <img
                    src={
                      msg.type === 1
                        ? adminData.profile_picture
                        : profile_info.profile_picture
                    }
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={msg.type === 1 ? "You" : profile_info.user_name}
                  />
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-gray-400 text-center py-8 text-xs">
                no conversation
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-4 flex flex-row  items-center  border-t border-gray-200 pt-4">
        <Textarea
          disabled={sending }
          className={`border rounded-2xl border-transparent w-full focus:outline-none text-sm flex items-center scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ${
            sending && "animate-pulse"
          }`}
          placeholder="Type your message...."
          rows={3}
          value={writeMsg}
          onChange={(e) => {
            setWriteMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && writeMsg.length > 0)
              send(userId);
          }}
        />
        <div>
          <button
            disabled={writeMsg.length === 0 || sending }
            onClick={() => send()}
            className={`ml-3 flex items-center justify-center h-10 w-10 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 focus:outline-none ${
              writeMsg.length === 0 || sending 
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {!sending ? (
              <RiSendPlaneFill className="w-5 h-5 transform rotate-45" />
            ) : (
              <AiOutlineLoading className="h-4 w-4 animate-spin" />
            )}
          </button>
        </div>
        {sending && (
          <p
            className="absolute -bottom-8 animate-pulse"
            style={{ fontSize: "0.8rem" }}
          >
            Sending..
          </p>
        )}
      </div>
    </>
  );
};

export default LiveChatDetails;
