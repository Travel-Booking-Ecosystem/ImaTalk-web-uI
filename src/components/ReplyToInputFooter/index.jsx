import "./style.scss";
import React from "react";
import { useContext } from "react";
import ReplyMessageContext from "../../contexts/ReplyMessageContext";
import { truncateString } from "../../utils/Utils";

export default function ({ repliedMessage }) {

    const { setRepliedMessage } = React.useContext(ReplyMessageContext);
    const truncatedUserName = truncateString(repliedMessage.user.name, 10);
    const truncatedMessage = truncateString(repliedMessage.content, 20);
    return (
        <div className="ReplyToInputFooter">
            <div className="detail">
                <div className="heading">
                    Reply to <b className="sender-name">{truncatedUserName}</b>
                </div>
                <div className="content">{truncatedMessage}</div>
            </div>
            <div className="close-btn" onClick={() => setRepliedMessage(null)}>
                <i class="fa-solid fa-circle-xmark"></i>
            </div>

        </div>
    )
}