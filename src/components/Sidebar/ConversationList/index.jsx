import "./style.scss";
import React, { useContext, useState } from "react";
import { formatTime, truncateString } from "../../../utils/Utils";
import ImaTalkLogo from '../../../assests/images/dsy-logo.png'
import ModalContainer from "../../Modal/ModalContainer";
import UserContext from "../../../contexts/UserContext";

import axios from "axios";

export default function ({ conversationList, handleClickConversation, activeConversationInfo, friendList }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);


    const toggleShowModal = () => {
        setShowModal(prev => !prev);
    }





    return (
        <div className="ConversationList">
            <div className="btn-text" onClick={toggleShowModal}>New group chat <i class="fa-solid fa-users-line"></i></div>
            {/* <CreateGroupChatModal /> */}
            {(conversationList && conversationList.length > 0) ?
                // render conversation list

                conversationList.map((conversation, index) => {
                    return (
                        <Conversation
                            key={index}
                            {...conversation}
                            handleClickConversation={() => handleClickConversation(conversation.id)}
                            active={activeConversationInfo && activeConversationInfo.id === conversation.id}
                        />
                    )
                })
                :

                <GreetingConversation
                />



            }


            <ModalContainer
                showModal={showModal}
                onClose={toggleShowModal}
                children={
                    <CreateGroupChatModal
                        friendList={friendList}
                        setSelectedFriends={setSelectedFriends}
                        selectedFriends={selectedFriends}
                        setShowModal={setShowModal}
                    />}
            />

        </div>
    )
}

function Conversation({ active, name, avatar, lastMessage, handleClickConversation, lastUpdate, unread }) {

    if (!name && !avatar && !lastMessage && !lastUpdate) {
        return (
            <div className="Conversation Conversation-skeleton" onClick={() => { }}>
                <div className="avatar">
                    <img src={null} alt="" />
                    <div className={`online-status`}></div>
                </div>
                <div className="conversation-info">
                    <div className="name">{ }</div>
                    <div className="last-message-content">{ }</div>
                    <div className="time">{ }</div>
                </div>
            </div>
        )
    }


    const online = true;
    // const active = index === 0;
    let onlineStatus = "";
    // const unread = lastMessage.unread;
    const content = truncateString(lastMessage?.content, 25);
    const formattedTime = formatTime(lastUpdate);

    let style = ""
    if (online) {
        onlineStatus = "online"
    } else {
        onlineStatus = "offline"
    }

    if (active) {
        style += " active-conversation"
    }
    if (unread) {
        style += " unread-conversation"
    }


    return (
        <div className={`Conversation ${style} `} onClick={handleClickConversation}>
            <div className="avatar">
                <img src={avatar} alt="" />
                <div className={`online-status ${onlineStatus}`}></div>
            </div>
            <div className="conversation-info">
                <div className="name">{name}</div>
                <div className="last-message-content">{content}</div>
                <div className="time">{formattedTime}</div>
            </div>
        </div>
    )
}

function GreetingConversation() {
    return (
        <div className="Conversation active-conversation" onClick={() => { }}>
            <div className="avatar">
                <img src={ImaTalkLogo} alt="" />
                <div className={`online-status online`}></div>
            </div>
            <div className="conversation-info">
                <div className="name">ImaTalk</div>
                <div className="last-message-content">Welcome to ImaTalk</div>
                <div className="time">{ }</div>
            </div>
        </div>
    )
}


function CreateGroupChatModal({ friendList, setSelectedFriends, selectedFriends, setShowModal }) {
    // const friends = [
    //     {
    //         avatar: "https://images.unsplash.com/photo-1697639171123-0fd9f3a4e1b5?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    //         displayName: "John Doe",
    //         username: "johndoe"
    //     },
    //     {
    //         avatar: "https://images.unsplash.com/photo-1697639171123-0fd9f3a4e1b5?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    //         displayName: "John Doe",
    //         username: "johndoe"
    //     },
    //     {
    //         avatar: "https://images.unsplash.com/photo-1697639171123-0fd9f3a4e1b5?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    //         displayName: "John Doe",
    //         username: "johndoe"
    //     },
    //     {
    //         avatar: "https://images.unsplash.com/photo-1697639171123-0fd9f3a4e1b5?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    //         displayName: "John Doe",
    //         username: "johndoe"
    //     },
    //     {
    //         avatar: "https://images.unsplash.com/photo-1697639171123-0fd9f3a4e1b5?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
    //         displayName: "John Doe",
    //         username: "johndoe"
    //     }

    // ];
    const [groupName, setGroupName] = useState("");
    const { token } = useContext(UserContext);

    const checkIfBtnActive = () => {
        if (groupName.length > 0 && selectedFriends.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleSelectFriend = (friendId) => {
        // if friend is already selected, remove it from selectedFriends
        const friend = friendList.find(f => f.id === friendId);
        if (selectedFriends.includes(friend)) {
            setSelectedFriends(prev => prev.filter(f => f.id !== friend.id))
        } else {
            // if friend is not selected, add it to selectedFriends
            setSelectedFriends(prev => [...prev, friend])
        }
    }

    const handleCreateGroup = async () => {
        if (!token || !checkIfBtnActive()) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const body = {
            groupName,
            memberIds: selectedFriends.map(f => f.id)

        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/create-group-conversation`, body, header);
        console.log("response", response.data);
        setSelectedFriends([]);
        setGroupName("");
        setShowModal(false); 
    }


    const btnStyle = checkIfBtnActive() ? "active-btn" : "inactive-btn";
    return (
        <div className="CreateGroupChatModal">

            <div className="group-name-input">
                {/* <p className="modal-name">Create new group chat</p> */}
                <input type="text" placeholder="Group name" value={groupName} onChange={e => setGroupName(e.target.value)} />
            </div>

            <div className="friend-container">
                <div className="friend-list-text">Friend List</div>
                {friendList.map((friend, index) => {
                    return (
                        <Friend
                            key={index}
                            {...friend}
                            isSelected={selectedFriends.some(f => f.id === friend.id)}
                            onClickAddFriend={() => handleSelectFriend(friend.id)}
                        />
                    )
                })}
            </div>

            <div className={`create-btn ${btnStyle}`} onClick={handleCreateGroup}>Create Group</div>
        </div>
    )

}



function Friend({ avatar, displayName, username, onClickAddFriend, isSelected }) {

    const style = isSelected ? "selected" : "";

    return (
        <div className={`Friend ${style}`} onClick={onClickAddFriend}>
            <div className="left">
                <div className="avatar">
                    <img src={avatar} alt="" />
                    <div className="online-status online"></div>
                </div>
                <div className="info">
                    <p className="displayName">{displayName}</p>
                    <p className="username">{username}</p>
                </div>
            </div>

            <div className="right">
                <label className="checkbox" htmlFor="add-checkbox">
                    <p className="label-text">Add</p>
                    <input type="checkbox" checked={isSelected} />
                </label>
            </div>



        </div>
    )
}