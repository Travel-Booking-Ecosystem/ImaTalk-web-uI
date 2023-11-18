import "./style.scss";
import React from "react";

export default function ({ isMe, message, seenAvatar, isSent, isSeen }) {

    // the message status is displayed for the current user's messages
    if (!isMe) return null

    const style = isSeen ? "seen" : isSent ? "sent" : ""

    return (
        <div className={`Status ${style}`}>
            {
                isSeen ? <img src={seenAvatar} alt="" />
                : isSent ? <i class="fa-solid fa-check"></i>
                : <></>
            }

        </div>
    )

}