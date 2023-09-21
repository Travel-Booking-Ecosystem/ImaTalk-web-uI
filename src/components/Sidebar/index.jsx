import Conversation from "./GroupConversationList/GroupConversation";
import "./style.scss";
import React, { useContext } from "react";
import DirectConversationContext from "../../contexts/DirectConversationContext";
import { useState } from "react";
import UserAvatar from "./UserInfo";
import SearchBar from "./SearchBar";
import TabContainer from "./TabContainer";
import DirectConversationList from "./DirectConversationList";
import GroupConversationList from "./GroupConversationList";
import NotificationList from "./NotificationList";
export default function () {

    const minamino = {
        id: 1,
        name: "Minamino",
        userCode: "minamino21412",
        avatar: "https://th.bing.com/th/id/OIP.ZpNOsfN4Tzl8UMtCe7j2kwHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=1.3"
    }
    const {
        directConversationList,
        groupConversationList,
        notificationList,
        handleClickConversation,
        currentConversation
    } = useContext(DirectConversationContext)


    const [activeTab, setActiveTab] = useState("notification-tab");

    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }

    const currentUser = minamino;
    console.log("current conversation", currentConversation);
    return (
        <div className="Sidebar">
            <UserAvatar {...currentUser} />
            <SearchBar />
            <TabContainer
                handleClickTab={handleClickTab}
                checkIfActiveTab={checkIfActiveTab}
            />

            {
                activeTab === "chat-tab" ?
                    <DirectConversationList
                        directConversationList={directConversationList}
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