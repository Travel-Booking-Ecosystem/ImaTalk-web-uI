import "./style.scss";
import React, { useState, useContext } from "react";
import { useEffect, useRef } from "react";
import Message from "../Message";
import ReplyMessageContext from "../../contexts/ReplyMessageContext";
import ReplyTo from "../Message/ReplyTo";
import ReplyToInputFooter from "./ReplyToInputFooter";
import DirectConversationContext from "../../contexts/DirectConversationContext";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
export default function () {
    {/* TODO: if the time between messages is too small, they are displayed very closed to each other */ }

    const { activeConversationDetail } = useContext(DirectConversationContext);
    const { user, token } = useContext(UserContext);

    // const user = user;
    //TODO: clean all the code (every component)

    const chatBodyRef = useRef(null);
    const inputBoxRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([])
    const [repliedMessageId, setRepliedMessageId] = useState(null);


    // useEffect(() => {

    //     if (user) {
    //         // fetchConversationById(user.directConversationList[0].id);
    //     }

    // })



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
            user: user,
            content: userInput,
            time: new Date().toISOString(),
            status: "sent"
        }

        if (repliedMessageId) {
            newMessage.replyTo = repliedMessageId
        }

        const newMessageList = [...messages, newMessage];

        setMessages(newMessageList);
        setUserInput("");
        // if user is replying to a message, clear the replied message
        if (repliedMessageId) {
            setRepliedMessageId(null);

        }
    }
    // wait for user to be loaded
    if (!user || !activeConversationDetail) return null;


    let otherUser = Object.entries(activeConversationDetail.members).filter(([id, member]) => id != user.id)[0][1];
    const messageArray = Object.entries(activeConversationDetail.messages).map(([messageId, message]) => message);
    return (
        <ReplyMessageContext.Provider value={{ repliedMessageId, setRepliedMessageId, inputBoxRef }}>
            {activeConversationDetail && activeConversationDetail.messages &&

                <div className="chat">
                    <div className="chat-header">
                        <div className="avatar">
                            <img src={otherUser.avatar} alt="" />
                        </div>
                        <div className="name">{otherUser.displayName}</div>
                    </div>
                    <div className="chat-body" ref={chatBodyRef}>
                        <div className="message-container">
                            {
                                messageArray.map((message, index) => {

                                    const isMe = message.senderId == user.id;

                                    return (
                                        <Message
                                            isMe={isMe}

                                            seenAvatar={otherUser.avatar}
                                            isSeen={false}
                                            isSent={false}
                                            previousMessage={index > 0 ? messageArray[index - 1] : null}
                                            sender={activeConversationDetail.members[message.senderId]}
                                            message={message}
                                            nextMessage={index < messageArray.length - 1 ? messageArray[index + 1] : null}
                                        />
                                    )


                                })
                            }


                        </div>
                    </div>
                    <div className="chat-footer">
                        {repliedMessageId &&
                            // <p>{activeConversationDetail.members[activeConversationDetail.messages[repliedMessageId].senderId].displayName}</p> 
                            //TODO: :))
                            <ReplyToInputFooter

                                senderName={activeConversationDetail.members[activeConversationDetail.messages[repliedMessageId].senderId].displayName}
                                messageContent={activeConversationDetail.messages[repliedMessageId].content}

                            />
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