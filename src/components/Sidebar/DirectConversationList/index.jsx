import "./style.scss";
import React from "react";
import DirectConversation from "./DirectConversation";
export default function ({ directConversationList, handleClickConversation, activeConversationInfo }) {

    return (
        <div className="DirectConversationList">
            {directConversationList && directConversationList.map((conversation, index) => {
                return (
                    <DirectConversation     
                        key={index}
                        {...conversation}
                        handleClickConversation={() => handleClickConversation(conversation.id)}
                        active={activeConversationInfo && activeConversationInfo.id === conversation.id}
                    />
                )
            }
            )}

        </div>
    )
}