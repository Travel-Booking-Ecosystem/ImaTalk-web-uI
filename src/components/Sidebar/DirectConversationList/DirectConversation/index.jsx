import { formatTime, truncateString } from "../../../../utils/Utils";
import "./style.scss";
import React, {useContext} from "react";
import DirectConversationContext from "../../../../contexts/DirectConversationContext";

export default function ({ active, name, avatar, onlineStatus, lastMessage, handleClickConversation }) {



    // const active = index === 0;

    const unread = lastMessage.unread;
    const content = truncateString(lastMessage.content, 6);
    const formattedTime = formatTime(lastMessage.time);
    
    let  style = ""

    if (!onlineStatus) {
        console.log("OFFFFFLINE");
        onlineStatus = "offline"
    }

    if (active) {
        style += " active-conversation"
    }
    if (unread) {
        style += " unread"
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