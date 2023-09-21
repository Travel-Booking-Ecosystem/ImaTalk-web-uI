import './App.css';
import Home from './pages/Home';
import { directConversationListData, groupConversationListData, messages, notifiationListData } from './utils/data.js'
import DirectConversationContext from './contexts/DirectConversationContext';
import { useEffect, useState } from 'react';
function App() {
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
      <div className="App">
        <Home />
      </div>
    </DirectConversationContext.Provider>

  );
}

export default App;
