import { formatTime, truncateString } from "../../../utils/Utils";
import Notification from "./Notification";
import "./style.scss";
import React from "react";


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