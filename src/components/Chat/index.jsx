import "./style.scss";
import React, { useState, useContext, useRef, useEffect } from "react";
import Message from "../Message";
import ReplyMessageContext from "../../contexts/ReplyMessageContext";
import ReplyTo from "../Message/ReplyTo";
import ReplyToInputFooter from "./ReplyToInputFooter";
import ConversationContext from "../../contexts/ConversationContext";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import LoadingContext from "../../contexts/LoadingContext";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Logo from '../../assests/images/dsy-logo.png'
export default function ({ chatbox }) {

    // const { chatbox } = useContext(ConversationContext);
    // const chatbox = null;
    const { user, token } = useContext(UserContext);


    const chatBodyRef = useRef(null);
    const inputBoxRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [repliedMessageId, setRepliedMessageId] = useState(null);
    // Scroll to the bottom when the component mounts or when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [chatbox]); // This will trigger when messages change

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
        sendMessageToServer(newMessage, chatbox.conversationId);
    }


    const sendMessageToServer = async (message) => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const body = {
            conversationId: chatbox.conversationId,
            content: message.content,
            repliedMessageId: message.repliedMessageId
        }

        
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/send-message`, body, header)
        // console.log();
        const newMessage = response.data.data;

    }




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
        const repliedMessage = chatbox.messageMap[messageId];
        const senderId = repliedMessage.senderId;
        return chatbox.memberMap[senderId];
    }

    function getPreviousMessage(index) {
        if (index == 0) return null;
        return chatbox.messageList[index - 1];
    }

    function getNextMessage(index) {
        if (index == chatbox.messageList.length - 1) return null;
        return chatbox.messageList[index + 1];
    }

    function getMessageById(id) {
        return chatbox.messageMap[id];
    }

    const toggleShowEmojiPicker = () => {
        console.log("toggleShowEmojiPicker");
        setShowEmojiPicker(val => !val);
    }

    const handleEmojiSelect = (emoji) => {
        console.log("handleEmojiSelect", emoji);
        setUserInput(val => val + emoji.native);
        inputBoxRef.current.focus();
        // setShowEmojiPicker(false);
    }




    // const style = (loading) ? "skeleton-Chat" : "";
    const style = (!chatbox.conversationName && !chatbox.conversationAvatar) ? "skeleton-Chat" : "";

    // if (!chatbox.conversationName && !chatbox.conversationAvatar) {
        
    //     return <GreetingChat />
    // }


    return (
        <ReplyMessageContext.Provider value={{ repliedMessageId, setRepliedMessageId, inputBoxRef }}>
            <div className={`Chat ${style}`}>

                <div className="chat-header">
                    <div className="avatar">
                        <img src={chatbox.conversationAvatar} alt="" />
                    </div>
                    <div className="name">{chatbox.conversationName}</div>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    <div className="message-container">
                        {
                            chatbox.messageList.map((message, index) => {
                                const isMe = message.senderId === user.id;
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
                        <i class="fa-regular fa-face-smile" onClick={toggleShowEmojiPicker}></i>
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

                        {
                            showEmojiPicker &&
                            <div className="emoji-picker">
                                <Picker data={data}
                                    onEmojiSelect={handleEmojiSelect}
                                    theme={"light"}
                                // onClickOutside={() => {
                                //     if (sho)
                                // }}
                                />
                            </div>
                        }

                        <i class="fa-solid fa-paper-plane" onClick={handleUserInput}></i>
                    </div>
                </div>
            </div>


        </ReplyMessageContext.Provider>

    )
}

//TODO: clean all the code when new user login, he has no conversation, no chatbox, no message, no member, no conversationName, no conversationAvatar
function GreetingChat() {
    return (
        <div className="GreetingChat">
            <div className="content">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <p className="title">Wellcome to ImaTalk</p>
                <p className="text">Search and add friends to start your conversation now!</p>
            </div>
        </div>
    )
}