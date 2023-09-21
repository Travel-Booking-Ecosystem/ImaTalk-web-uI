import "./style.scss";
import React from "react";

export default function ({ avatar, name, userCode }) {

    
    return (
        <div className="UserInfo">
            <div className="user-avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="user-name">
                <p className="name">{name}</p>
                <p className="id">@{userCode}</p>
            </div>
        </div>
    )
}