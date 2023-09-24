import "./style.scss";
import React from "react";

export default function ({ avatar, displayName, username }) {

    
    return (
        <div className="UserInfo">
            <div className="user-avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="user-name">
                <p className="name">{displayName}</p>
                <p className="id">{username}</p>
            </div>
        </div>
    )
}