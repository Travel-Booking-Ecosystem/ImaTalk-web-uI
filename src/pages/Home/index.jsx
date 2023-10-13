import "./style.scss";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { directConversationListData, groupConversationListData, messages, notifiationListData } from '../../utils/data.js'
import ConversationContext from '../../contexts/ConversationContext';
import { useEffect, useState, useContext, useRef } from 'react';
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import LoadingContext from "../../contexts/LoadingContext";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ModalContainer from "../../components/Modal/ModalContainer";
import UserProfileModal from "../../components/Modal/UserProfileModal";
import ModalContext from "../../contexts/ModalContext";

export default function () {

    const [conversationList, setConversationList] = useState();
    const [chatbox, setChatbox] = useState({
        conversationId: null,
        conversationName: null,
        conversationAvatar: null,
        memberMap: {}, // this is a map of users, key is the user id, value is the user object
        messageMap: {}, // this is a map of messages, key is the message id, value is the message object (for easy access)
        messageList: [], // this is the list of messages, used to display the messages in the chat box
    });
    const [activeConversation, setActiveConversation] = useState(); // this is the active conversation info on the sidebar
    const { user, token } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const stompJsClient = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalChildren, setModalChildren] = useState();
    useEffect(() => {
        if (user) {
            fetchSidebar();
        }

    }, [user])


    useEffect(() => {
        if (activeConversation) {
            fetchConversationChatHistory();
            connectWebSocket();

            return () => {
                closeWebSocketConnection();
            }

        }
    }, [activeConversation])

    // useEffect(() => {
    //     // when the conversation list changes, set the current conversation to be read
    //     if (!activeConversation) return
    //     setConversationList(prev => {
    //         return prev.map(conversation => {
    //             if (conversation.id === activeConversation.id) {
    //                 conversation.unread = false;
    //             }
    //             return conversation;
    //         })
    //     })
    // }, [conversationList])



    const connectWebSocket = async () => {
        console.log("Trying to connect to websocket");
        // fix the bug he value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribut
        let Sock = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
        stompJsClient.current = over(Sock);
        await stompJsClient.current.connect({}, onConnected, onError);

    }

    const onConnected = () => {
        if (stompJsClient.current && stompJsClient.current.connected && user) {
            console.log("Connected to websocket to receive notification /topic/user/" + user.id);

            stompJsClient.current.subscribe(`/topic/user/${user.id}`, onReceivedMessage);
            // send a message to that user to notify that the user is online
            // stompJsClient.current.send("/app/user/online", {}, JSON.stringify({ id: user.id }));
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
        let event = JSON.parse(payload.body);
        if (event.name = "NEW_MESSAGE") {
            const newMessage = event.payload
            console.log("payload", payload);
            if (newMessage.conversationId == activeConversation.id) {
                // update the chat box when user is opening the conversation
                updateChatbox(newMessage)
            }

            // update the sidebar
            updateSidebar(newMessage);

        }


        console.log(event);
    }

    const updateChatbox = (newMessage) => {
        setChatbox(prev => {
            return {
                ...prev,
                messageList: [...prev.messageList, newMessage],
                messageMap: { ...prev.messageMap, [newMessage.id]: newMessage }
            }
        })

        // send a signal to the server to notify that the message is seen by the user
        stompJsClient.current.send("/app/message-seen", {}, JSON.stringify({ id: user.id, conversationId: activeConversation.id }));
    }

    const updateSidebar = (newMessage) => {
        setConversationList(prev => {
            // find the conversation to update
            let conversationToUpdate = prev.find(conversation => conversation.id === newMessage.conversationId);
            conversationToUpdate.lastMessage = newMessage;
            conversationToUpdate.unread = true; // for new message, set the unread to true

            // if the user is openning the conversation, all new messages of that conversation will be set to be read
            if (conversationToUpdate.id === activeConversation.id) {
                conversationToUpdate.unread = false;
            }

            // move the conversation to the top of the list
            prev = prev.filter(conversation => conversation.id !== conversationToUpdate.id);
            return [conversationToUpdate, ...prev];
        })
    }



    const fetchSidebar = async () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/sidebar`, header);
        const sidebar = response.data.data;


        console.log("sidebar", sidebar);
        setConversationList(sidebar.conversations);
        // set the active conversation to be the current conversation that user was recently in
        const currentConversation = sidebar.conversations.find(c => c.id === user.currentConversationId)
        setActiveConversation(currentConversation);
    }

    const fetchConversationChatHistory = async () => {
        if (!activeConversation) return null
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat/conversation-chat-history?conversationId=${activeConversation.id}`, header);
        const chatbox = response.data.data;
        console.log("chatbox", chatbox);
        setChatbox(chatbox);
    }


    return (
        <ModalContext.Provider value={{ setShowModal, setModalChildren }}>
            <ConversationContext.Provider
                value={{
                    conversationList,
                    chatbox,
                    activeConversation,
                    setActiveConversation,
                    setConversationList,
                    setChatbox

                }}>
                <div className="Home">
                    <Sidebar />
                    <Chat />
                    <ModalContainer
                        showModal={showModal}
                        children={<UserProfileModal/>}
                        onClose={() => setShowModal(false)}
                    />
                </div>

            </ConversationContext.Provider >
        </ModalContext.Provider>


    )
}

//TODO: use variable to store numberic values for CSS properties