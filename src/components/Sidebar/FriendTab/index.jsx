import "./style.scss";
import React, { useState, useContext } from "react";
import { formatTime, truncateString } from "../../../utils/Utils";

import UserContext from "../../../contexts/UserContext";
import axios from "axios";
export default function ({ friendList, friendRequestList, handleAcceptFriendRequest }) {

    const [showFriendRequest, setShowFriendRequest] = useState(true);
    const { user, token } = useContext(UserContext);

    const toggleShowFriendRequest = () => {
        setShowFriendRequest(prev => !prev);
    }



    return (
        <div className="FriendTab">

            {friendRequestList.length > 0
            
                &&
                <div className="friend-request-container">


                    <div className="show-request-btn" onClick={toggleShowFriendRequest}>
                        <div className="btn-text">New friend requests</div>
                        {showFriendRequest ? <i class="fa-solid fa-caret-up"></i>
                            : <i class="fa-solid fa-caret-down"></i>
                        }
                    </div>

                    {showFriendRequest && friendRequestList.map((friendRequest, index) => {
                        return (
                            <FriendRequest
                                key={index}
                                {...friendRequest.sender}
                                onClickAccept={() => handleAcceptFriendRequest(friendRequest.id)}
                            />
                        )
                    })}
                </div>}


            <div className="friend-container">
                {friendList.map((friend, index) => {
                    return (
                        <Friend
                            key={index}
                            {...friend}
                        />
                    )
                })}
            </div>
        </div>
    )
}




function FriendRequest({ avatar, displayName, username, onClickAccept }) {

    const style = (!avatar && !displayName && !username) ? "skeleton-FriendRequest" : "";
    const [sendingRequest, setSendingRequest] = useState(false);
    const handleClickAccept = async () => {
        setSendingRequest(true);
        onClickAccept();
    }

    return (
        <div className={`FriendRequest ${style}`}>
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="info">
                <p className="displayName">{displayName}</p>
                <p className="username">{username}</p>

                <div className="accept-btn" onClick={handleClickAccept}>{
                    sendingRequest ? "Accepting ..." : "Accept Request"
                }</div>
            </div>
        </div>
    )
}

function Friend({ avatar, displayName, username, handleClick }) {

    const style = (!avatar && !displayName && !username) ? "skeleton-Friend" : "";

    return (
        <div className={`Friend ${style}`} onClick={handleClick}>
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="info">
                <p className="displayName">{displayName}</p>
                <p className="username">{username}</p>
            </div>
        </div>
    )
}