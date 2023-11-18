import React from 'react';

export default function GreetingChat({ userAvatar, userDisplayName }) {
    return (
        <div className="GreetingChat">
            <div className="heading">
                <div className="avatar">
                    <img src={userAvatar} alt="" />
                </div>
                <div className="content">
                    <p className="title">Welcome !</p>
                    <p className="title bold">{userDisplayName}</p>
                </div>
            </div>
            <div className="body">
                <div className="card">
                    <div className="card-image">
                        <img src="https://img.freepik.com/free-vector/tablet-with-users-communicating-speech-bubbles-global-internet-communication-social-media-network-technology-chat-message-forum-concept-vector-isolated-illustration_335657-1987.jpg?size=626&ext=jpg" alt="" />
                    </div>
                    <div className="card-body">
                        <p className="title">Let's begin a conversation</p>
                        <p className="text">Choose a person to start chatting with.</p>
                        <div className="text">Start with a message...</div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-image">
                        <img src="https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1102.jpg?size=626&ext=jpg" alt="" />
                    </div>
                    <div className="card-body">
                        <p className="title">Make a new friend</p>
                        <p className="text">Searching people by name to begin a conversation. </p>
                        <div className="text">Send them something interesting...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}