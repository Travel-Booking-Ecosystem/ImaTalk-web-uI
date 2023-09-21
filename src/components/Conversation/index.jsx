import "./style.scss";
import React from "react";

export default function ({ index, avatar, name, message, time, unread }) {

    const active = index === 0;

    let  style = ""
    if (active) {
        style += " active-conversation"
    }
    if (unread) {
        style += " unread"
    }
    return (
        <div className={`Conversation ${style}`}>
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="conversation-info">
                <div className="name">{name}</div>
                <div className="message">{message}</div>
                <div className="time">{time}</div>
            </div>
        </div>
    )
}