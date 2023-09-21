import "./style.scss";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Message from "../Message";
import ReplyMessageContext from "../../contexts/ReplyMessageContext";
import ReplyTo from "../ReplyTo";
import ReplyToInputFooter from "../ReplyToInputFooter";


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
            time: "2023-08-12T12:12:30",
            status: "sent"
        },
        {
            id: 2,
            user: billieEilish,
            content: "It's not true, tell me I've been lied to",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 3,
            user: billieEilish,
            content: "Crying isn't like you, ooh",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 4,
            user: billieEilish,
            content: "What the hell did I do?",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 5,
            user: billieEilish,
            content: "Never been the type to",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 6,
            user: billieEilish,
            content: "Let someone see right through, ooh",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 7,
            user: billieEilish,
            content: "Ooh ooh ooh ooh ooh",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 8,
            user: minamino,
            content: "Maybe won't you take it back?",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 9,
            user: minamino,
            content: "Does anyone have a more sophisticated solution/library for truncating strings with JavaScript and putting an ellipsis on the end, than the obvious one: if (string.length",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 10,
            user: minamino,
            content: "In linguistics, an ellipsis is a series of three dots (…) that indicates an intentional omission of a word, sentence, or whole section from a text without changing its original meaning. It is commonly used in writing to indicate a pause or trailing off of thought, or to represent an unfinished sentence. In programming, an ellipsis is often used to indicate that there is more content to be displayed or entered, prompting the user to take further action.",
            time: "2023-08-20T12:30:10",
            status: "sent"
        },
        {
            id: 11,
            user: billieEilish,
            content: "Byte my tongue, bide my time",
            time: "2023-08-20T12:30:10",
            status: "sent",
            replyTo: {
                id: 11,
                user: billieEilish,
                content: "Wearing a warningem",
                time: "2023-08-20T12:30:10",
                status: "sent"
            }
        },
        {
            id: 11,
            user: billieEilish,
            content: "In linguistics, an ellipsis is a series of three dots (…) that indicates an intentional omission of a word, sentence, or whole section from a text without changing its original meaning. It is commonly used in writing to indicate a pause or trailing off of thought, or to represent an unfinished sentence. In programming, an ellipsis is often used to indicate that there is more content to be displayed or entered, prompting the user to take further action.",
            time: "2023-08-20T12:30:10",
            status: "sent",
            replyTo: {
                id: 11,
                user: billieEilish,
                content: "Wearing a warningem",
                time: "2023-08-20T12:30:10",
                status: "sent"
            }
        },
        {
            id: 11,
            user: minamino,
            content: "Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 " ,
            time: "2023-08-20T12:30:10",
            status: "seen",
            seen: {
                id: 1,
                time: "2023-08-20T12:30:10",
                user: billieEilish
            },
            replyTo: {
                id: 11,
                user: billieEilish,
                content: "Wearing a warningem",
                time: "2023-08-20T12:30:10",
                status: "sent"
            }
        }

    ]



    // // duplicate the messages array 100 times
    // for (var i = 0; i < 3; i++) {
    //     messages.push(...messages);
    // }
    const chatBodyRef = useRef(null);
    const inputBoxRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([])
    const [repliedMessage, setRepliedMessage] = useState(null);


    useEffect(() => {
        setMessages(hardCodedMessages);
    }, []); // This will trigger only once

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

        setMessages([...messages, newMessage]);
        setUserInput("");
        // if user is replying to a message, clear the replied message
        if (repliedMessage) {
            setRepliedMessage(null);

        }
    }


    return (
        <ReplyMessageContext.Provider value={{ repliedMessage, setRepliedMessage, inputBoxRef}}>
            <div className="chat">
                <div className="chat-header">
                    <div className="avatar">
                        <img src="https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg" alt="" />
                    </div>
                    <div className="name">User 2</div>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    <div className="message-container">
                        {messages.map((item, index) => {

                            const isMe = item.user.id == currentUser.id;

                            return (
                                <Message
                                    isMe={isMe}
                                    previousMessage={index > 0 ? messages[index - 1] : null}
                                    message={item}
                                    nextMessage={index < messages.length - 1 ? messages[index + 1] : null}
                                />
                            )

                        })}

                    </div>
                </div>
                <div className="chat-footer">
                    {repliedMessage &&

                        <ReplyToInputFooter repliedMessage={repliedMessage}/>
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
        </ReplyMessageContext.Provider>

    )
}