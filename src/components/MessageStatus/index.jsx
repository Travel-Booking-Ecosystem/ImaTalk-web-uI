import "./style.scss";
import React from "react";

export default function ({ isMe, message }) {
    const showSent = isMe && message.status === "sent"
    const showSeen = isMe && message.status === "seen"

    const style = showSent ? "sent" : showSeen ? "seen" : ""

    return (
        <div className={`Status ${style}`}>
            {showSent && <i class="fa-solid fa-check"></i>}
            {showSeen && <img src={message.seen.user.avatar} alt="" />}
        </div>
    )

}