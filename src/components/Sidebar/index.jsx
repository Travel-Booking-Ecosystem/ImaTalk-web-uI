import "./style.scss";
import React, { useContext, useRef } from "react";
import ConversationContext from "../../contexts/ConversationContext";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import NotificationList from "./FriendTab";
import UserContext from "../../contexts/UserContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { messages } from "../../utils/data";
import ModalContainer from "../Modal/ModalContainer";
import ModalContext from "../../contexts/ModalContext";
import UserProfileModal from "../Modal/UserProfileModal";
import FriendTab from "./FriendTab";
import axios from "axios";

export default function ({ conversationList, setConversationList, friendList, setFriendList, friendRequestList, setFriendRequestList }) {
    console.log("Friend Request List 1", friendRequestList);

    console.log("log from sidebar");
    const {
        // directConversationList,
        // groupConversationList,
        activeConversation,
        setActiveConversation,
    } = useContext(ConversationContext)


    const { setShowModal, setModalChildren } = useContext(ModalContext);


    const { user, token } = useContext(UserContext);


    // const user =  {}

    const [activeTab, setActiveTab] = useState("conversation-tab");



    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }

    const handleClickConversation = (id) => {
        const conversation = conversationList.find(conversation => conversation.id === id);
        setActiveConversation(conversation);
        // setActiveConversation();
        //TODO: make this code cleaner (both backend and frontend)
        // loop through the conversation list and set the unread to false
        setConversationList(prev => {
            return prev.map(conversation => {
                if (conversation.id === id) {
                    conversation.unread = false;
                }
                return conversation;
            })
        })
    }

    const openUserProfileModal = () => {
        console.log("openUserProfileModal")
        console.log("user", user);
        setModalChildren(
            <UserProfileModal />);
        setShowModal(true);
    }
    // console.log("activeConversationInfo", activeConversationInfo);

    // wait for user to be loaded
    if (!user) return null;


    const handleAcceptFriendRequest = async (id) => {
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/accept-friend?requestId=${id}`, {}, header)
        console.log("response", response);

        // if accept friend request successfully, fetch friend request list and friend list again
        if (response.data.status == 200) {
            fetchFriendRequestList();
            fetchFriendList();
        }
    }

    const fetchFriendList = async () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/friends`, header);
        const responseData = response.data.data;


        setFriendList(responseData);

    }


    const fetchFriendRequestList = async () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/friend-request`, header);
        console.log("response", response.data.data);
        setFriendRequestList(response.data.data);
    }
    return (
        <div className="Sidebar">

            <UserInfo {...user} handleClick={openUserProfileModal} />
            <SearchBar />
            <TabContainer
                handleClickTab={handleClickTab}
                checkIfActiveTab={checkIfActiveTab}
                friendNotificationCount={friendRequestList.length}
            />

            {
                activeTab === "conversation-tab" ?
                    <ConversationList
                        // loading={loading}
                        conversationList={conversationList}
                        handleClickConversation={handleClickConversation}
                        activeConversationInfo={activeConversation}
                    />
                    : activeTab === "friend-tab" ?
                        <FriendTab
                            friendList={friendList}
                            friendRequestList={friendRequestList}
                            handleAcceptFriendRequest={handleAcceptFriendRequest}
                        />
                        :
                        null


            }

        </div>

    )
}

function UserInfo({ avatar, displayName, username, handleClick }) {
    const style = (!avatar && !displayName && !username) ? "skeleton-UserInfo" : "";


    return (
        <div className={`UserInfo ${style}`} onClick={handleClick}>
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

function TabContainer({ handleClickTab, checkIfActiveTab, friendNotificationCount }) {


    return (
        <div className="TabContainer">
            <div className={`tab chat-tab ${checkIfActiveTab("conversation-tab")}`} onClick={() => handleClickTab("conversation-tab")}>
                <i class="tab-icon fa-solid fa-comment"><p className="noti-red-dot">2</p></i>
                <p class='tab-name'>Conversations</p>
            </div>

            <div className={`tab group-tab ${checkIfActiveTab('friend-tab')}`} onClick={() => handleClickTab("friend-tab")}>
                <i class="tab-icon fa-solid fa-user-group">
                    {friendNotificationCount > 0 &&
                        <p className="noti-red-dot">{friendNotificationCount}</p>
                    }
                </i>

                <p class='tab-name'>Friends</p>
            </div>

            <div className={`tab notification-tab ${checkIfActiveTab('notification-tab')}`} onClick={() => handleClickTab("notification-tab")}>
                <i class="tab-icon fa-solid fa-bell"><p className="noti-red-dot">10</p></i>
                <p class='tab-name'>Notifications</p>
            </div>
        </div>
    )
}