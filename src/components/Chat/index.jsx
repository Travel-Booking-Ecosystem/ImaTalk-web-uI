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
import SockJS from 'sockjs-client';
import { overWS } from 'stompjs'
import { over } from 'stompjs';
let stompClient = null

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


    const connectWebSocket = async () => {
        let Sock = new SockJS(`http://localhost:8080/ws`);
        stompClient = over(Sock);
        await stompClient.connect({}, onConnected, onError);
    }
    const onConnected = () => {
        stompClient.subscribe('/topic/chat', onPrivateMessage);
        console.log('Connected to websocket server!');
    }

    const onError = (err) => {
        console.log(err);
        // displayPopup("Something went wrong!", "Connect to server failed!, please contact the admin!", true)
    }

    // connectWebSocket();

    const closeWebSocketConnection = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    }

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);

        console.log(payloadData);

    }

    // Scroll to the bottom when the component mounts or when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // This will trigger when messages change

    useEffect(() => {
        if (activeConversationDetail) {
            const messageArray = Object.entries(activeConversationDetail.messages).map(([messageId, message]) => message);
            setMessages(messageArray);

        }
    }, [activeConversationDetail])

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
            senderId: user.id,
            senderIsMe: true,
            content: userInput,
            createdAt: new Date().toISOString(),
            status: "sent"
        }

        if (repliedMessageId) {
            newMessage.repliedMessageId = repliedMessageId
        }

        const newMessageList = [...messages, newMessage];

        setMessages(newMessageList);
        setUserInput("");
        // if user is replying to a message, clear the replied message
        if (repliedMessageId) {
            setRepliedMessageId(null);

        }
        sendMessageToServer(newMessage);


    }


    const sendMessageToServer = async (message) => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const body = {
            conversationId: activeConversationDetail.conversationId,
            content: message.content,
            repliedMessageId: message.repliedMessageId
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/send-direct-message`, body, header)
        const newMessage = response.data.data;
        if (newMessage) {
            console.log("newMessage", newMessage);
        }
    }



    // wait for user to be loaded
    if (!user || !activeConversationDetail) return null;


    let otherUser = Object.entries(activeConversationDetail.members).filter(([id, member]) => id != user.id)[0][1];
    // clean the code, create a state for message array
    function getRepliedMessageIfAny(message) {
        if (!message.repliedMessageId) return null;
        const repliedMessage = activeConversationDetail.messages[message.repliedMessageId];
        // the replied message won't contain the sender's name, so we need to add it
        const repliedMessageContent = repliedMessage.content;
        const repliedMessageSender = activeConversationDetail.members[repliedMessage.senderId].displayName;

        return {
            content: repliedMessageContent,
            sender: repliedMessageSender
        }
    }

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
                                messages.map((message, index) => {

                                    const isMe = message.senderId == user.id;
                                    const previousMessage = index > 0 ? messages[index - 1] : null;
                                    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
                                    const sender = activeConversationDetail.members[message.senderId];
                                    return (
                                        <Message
                                            isMe={isMe}
                                            repliedMessage={getRepliedMessageIfAny(message)}
                                            seenAvatar={otherUser.avatar}
                                            isSeen={false}
                                            isSent={false}
                                            previousMessage={previousMessage}
                                            sender={sender}
                                            message={message}
                                            nextMessage={nextMessage}
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