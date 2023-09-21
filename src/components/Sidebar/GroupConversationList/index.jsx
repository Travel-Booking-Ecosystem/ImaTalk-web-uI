import "./style.scss";
import React from "react";
import GroupConversation from "./GroupConversation";
export default function ({ groupConversationList, handleClickConversation, currentGroupConversation }) {

    return (
        <div className="GroupConversationList">
            {groupConversationList && groupConversationList.map((conversation, index) => {
                // message, time, unread
                return (
                    <GroupConversation
                        key={index}
                        {...conversation}
                        handleClickConversation={() => {}}
                        active={currentGroupConversation && currentGroupConversation.conversationId === conversation.id}
                    />
                )
            }
            )}

        </div>
    )
}