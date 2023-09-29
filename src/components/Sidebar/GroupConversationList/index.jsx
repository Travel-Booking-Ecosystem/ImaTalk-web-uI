import "./style.scss";
import React from "react";
import { formatTime, truncateString } from "../../../utils/Utils";

export default function ({ groupConversationList, handleClickConversation, currentGroupConversation }) {

    return (
        <div className="GroupConversationList">
            {groupConversationList && groupConversationList.map((conversation, index) => {
                // message, time, unread
                return (
                    <GroupConversation
                        key={index}
                        {...conversation}
                        handleClickConversation={() => {}}
                        active={currentGroupConversation && currentGroupConversation.conversationId === conversation.id}
                    />
                )
            }
            )}

        </div>
    )
}


function GroupConversation ({ active, name, avatar, onlineStatus, lastMessage, handleClickConversation }) {



    // const active = index === 0;

    const unread = lastMessage.unread;
    const content = truncateString(lastMessage.content, 6);
    const formattedTime = formatTime(lastMessage.time);
    const senderName = truncateString(lastMessage.user.name, 6);

    let style = ""

    if (!onlineStatus) {
        onlineStatus = "offline"
    }

    if (active) {
        style += " active-conversation"
    }
    if (unread) {
        style += " .unread-conversation"
    }


    return (
        <div className={`Conversation ${style}`} onClick={handleClickConversation}>
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className={`online-status ${onlineStatus}`}></div>
            </div>
            <div className="conversation-info">
                <div className="name">{name}</div>
                <div className="last-message-content">
                    <b className="sender-name">{senderName}: </b>                    
                    {content}
                    </div>
                <div className="time">{formattedTime}</div>
            </div>
        </div>
    )
}