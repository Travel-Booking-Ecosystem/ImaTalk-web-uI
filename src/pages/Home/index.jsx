import "./style.scss";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { directConversationListData, groupConversationListData, messages, notifiationListData } from '../../utils/data.js'
import DirectConversationContext from '../../contexts/DirectConversationContext';
import { useEffect, useState, useContext } from 'react';
import axios from "axios";
import UserContext from "../../contexts/UserContext";
export default function () {

    const [directConversationList, setDirectConversationList] = useState();
    const [groupConversationList, setGroupConversationList] = useState();
    const [notificationList, setNotificationList] = useState();
    const [currentConversation, setCurrentConversation] = useState();
    const { user, token } = useContext(UserContext);

    useEffect(() => {

        setDirectConversationList(directConversationListData);
        setGroupConversationList(groupConversationListData);

        setNotificationList(notifiationListData);
        setCurrentConversation(null);
    }, [])

    useEffect(() => {
        if (user) {
            fetchConversationById(user.directConversationList[0].id);
        }

    }, [user])


    const fetchConversationById = async (id) => {
        // the conversation data is stored in the messages array
        if (!token) return null;
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/get-direct-conversation-messages?conversationId=${id}`, header)

        const conversation = response.data.data;
        setCurrentConversation(conversation);
    }




    const handleClickConversation = (id) => {
        fetchConversationById(id);
        // setCurrentConversation(conversation);
    }
    return (
        <DirectConversationContext.Provider
            value={{
                directConversationList,
                groupConversationList,
                currentConversation,
                notificationList,
                setCurrentConversation,
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