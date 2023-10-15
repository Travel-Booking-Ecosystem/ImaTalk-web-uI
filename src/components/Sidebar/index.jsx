import "./style.scss";
import React, { useContext, useRef } from "react";
import DirectConversationContext from "../../contexts/ConversationContext";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import NotificationList from "./NotificationList";
import UserContext from "../../contexts/UserContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { messages } from "../../utils/data";
import Loading from "../Loading";
import ModalContainer from "../Modal/ModalContainer";
import ModalContext from "../../contexts/ModalContext";
import UserProfileModal from "../Modal/UserProfileModal";
export default function ({loading}) {
    console.log("log from sidebar");
    const {
        // directConversationList,
        // groupConversationList,
        conversationList,
        setConversationList,
        activeConversation,
        setActiveConversation,
    } = useContext(DirectConversationContext)


    const { setShowModal, setModalChildren } = useContext(ModalContext);

    const { user } = useContext(UserContext);
    // const user =  {}

    const [activeTab, setActiveTab] = useState("chat-tab");
    const stompJsClient = useRef(null);




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
            <UserProfileModal/>);
        setShowModal(true);
    }
    // console.log("activeConversationInfo", activeConversationInfo);

    // wait for user to be loaded
    if (!user) return null;


    return (
        <div className="Sidebar">

            <UserInfo {...user} handleClick={openUserProfileModal} />
            <SearchBar />
            <TabContainer
                handleClickTab={handleClickTab}
                checkIfActiveTab={checkIfActiveTab}
            />

            {
                activeTab === "chat-tab" ?
                    <ConversationList
                        loading={loading}
                        conversationList={conversationList}
                        handleClickConversation={handleClickConversation}
                        activeConversationInfo={activeConversation}
                    />
                    : null


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

function TabContainer({ handleClickTab, checkIfActiveTab }) {


    return (
        <div className="TabContainer">
            <div className={`tab chat-tab ${checkIfActiveTab("chat-tab")}`} onClick={() => handleClickTab("chat-tab")}>
                <i class="tab-icon fa-solid fa-comment"><p className="noti-red-dot">2</p></i>
                <p class='tab-name'>Chats</p>
            </div>

            <div className={`tab group-tab ${checkIfActiveTab('group-tab')}`} onClick={() => handleClickTab("group-tab")}>
                <i class="tab-icon fa-solid fa-user-group"><p className="noti-red-dot">5</p></i>
                <p class='tab-name'>Friends</p>
            </div>

            <div className={`tab notification-tab ${checkIfActiveTab('notification-tab')}`} onClick={() => handleClickTab("notification-tab")}>
                <i class="tab-icon fa-solid fa-bell"><p className="noti-red-dot">10</p></i>
                <p class='tab-name'>Notifications</p>
            </div>
        </div>
    )
}