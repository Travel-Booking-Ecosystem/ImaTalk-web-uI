import "./style.scss";
import React, { useContext, useRef } from "react";
import DirectConversationContext from "../../contexts/DirectConversationContext";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DirectConversationList from "./DirectConversationList";
import GroupConversationList from "./GroupConversationList";
import NotificationList from "./NotificationList";
import UserContext from "../../contexts/UserContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { messages } from "../../utils/data";
export default function () {

    const {
        // directConversationList,
        // groupConversationList,
        // notificationList,
        activeConversationInfo,
        // activeConversationDetail,
        setAndFetchActiveConversation,
    } = useContext(DirectConversationContext)

    const { user } = useContext(UserContext);
    const [conversationList, setConversationList] = useState([]);


    const [activeTab, setActiveTab] = useState("chat-tab");
    const stompJsClient = useRef(null);


    useEffect(() => {
        connectWebSocket();
        setConversationList(user?.directConversationList);
        return () => {
            closeWebSocketConnection();
        }
    }, [user?.id])

    useEffect(() => {
        // when the conversation list changes, set the current conversation to be read
        if (!activeConversationInfo) return
        setConversationList(prev => {
            return prev.map(conversation => {
                if (conversation.id === activeConversationInfo.id) {
                    conversation.unread = false;
                }
                return conversation;
            })
        })
    },[conversationList])

  

    const connectWebSocket = async () => {
        console.log("Trying to connect to websocket");
        // fix the bug he value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribut
        let Sock = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
        stompJsClient.current = over(Sock);
        await stompJsClient.current.connect({}, onConnected, onError);

    }



    const onConnected = () => {
        if (stompJsClient.current && stompJsClient.current.connected && user) {
            console.log("Connected to websocket to receive notification /topic/notification/" + user.id);

            stompJsClient.current.subscribe(`/topic/notification/${user.id}`, onReceivedMessage);
        }
    }

    const onError = (err) => {
        console.log(err);
        // displayPopup("Something went wrong!", "Connect to server failed!, please contact the admin!", true)
    }

    // connectWebSocket();

    const closeWebSocketConnection = () => {
        if (stompJsClient.current && stompJsClient.current.connected) {
            stompJsClient.current.disconnect();
        }
    }

    const onReceivedMessage = (payload) => {
        console.log("=====================ON NOTIFICATION RECEIVED============================");
        let notification = JSON.parse(payload.body);
        console.log(notification);
        // setNotificationList(prev => {
        setConversationList(prev => {
            // let newNotificationList = [notification, ...prev];
            //TODO: find a better way to update the conversation list
            // get the conversation to update
            let conversationToUpdate = prev.find(conversation => conversation.id === notification.conversationId);
            // update the conversation
            if (conversationToUpdate) {
                //TODO: make this code cleaner (both backend and frontend)
                conversationToUpdate.lastMessage.content = notification.content;
                conversationToUpdate.lastMessage.lastUpdate = notification.createdAt;
                conversationToUpdate.unread = true;
            }



            // remove the conversation from the list
            const newConversationList = prev.filter(conversation => conversation.id !== notification.conversationId);
            // move the conversation to the top of the list
            return [conversationToUpdate, ...newConversationList];
        })

    }



    function checkIfActiveTab(tabName) {
        return activeTab === tabName ? "active-tab" : "";
    }

    function handleClickTab(tabName) {
        setActiveTab(tabName);
    }

    const handleClickConversation = (id) => {
        setAndFetchActiveConversation(id);
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
                        directConversationList={conversationList}
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

function UserInfo({ avatar, displayName, username }) {


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

function TabContainer({ handleClickTab, checkIfActiveTab }) {


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