import "./style.scss";
import React, { useContext, useRef } from "react";
import ConversationContext from "../../contexts/ConversationContext";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import NotificationList from "./NotificationList";
import UserContext from "../../contexts/UserContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { messages } from "../../utils/data";
import ModalContainer from "../Modal/ModalContainer";
import ModalContext from "../../contexts/ModalContext";
import UserProfileModal from "../Modal/UserProfileModal";
import FriendList from "./FriendList";
import axios from "axios";
import { truncateString } from "../../utils/Utils";

export default function ({ conversationList, handleClickConversation, notificationList, handleSeeAllNotifications, friendList, friendRequestList, handleAcceptFriendRequest, }) {

    const {
        // directConversationList,
        // groupConversationList,
        activeConversation,
    } = useContext(ConversationContext)

    

    const { setShowModal, setModalChildren } = useContext(ModalContext);
    const { user, token } = useContext(UserContext);
    const [ newNotificationCount, setNewNotificationCount ] = useState(0);

    useEffect(() => {
        const notificationCount = countUnreadNotification(notificationList);
        setNewNotificationCount(notificationCount);
    }, [notificationList])
        


    const [activeTab, setActiveTab] = useState("conversation-tab");



    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }


    const openUserProfileModal = () => {
        setModalChildren(
            <UserProfileModal />);
        setShowModal(true);
    }

    // wait for user to be loaded

    const handleSeeNotification = () => {
        handleClickTab("notification-tab");
        handleSeeAllNotifications();
        setNewNotificationCount(0);
    }

    
    const conversationNewFrienRequest = (friendRequestList) => {
        let count = 0;
        friendRequestList?.forEach(friendRequest => {
            // the field isAccepted is not null and isAccepted is false
            if (friendRequest.accepted === false) count++;
        })
        return count;
    }



    const countUnreadConversation = (conversationList) => {
        let count = 0;
        conversationList?.forEach(conversation => {
            if (conversation.unread) count++;
        })

        return count;
    }


    const countUnreadNotification = (notificationList) => {
        let count = 0;
        notificationList?.forEach(notification => {
            if (notification.unread) count++;
        })
        console.log("the value of count is ", count);
        return count;
    }



    return (
        user ? <div className="Sidebar">


            <UserInfo {...user} handleClick={openUserProfileModal} />
            <SearchBar />
            <TabContainer
                handleClickTab={handleClickTab}
                checkIfActiveTab={checkIfActiveTab}
                friendNewCount={conversationNewFrienRequest(friendRequestList)}
                unreadConversationCount={countUnreadConversation(conversationList)}
                unreadNotificationCount={newNotificationCount}
            
                handleSeeAllNotifications={handleSeeNotification}
            />

            {
                activeTab === "conversation-tab" ?
                    <ConversationList
                        // loading={loading}
                        conversationList={conversationList}
                        handleClickConversation={handleClickConversation}
                        activeConversationInfo={activeConversation}
                        friendList={friendList}
                    />
                    : activeTab === "friend-tab" ?
                        <FriendList
                            friendList={friendList}
                            friendRequestList={friendRequestList}
                            handleAcceptFriendRequest={handleAcceptFriendRequest}
                        />
                        :
                        activeTab === "notification-tab" ?
                            <NotificationList
                                notificationList={notificationList}
                            />
                            :
                            null


            }

        </div>

            : <div className="sidebar"></div>

    )
}

function UserInfo({ avatar, displayName, username, handleClick }) {
    const style = (!avatar && !displayName && !username) ? "skeleton-UserInfo" : "";

    const formatDisplayName = truncateString(displayName, 20);

    return (
        <div className={`UserInfo ${style}`} onClick={handleClick}>
            <div className="user-avatar">
                <img src={avatar} alt="" />
                <div className="online-status online"></div>
            </div>
            <div className="info">
                <div className="user-name">
                    <p className="name">{formatDisplayName}</p>
                    <p className="id">{username}</p>
                </div>
                <i class="fa-solid fa-gear"></i>
            </div>

        </div>
    )
}


function TabContainer({ handleClickTab, checkIfActiveTab, unreadConversationCount, friendNewCount, unreadNotificationCount, handleSeeAllNotifications }) {


  

    return (
        <div className="TabContainer">
            <div className={`tab chat-tab ${checkIfActiveTab("conversation-tab")}`} onClick={() => handleClickTab("conversation-tab")}>
                <i class="tab-icon fa-solid fa-comment">{unreadConversationCount > 0 && <p className="noti-red-dot">{unreadConversationCount}</p>}</i>
                <p class='tab-name'>Conversations</p>
            </div>

            <div className={`tab group-tab ${checkIfActiveTab('friend-tab')}`} onClick={() => handleClickTab("friend-tab")}>
                <i class="tab-icon fa-solid fa-user-group">{friendNewCount > 0 && <p className="noti-red-dot">{friendNewCount}</p>}</i>
                <p class='tab-name'>Friends</p>
            </div>

            <div className={`tab notification-tab ${checkIfActiveTab('notification-tab')}`} onClick={handleSeeAllNotifications}>
                <i class="tab-icon fa-solid fa-bell">{unreadNotificationCount > 0 && <p className="noti-red-dot">{unreadNotificationCount}</p>}</i>
                <p class='tab-name'>Notifications</p>
            </div>
        </div>
    )
}