import { formatTime, truncateString } from "../../../../utils/Utils";
import "./style.scss";
import React, {useContext} from "react";
import DirectConversationContext from "../../../../contexts/DirectConversationContext";

export default function ({ active, name, avatar, lastMessage, handleClickConversation, lastUpdate }) {


    const online = true;
    // const active = index === 0;
    let onlineStatus = "";
    const unread = lastMessage.unread;
    const content = truncateString(lastMessage.content, 6);
    const formattedTime = formatTime(lastUpdate);
    
    let  style = ""
    if (online) {
        onlineStatus = "online"
    } else {
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
                <div className="last-message-content">{content}</div>
                <div className="time">{formattedTime}</div>
            </div>
        </div>
    )
}