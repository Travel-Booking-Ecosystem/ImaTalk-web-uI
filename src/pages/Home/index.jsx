import "./style.scss";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { directConversationListData, groupConversationListData, messages, notifiationListData } from '../../utils/data.js'
import DirectConversationContext from '../../contexts/DirectConversationContext';
import { useEffect, useState } from 'react';
export default function () {

    const [directConversationList, setDirectConversationList] = useState();
    const [groupConversationList, setGroupConversationList] = useState();
    const [notificationList, setNotificationList] = useState();
    const [currentConversation, setCurrentConversation] = useState();



    useEffect(() => {

        setDirectConversationList(directConversationListData);
        setGroupConversationList(groupConversationListData);

        setNotificationList(notifiationListData);
        setCurrentConversation(messages[0]);
    }, [])


    const fetchConversationById = (id) => {
        // the conversation data is stored in the messages array
        return messages.find((conversation) => conversation.conversationId === id);
    }

    const handleClickConversation = (id) => {
        const conversation = fetchConversationById(id);
        setCurrentConversation(conversation);
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