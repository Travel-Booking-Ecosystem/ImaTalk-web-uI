import "./style.scss";
import React, { useState, useContext, useRef, useEffect } from "react";
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

export default function () {
    {/* TODO: if the time between messages is too small, they are displayed very closed to each other */ }

    const { activeConversationInfo } = useContext(DirectConversationContext);
    const { user, token } = useContext(UserContext);
    // const [stompJsClient.current, setStompJsClient.current] = useState(null);
    const stompJsClient = useRef(null);
    // const user = user;
    //TODO: clean all the code (every component)

    const chatBodyRef = useRef(null);
    const inputBoxRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [currentConversation, setCurrentConversation] = useState({
        conversationId: null,
        conversationName: null,
        conversationAvatar: null,
        members: {}, // this is a map of users, key is the user id, value is the user object
        messageMap: {}, // this is a map of messages, key is the message id, value is the message object (for easy access)
        messageList: [], // this is the list of messages, used to display the messages in the chat box
    });

    const [repliedMessageId, setRepliedMessageId] = useState(null);

    useEffect(() => {
        connectWebSocket();
        return () => {
            closeWebSocketConnection();
        }
    }, [])

    useEffect(() => {
        if (activeConversationInfo) {
            fetchConversationDetail(activeConversationInfo.id);
        }
    }, [activeConversationInfo])

    const fetchConversationDetail = async () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const id = activeConversationInfo.id;
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/get-direct-conversation-messages?conversationId=${id}`, header)
        const data = response.data.data;

        const conversation = {
            conversationId: data.conversationId,
            conversationName: data.conversationName,
            conversationAvatar: data.conversationAvatar,
            otherUsers: data.otherUsers,
            members: data.members,
            messageMap: data.messages, // the server returns a map of messages, key is the message id, value is the message object
            messageList: Object.values(data.messages)
        }

        setCurrentConversation(conversation);

    }

    const connectWebSocket = async () => {
        // fix the bug he value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribut
        let Sock = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
        stompJsClient.current = over(Sock);
        await stompJsClient.current.connect({}, onConnected, onError);

    }   


    const onConnected = () => {
        if (stompJsClient.current && stompJsClient.current.connected) {
            stompJsClient.current.subscribe('/topic/chat', onReceivedMessage);
        }
    }

    const onError = (err) => {
        console.log(err);
        // displayPopup("Something went wrong!", "Connect to server failed!, please contact the admin!", true)
    }

    // connectWebSocket();

    const closeWebSocketConnection = () => {
        if (stompJsClient.current && stompJsClient.current.connected ) {
            stompJsClient.current.disconnect();
        }
    }

    const onReceivedMessage = (payload) => {
        console.log("=====================ON RECEIVED MESSAGE============================");
        let message = JSON.parse(payload.body);
        console.log(message);

        setCurrentConversation(prev => {
            return {
                ...prev,
                messageMap: {...prev.messageMap, [message.id]: message},
                messageList:  [...prev.messageList, message]
            }
        })

    }

    // Scroll to the bottom when the component mounts or when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [currentConversation.messageList]); // This will trigger when messages change

    // Function to scroll to the bottom of the chat body
    function scrollToBottom() {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }

    const handleUserInput = () => {
        if (userInput.trim() == "") return;

        const newMessage = {
            content: userInput
        }

        if (repliedMessageId) {
            newMessage.repliedMessageId = repliedMessageId
        }


        setUserInput("");
        // if user is replying to a message, clear the replied message
        if (repliedMessageId) {
            setRepliedMessageId(null);

        }
        sendMessageToServer(newMessage, currentConversation.conversationId);
    }


    const sendMessageToServer = async (message) => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const body = {
            conversationId: currentConversation.conversationId,
            content: message.content,
            repliedMessageId: message.repliedMessageId
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/test`, body, header)
        const newMessage = response.data.data;

    }



    // wait for data to be loaded
    if (!user || !currentConversation) return null;

    // clean the code, create a state for message array
    function getRepliedMessageIfAny(repliedMessageId) {
        if (!repliedMessageId) return null;
        const repliedMessage = getMessageById(repliedMessageId);
        const repliedMessageSender = getMessageSender(repliedMessageId);
        return {
            messageContent: repliedMessage.content,
            senderName: repliedMessageSender.displayName
        }
    }

    function getMessageSender(messageId) {
        const repliedMessage = currentConversation.messageMap[messageId];
        const senderId = repliedMessage.senderId;
        return currentConversation.members[senderId];
    }

    function getPreviousMessage(index) {
        if (index == 0) return null;
        return currentConversation.messageList[index - 1];
    }

    function getNextMessage(index) {
        if (index == currentConversation.messageList.length - 1) return null;
        return currentConversation.messageList[index + 1];
    }

    function getMessageById(id) {
        return currentConversation.messageMap[id];
    }



    return (
        <ReplyMessageContext.Provider value={{ repliedMessageId, setRepliedMessageId, inputBoxRef }}>
            {currentConversation &&

                <div className="chat">
                    <div className="chat-header">
                        <div className="avatar">
                            <img src={currentConversation.conversationAvatar} alt="" />
                        </div>
                        <div className="name">{currentConversation.conversationName}</div>
                    </div>
                    <div className="chat-body" ref={chatBodyRef}>
                        <div className="message-container">
                            {
                                currentConversation.messageList.map((message, index) => {
                                    const isMe = message.senderId == user.id;
                                    const previousMessage = getPreviousMessage(index)
                                    const nextMessage = getNextMessage(index)
                                    const sender = getMessageSender(message.id)
                                    const repliedMessage = getRepliedMessageIfAny(message.repliedMessageId)

                                    return (
                                        <Message
                                            isMe={isMe}
                                            repliedMessage={repliedMessage}
                                            seenAvatar={null} // skip this for now
                                            isSeen={false} // skip this for now
                                            isSent={false} // skip this for
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
                            <ReplyToInputFooter {...getRepliedMessageIfAny(repliedMessageId)}
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