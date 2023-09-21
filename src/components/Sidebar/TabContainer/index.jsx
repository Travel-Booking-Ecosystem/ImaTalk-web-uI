import "./style.scss";
import React from "react";

export default function ({ handleClickTab, checkIfActiveTab}) {


    return (
        <div className="TabContainer">
            <div className={`tab chat-tab ${checkIfActiveTab("chat-tab")}`} onClick={() => handleClickTab("chat-tab")}>
                <i class="tab-icon fa-solid fa-comment"><p className="noti-red-dot">2</p></i>
                <p class='tab-name'>Chats</p>
            </div>

            <div className={`tab group-tab ${checkIfActiveTab('group-tab')}`} onClick={() => handleClickTab("group-tab")}>
                <i class="tab-icon fa-solid fa-user-group"><p className="noti-red-dot">5</p></i>
                <p class='tab-name'>Groups</p>
            </div>

            <div className={`tab notification-tab ${checkIfActiveTab('notification-tab')}`} onClick={() => handleClickTab("notification-tab")}>
                <i class="tab-icon fa-solid fa-bell"><p className="noti-red-dot">10</p></i>
                <p class='tab-name'>Notifications</p>
            </div>
        </div>
    )
}