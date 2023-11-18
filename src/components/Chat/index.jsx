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
import GreetingChat from "./GreetingChat";
export default function ({ chatbox }) {

    // const { chatbox } = useContext(ConversationContext);
    // const chatbox = null;
    const { user, token } = useContext(UserContext);

    const inputBoxRef = useRef(null);
    const inputContainerRef = useRef(null);
    const textareaHeight = useState(45)

    const chatBodyRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [repliedMessageId, setRepliedMessageId] = useState(null);

    // when user click outside the emoji picker, close the emoji picker
    useEffect(() => {
        function handleClickOutside(event) {
            console.log("click outside");
            // console.log(inputBoxRef.current);
            // console.log("=", inputBoxRef.current?.contains(event.target));
            if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        // set the height of the textarea to fit the content
        // max is 100px
        // when the user delete all the text, set the height back to 40px
        if (userInput.trim() == "") {
            console.log("WOW: 40px");
            inputBoxRef.current.style.height = "40px";
            return
        }

        inputBoxRef.current.style.height = `${Math.min(inputBoxRef.current.scrollHeight, 200)}px`;


    }, [userInput])

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
        console.log("user input: ", userInput);
        const newMessage = {
            content: userInput
        }

        if (repliedMessageId) {
            newMessage.repliedMessageId = repliedMessageId
        }


        // set the input box back to empty 
        setUserInput('');

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

        // add new message to the list

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/send-message`, body, header)

        // if respose is success, then modify the message to be "sent"
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
        setShowEmojiPicker(val => !val);
    }

    const handleEmojiSelect = (emoji) => {
        setUserInput(val => val + emoji.native);
        console.log("user input: ", userInput + emoji.native);

        inputBoxRef.current.focus();
        // setShowEmojiPicker(false);
    }




    // const style = (loading) ? "skeleton-Chat" : "";
    const style = (!chatbox.conversationName && !chatbox.conversationAvatar) ? "skeleton-Chat" : "";

    // if (!chatbox.conversationName && !chatbox.conversationAvatar) {

    //     return <GreetingChat />
    // }

    if (chatbox.renderGreetingChat) {
        return <GreetingChat

            userAvatar={user.avatar}
            userDisplayName={user.displayName}
        />
    }

    return (
        <ReplyMessageContext.Provider value={{ repliedMessageId, setRepliedMessageId, inputBoxRef }}>
            <div className={`Chat ${style}`}>
                <div className="chat-area">
                    <div className="chat-header">
                        <div className="info">
                            <div className="avatar">
                                <img src={chatbox.conversationAvatar} alt="" />
                            </div>
                            <div className="name">{chatbox.conversationName}</div>
                        </div>

                        <div className="btn-container">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <i class="fa-solid fa-video"></i>
                            <i class="fa-solid fa-phone"></i>
                            <i class="fa-solid fa-info"></i>

                        </div>

                    </div>
                    <div className="chat-body" ref={chatBodyRef}>

                        <div className="message-container">

                            {
                                chatbox.messageList.length > 0 ?
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

                                    :
                                    <div className="no-message">
                                        {/* <img src={Logo} alt="" /> */}
                                        <p className="bold">Start a conversation now</p>
                                    </div>
                            }


                        </div>

                    </div>

                    <div className="chat-footer">
                        {repliedMessageId &&
                            <ReplyToInputFooter {...getRepliedMessageIfAny(repliedMessageId)}
                            />
                        }


                        <div className="input-container" ref={inputContainerRef}>
                            <div className="input-box">
                                <i class="fa-regular fa-face-smile" onClick={toggleShowEmojiPicker}></i>
                                <textarea
                                    ref={inputBoxRef}
                                    type="text"
                                    placeholder="Type a message..."
                                    value={userInput}
                                    onChange={e => {
                                        // remove all the new line character at the beginning of the string
                                        let value = e.target.value;
                                        value = value.replace(/^\n+/, "");
                                        setUserInput(value);
                                    }}
                                    onKeyDown={e => {
                                        // if user presses shift + enter, do nothing
                                        if (e.key == "Enter" && !e.shiftKey) {
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
                                            emojiSize={20}

                                        // onClickOutside={() => {
                                        //     if (sho)
                                        // }}
                                        />
                                    </div>
                                }

                                <i class="fa-regular fa-paper-plane" onClick={handleUserInput}></i>

                            </div>

                            <div className="default-emoji">
                                {/* <i class="fa-solid fa-heart heart"></i> */}
                                {/* <i class="fa-solid fa-face-smile smile"></i> */}
                                <i class="fa-solid fa-thumbs-up like"></i>
                            </div>

                        </div>


                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="profile">
                        <img className='avatar' src="https://images.unsplash.com/photo-1699694927074-cb6a828dd255?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDh8fHxlbnwwfHx8fHw%3D" alt='' />
                        <div className="name">User Display Name</div>
                        <div className="chat-type">Friend</div>
                    </div>

                    <div className="info">
                        <div className="email"><span className="bold">Email: </span>Loremipsum@test.com</div>
                        <div className="phone"><span className="bold">Phone: </span>0123456789</div>
                        <div className="city"><span className="bold">City: </span>Hanoi</div>
                        <div className="country"><span className="bold">Country: </span>Vietnam</div>
                    </div>

                    <div className="action-container">
                        <div className="bold action">Edit nickname</div>
                        <div className="bold action">Change chat theme color <p className="color-circle"></p></div>
                        <div className="bold action">Change chat background</div>
                        <div className="bold action">Change default react emoji</div>
                        <div className="bold action block-contact-btn">Block Contact</div>
                    </div>
                </div>
                {/* <div className="right-sidebar">
                    <div className="profile">
                        <img className='avatar' src="https://images.unsplash.com/photo-1699694927074-cb6a828dd255?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDh8fHxlbnwwfHx8fHw%3D" alt='' />
                        <div className="name">User Display Name</div>
                        <div className="chat-type">Group</div>
                    </div>

                    <div className="member-list">
                        <p className="bold">Member List</p>
                        <div className="member">
                            <img className="avatar" src="https://plus.unsplash.com/premium_photo-1699389000894-8e99c0e31bf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" alt="" />
                            <div className="member_info">
                                <div className="name">John Doe</div>
                                <div className="role">Admin</div>
                            </div>
                        </div>
                        <div className="member">
                            <img className="avatar" src="https://plus.unsplash.com/premium_photo-1699389000894-8e99c0e31bf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" alt="" />
                            <div className="member_info">
                                <div className="name">John Doe</div>
                                <div className="role">Admin</div>
                            </div>
                        </div>
                        <div className="member">
                            <img className="avatar" src="https://plus.unsplash.com/premium_photo-1699389000894-8e99c0e31bf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" alt="" />
                            <div className="member_info">
                                <div className="name">John Doe</div>
                                <div className="role">Admin</div>
                            </div>
                        </div>
                        <div className="member">
                            <img className="avatar" src="https://plus.unsplash.com/premium_photo-1699389000894-8e99c0e31bf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" alt="" />
                            <div className="member_info">
                                <div className="name">John Doe</div>
                                <div className="role">Admin</div>
                            </div>
                        </div>
                    </div>

                    <div className="action-container">
                        <div className="bold action">Change chat theme color <p className="color-circle"></p></div>
                        <div className="bold action">Change chat background</div>
                        <div className="bold action">Change default react emoji</div>
                        <div className="bold action block-contact-btn">Leave Group</div>
                    </div>
                </div> */}
            </div>


        </ReplyMessageContext.Provider>

    )
}

//TODO: clean all the code when new user login, he has no conversation, no chatbox, no message, no member, no conversationName, no conversationAvatar
