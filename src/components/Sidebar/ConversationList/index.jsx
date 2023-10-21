import "./style.scss";
import React, { useContext } from "react";
import { formatTime, truncateString } from "../../../utils/Utils";
import ImaTalkLogo from '../../../assests/images/dsy-logo.png'
export default function ({ conversationList, handleClickConversation, activeConversationInfo, loading }) {

    if (!conversationList?.length) {
        // render skeleton if conversation list is empty (when loading)

        return (
            <div className="ConversationList">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                    return (
                        <Conversation
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }
    return (
        <div className="ConversationList">
            {(conversationList && conversationList.length > 0) ?
                // render conversation list
                conversationList.map((conversation, index) => {
                    return (
                        <Conversation
                            key={index}
                            {...conversation}
                            handleClickConversation={() => handleClickConversation(conversation.id)}
                            active={activeConversationInfo && activeConversationInfo.id === conversation.id}
                        />
                    )
                })
                :

                <GreetingConversation
                />



            }

        </div>
    )
}

function Conversation({ active, name, avatar, lastMessage, handleClickConversation, lastUpdate, unread }) {

    if (!name && !avatar && !lastMessage && !lastUpdate) {
        return (
            <div className="Conversation Conversation-skeleton" onClick={() => { }}>
                <div className="avatar">
                    <img src={null} alt="" />
                    <div className={`online-status`}></div>
                </div>
                <div className="conversation-info">
                    <div className="name">{ }</div>
                    <div className="last-message-content">{ }</div>
                    <div className="time">{ }</div>
                </div>
            </div>
        )
    }


    const online = true;
    // const active = index === 0;
    let onlineStatus = "";
    // const unread = lastMessage.unread;
    const content = truncateString(lastMessage?.content, 6);
    const formattedTime = formatTime(lastUpdate);

    let style = ""
    if (online) {
        onlineStatus = "online"
    } else {
        onlineStatus = "offline"
    }

    if (active) {
        style += " active-conversation"
    }
    if (unread) {
        style += " unread-conversation"
    }


    return (
        <div className={`Conversation ${style} `} onClick={handleClickConversation}>
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className={`online-status ${onlineStatus}`}></div>
            </div>
            <div className="conversation-info">
                <div className="name">{name}</div>
                <div className="last-message-content">{content}</div>
                <div className="time">{formattedTime}</div>
            </div>
        </div>
    )
}

function GreetingConversation() {
    return (
        <div className="Conversation active-conversation" onClick={() => { }}>
            <div className="avatar">
                <img src={ImaTalkLogo} alt="" />
                <div className={`online-status online`}></div>
            </div>
            <div className="conversation-info">
                <div className="name">ImaTalk</div>
                <div className="last-message-content">Welcome to ImaTalk</div>
                <div className="time">{ }</div>
            </div>
        </div>
    )
}