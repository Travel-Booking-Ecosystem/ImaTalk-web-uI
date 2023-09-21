import "./style.scss";
import React from "react";
import DirectConversation from "./DirectConversation";
export default function ({ directConversationList, handleClickConversation, currentDirectConversation }) {

    return (
        <div className="DirectConversationList">
            {directConversationList && directConversationList.map((conversation, index) => {
                // message, time, unread
                return (
                    <DirectConversation     
                        key={index}
                        {...conversation}
                        handleClickConversation={() => handleClickConversation(conversation.id)}
                        active={currentDirectConversation && currentDirectConversation.conversationId === conversation.id}
                    />
                )
            }
            )}

        </div>
    )
}