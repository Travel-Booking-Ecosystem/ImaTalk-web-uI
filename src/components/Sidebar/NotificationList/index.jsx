import { formatTime, truncateString } from "../../../utils/Utils";
import "./style.scss";
import React from "react";


export default function ({ notificationList }) {
    console.log("notificationList:::", notificationList);
    return (
        <div className="NotificationList">
            {
                notificationList && notificationList.map((notification) => {


                    const formattedTitle = truncateString(notification.title, 10);
                    const formattedContent = truncateString(notification.content, 10);
                    const formattedTime = formatTime(notification.time);
                    const unread = notification.unread;
                    const style = unread ? "unread" : "";
                    console.log("notification", notification);
                    return (
                        <div className={`Notification ${style}`}>
                            <div className="image">
                                <img src={notification.image} alt="" />
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

                })}
        </div>
    )
}