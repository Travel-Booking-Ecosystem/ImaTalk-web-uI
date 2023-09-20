import "./style.scss";
import React from "react";

export default function ({ isMe, hideAvatar, hideTime, avatar, content, time}) {

    let style = ''

    if (isMe) {
        style += "right";
        style += " hide-avatar" // hide avatar if the message is from the current user
    } else {
        style += "left";

        if (hideAvatar) {
            style += " hide-avatar";
        }
    }

    if (hideTime) {
        style += " hide-time";
    }

    return (
        <div className={`Message ${style}`}>
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="message-detail">
                <div className="message-text">{content}</div>
                <div className="time">{time}</div>
            </div>
        </div>
    )
}