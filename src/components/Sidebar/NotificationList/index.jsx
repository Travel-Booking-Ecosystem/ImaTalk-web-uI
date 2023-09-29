import "./style.scss";
import React from "react";
import { formatTime, truncateString } from "../../../utils/Utils";


export default function ({ notificationList }) {
    return (
        <div className="NotificationList">
            {
                notificationList && notificationList.map((notification) => {
                    return (
                        <Notification key={notification.id} {...notification} />

                    )

                })}
        </div>
    )
}

function Notification ({ image, time, title, content, unread }) {

    const formattedTitle = truncateString(title, 10);
    const formattedContent = truncateString(content, 10);
    const formattedTime = formatTime(time);
    const style = unread ? "unread" : "";

    return (
        <div className={`Notification ${style}`}>
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="main-content">
                <div className="heading">
                    <p className="time">{formattedTime}</p>
                    {unread && <div className="red-dot"></div>}
                </div>
                <div className="title">{formattedTitle}</div>
                <div className="content">{formattedContent}</div>
            </div>
        </div>
    )
}