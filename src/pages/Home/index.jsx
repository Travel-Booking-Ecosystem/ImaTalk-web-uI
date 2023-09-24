import "./style.scss";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { directConversationListData, groupConversationListData, messages, notifiationListData } from '../../utils/data.js'
import DirectConversationContext from '../../contexts/DirectConversationContext';
import { useEffect, useState, useContext } from 'react';
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import LoadingContext from "../../contexts/LoadingContext";

export default function () {

    const [directConversationList, setDirectConversationList] = useState();
    const [groupConversationList, setGroupConversationList] = useState();
    const [notificationList, setNotificationList] = useState();
    const [activeConversationInfo, setActiveConversationInfo] = useState(); // this is the active conversation info on the sidebar
    const [activeConversationDetail, setActiveConversationDetail] = useState(); // this is the conversation detail (messages) shown on the chat box
    const { user, token } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {

        setDirectConversationList(directConversationListData);
        setGroupConversationList(groupConversationListData);

        setNotificationList(notifiationListData);
        setActiveConversationInfo(null);
    }, [])

    useEffect(() => {
        if (user) {
            // set the first conversation as the active conversation
            setActiveConversationInfo(user.directConversationList[0]);
        }

    }, [user])


    useEffect(() => {
        // when the active conversation info changes, fetch the conversation detail (messages) from the server  
        fetchConversationDetailById(activeConversationInfo && activeConversationInfo.id);
    }, [activeConversationInfo])

    const fetchConversationDetailById = async (id) => {
        // the conversation data is stored in the messages array

        if (!token) return null;
        // if the conversation is already active, do nothing
        // if (id == activeConversationInfo?.id) return null;

        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true);
        // setTimeout(() => {}, 3000)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/get-direct-conversation-messages?conversationId=${id}`, header)
        setLoading(false);
        const conversation = response.data.data;
        setActiveConversationDetail(conversation);
    }




    const handleClickConversation = (id) => {
        
        // set the active conversation info in the sidebar
        setActiveConversationInfo(user.directConversationList.find(conversation => conversation.id === id));
        // fetch the conversation detail (messages) of that conversation from the server
        fetchConversationDetailById(id);
    }
    return (
        <DirectConversationContext.Provider
            value={{
                directConversationList,
                activeConversationInfo,
                activeConversationDetail,
                setActiveConversationInfo,
                handleClickConversation,

            }}>
            <div className="Home">
                <Sidebar />
                <Chat />
            </div>

        </DirectConversationContext.Provider >

    )
}

//TODO: use variable to store numberic values for CSS properties