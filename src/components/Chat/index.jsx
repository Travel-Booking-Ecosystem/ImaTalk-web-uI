import "./style.scss";
import React, { useState, useContext } from "react";
import { useEffect, useRef } from "react";
import Message from "../Message";
import ReplyMessageContext from "../../contexts/ReplyMessageContext";
import ReplyTo from "../Message/ReplyTo";
import ReplyToInputFooter from "./ReplyToInputFooter";
import DirectConversationContext from "../../contexts/DirectConversationContext";

export default function () {
    {/* TODO: if the time between messages is too small, they are displayed very closed to each other */ }

    const { currentConversation, setCurrentConversation } = useContext(DirectConversationContext);
    console.log("currentConversation", currentConversation);
    const billieEilish = {
        id: 2,
        name: "Billie Eilish",
        avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg"
    }

    const minamino = {
        id: 1,
        name: "Minamino",
        avatar: "https://th.bing.com/th/id/OIP.ZpNOsfN4Tzl8UMtCe7j2kwHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=1.3"
    }

    const currentUser = minamino;


    const chatBodyRef = useRef(null);
    const inputBoxRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([])
    const [repliedMessage, setRepliedMessage] = useState(null);


    useEffect(() => {
        console.log("currentConversation", currentConversation);
        console.log("refreshing messages");
        if (currentConversation) {
            setMessages(currentConversation.messages);
        }
    }, [currentConversation]); // This will trigger only once

    // Scroll to the bottom when the component mounts or when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // This will trigger when messages change

    // Function to scroll to the bottom of the chat body
    function scrollToBottom() {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }

    const handleUserInput = () => {
        if (userInput.trim() == "") return;

        const newMessage = {
            id: messages.length + 1,
            user: currentUser,
            content: userInput,
            time: new Date().toISOString(),
            status: "sent"
        }

        if (repliedMessage) {
            newMessage.replyTo = repliedMessage
        }

        const newMessageList = [...messages, newMessage];

        setMessages(newMessageList);
        setUserInput("");
        // if user is replying to a message, clear the replied message
        if (repliedMessage) {
            setRepliedMessage(null);

        }
    }


    return (
        <ReplyMessageContext.Provider value={{ repliedMessage, setRepliedMessage, inputBoxRef }}>
            {currentConversation && currentConversation.messages &&

                <div className="chat">
                    <div className="chat-header">
                        <div className="avatar">
                            <img src={currentConversation.avatar} alt="" />
                        </div>
                        <div className="name">{currentConversation.name}</div>
                    </div>
                    <div className="chat-body" ref={chatBodyRef}>
                        <div className="message-container">
                            {messages.map((message, index) => {

                                const isMe = message.user.id == currentUser.id;

                                return (
                                    <Message
                                        isMe={isMe}
                                        seenAvatar={currentConversation.lastSeen.user.avatar}
                                        isSeen={currentConversation.lastSeen.messageId == message.id}
                                        isSent={currentConversation.lastSent.messageId == message.id}
                                        previousMessage={index > 0 ? messages[index - 1] : null}
                                        message={message}
                                        nextMessage={index < messages.length - 1 ? messages[index + 1] : null}
                                    />
                                )

                            })}

                        </div>
                    </div>
                    <div className="chat-footer">
                        {repliedMessage &&

                            <ReplyToInputFooter repliedMessage={repliedMessage} />
                        }
                        <div className="input-container">
                            <input
                                ref={inputBoxRef}
                                type="text"
                                placeholder="Type a message..."
                                value={userInput}
                                onChange={e => setUserInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key == "Enter") {
                                        handleUserInput();
                                    }
                                }}

                            />
                            <i class="fa-solid fa-paper-plane" onClick={handleUserInput}></i>
                        </div>
                    </div>
                </div>
            }

        </ReplyMessageContext.Provider>

    )
}