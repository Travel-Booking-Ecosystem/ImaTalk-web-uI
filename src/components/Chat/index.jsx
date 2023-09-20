import "./style.scss";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Message from "../Message";


export default function () {
    {/* TODO: if the time between messages is too small, they are displayed very closed to each other */ }


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

    const hardCodedMessages = [
        {
            id: 1,
            user: minamino,
            content: "Hello, can you hear me?",
            time: "2:12:30 PM"
        },
        {
            id: 2,
            user: billieEilish,
            content: "It's not true, tell me I've been lied to",
            time: "2:12:30 PM"
        },
        {
            id: 3,
            user: billieEilish,
            content: "Crying isn't like you, ooh",
            time: "9:12:30 PM"
        },
        {
            id: 4,
            user: billieEilish,
            content: "What the hell did I do?",
            time: "9:12:30 PM"
        },
        {
            id: 5,
            user: billieEilish,
            content: "Never been the type to",
            time: "9:12:30 PM"
        },
        {
            id: 6,
            user: billieEilish,
            content: "Let someone see right through, ooh",
            time: "9:12:30 PM"
        },
        {
            id: 7,
            user: billieEilish,
            content: "Ooh ooh ooh ooh ooh",
            time: "9:12:30 PM"
        },
        {
            id: 8,
            user: minamino,
            content: "Maybe won't you take it back?",
            time: "9:12:30 PM"
        },
        {
            id: 9,
            user: minamino,
            content: "Say you were tryna make me laugh",
            time: "9:12:30 PM"
        },
        {
            id: 10,
            user: minamino,
            content: "And nothing has to change today",
            time: "9:12:30 PM"
        },
        {
            id: 11,
            user: billieEilish,
            content: "Byte my tongue, bide my time",
            time: "9:12:30 PM"
        },
        {
            id: 11,
            user: billieEilish,
            content: "Wearing a warning sign",
            time: "9:12:30 PM"
        },
        {
            id: 11,
            user: billieEilish,
            content: "Wait 'til the world is mine",
            time: "9:12:30 PM"
        }

    ]



    // // duplicate the messages array 100 times
    // for (var i = 0; i < 3; i++) {
    //     messages.push(...messages);
    // }
    const chatBodyRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([])
 

    useEffect(() => {
        setMessages(hardCodedMessages);
    }, []); // This will trigger only once

    // Scroll to the bottom when the component mounts or when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // This will trigger when messages change



    // Function to scroll to the bottom of the chat body
    function scrollToBottom() {
        console.log(chatBodyRef.current);
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
            time: new Date().toLocaleTimeString()
        }

        setMessages([...messages, newMessage]);
        setUserInput("");
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="avatar">
                    <img src="https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg" alt="" />
                </div>
                <div className="name">Billie Eilish</div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                <div className="message-container">
                    {messages.map((item, index) => {
                        console.log("item");
                        console.log(item);
                        console.log("user");
                        console.log(item.user);
                        console.log("user.id");
                        console.log(item.user.id);
                        console.log("currentUser");
                        console.log(currentUser.id);
                        const isMe = item.user.id == currentUser.id;
                        // hide the avatar if the previous message is from the same user
                        const hideAvatar = index > 0 && messages[index - 1].user.id == item.user.id;
                        // shide the time if the next message is from the same user
                        const hideTime = index < messages.length - 1 && messages[index + 1].user.id == item.user.id

                        return (
                            <Message isMe={isMe}
                                hideAvatar={hideAvatar}
                                hideTime={hideTime}
                                avatar={item.user.avatar}
                                content={item.content}
                                time={item.time} />
                        )

                    })}

                </div>
            </div>
            <div className="chat-footer">
                <div className="input-container">
                    <input
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
    )
}