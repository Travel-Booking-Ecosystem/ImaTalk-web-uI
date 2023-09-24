import Conversation from "./GroupConversationList/GroupConversation";
import "./style.scss";
import React, { useContext } from "react";
import DirectConversationContext from "../../contexts/DirectConversationContext";
import { useState, useEffect } from "react";
import UserAvatar from "./UserInfo";
import SearchBar from "./SearchBar";
import TabContainer from "./TabContainer";
import DirectConversationList from "./DirectConversationList";
import GroupConversationList from "./GroupConversationList";
import NotificationList from "./NotificationList";
import  UserContext  from "../../contexts/UserContext";
export default function () {

  
    const {
        directConversationList,
        groupConversationList,
        notificationList,
        handleClickConversation,
        currentConversation
    } = useContext(DirectConversationContext)


    const [activeTab, setActiveTab] = useState("chat-tab");

    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }

    const { user } = useContext(UserContext);


    // wait for user to be loaded
    if (!user) return null;

    return (
        <div className="Sidebar">
            <UserAvatar {...user} />
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
                        currentDirectConversation={currentConversation}
                    />
                : activeTab === "group-tab" ?
                    <GroupConversationList
                        groupConversationList={groupConversationList}
                        handleClickConversation={handleClickConversation}
                        currentGroupConversation={currentConversation}
                    />

                : activeTab === "notification-tab" ?
                    <NotificationList notificationList={notificationList} />
                : null
                

            }

        </div>

    )
}