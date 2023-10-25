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

function Notification ({ image, createdAt, title, content, unread }) {


    
    let formattedTitle = truncateString(title, 30);
    let formattedContent = truncateString(content, 50);
    let formattedTime = formatTime(createdAt);
    let style = unread ? "unread" : "";

    if (!image && !createdAt && !title && !content) { 
        style = "skeleton-Notification";
        formattedTitle = "";
        formattedContent = "";
        formattedTime = "";
    }



    //TODO: skeleton loading
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
                <p className="title">{formattedTitle}</p>
                <p className="content">{content}</p>
            </div>
        </div>
    )
}