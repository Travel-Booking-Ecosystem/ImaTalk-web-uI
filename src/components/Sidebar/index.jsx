import "./style.scss";
import React, { useContext } from "react";
import DirectConversationContext from "../../contexts/DirectConversationContext";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DirectConversationList from "./DirectConversationList";
import GroupConversationList from "./GroupConversationList";
import NotificationList from "./NotificationList";
import  UserContext  from "../../contexts/UserContext";
export default function () {

  
    const {
        // directConversationList,
        // groupConversationList,
        // notificationList,
        activeConversationInfo,
        // activeConversationDetail,
        handleClickConversation,
    } = useContext(DirectConversationContext)


    const [activeTab, setActiveTab] = useState("chat-tab");

    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }

    const { user } = useContext(UserContext);

    // console.log("activeConversationInfo", activeConversationInfo);

    // wait for user to be loaded
    if (!user) return null;

    return (
        <div className="Sidebar">
            <UserInfo {...user} />
            <SearchBar />
            <TabContainer
                handleClickTab={handleClickTab}
                checkIfActiveTab={checkIfActiveTab}
            />

            {
                activeTab === "chat-tab" ?
                    <DirectConversationList
                        directConversationList={user.directConversationList}
                        handleClickConversation={handleClickConversation}
                        activeConversationInfo={activeConversationInfo}
                    />
                // : activeTab === "group-tab" ?
                //     <GroupConversationList
                //         groupConversationList={groupConversationList}
                //         handleClickConversation={handleClickConversation}
                //         currentGroupConversation={currentConversation}
                //     />

                // : activeTab === "notification-tab" ?
                //     <NotificationList notificationList={notificationList} />
                : null
                

            }

        </div>

    )
}

function UserInfo ({ avatar, displayName, username }) {

    
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

function TabContainer ({ handleClickTab, checkIfActiveTab}) {


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