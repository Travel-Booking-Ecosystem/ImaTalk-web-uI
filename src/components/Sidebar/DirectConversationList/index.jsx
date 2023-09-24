import "./style.scss";
import React from "react";
import DirectConversation from "./DirectConversation";
export default function ({ directConversationList, handleClickConversation, activeConversationInfo }) {

    return (
        <div className="DirectConversationList">
            {directConversationList && directConversationList.map((conversation, index) => {
                // message, time, unread

                // console.log("conversation", conversation);
                // console.log("activeConversationInfo", activeConversationInfo);
                // console.log("active =", activeConversationInfo && activeConversationInfo.id === conversation.id);
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