import "./style.scss";
import React from "react";

export default ({ showModal, onClose, children, title }) => {
    if (!showModal) {
        return null;
    }


    return (
        <div className="ModalContainer">
            <div className="background" onClick={() => onClose()} ></div>
            <div className="main">
                <div className="heading">
                    {/* <div className="title">{}</div> */}
                    <div className="close-btn" onClick={() => onClose()}><i class="fa-solid fa-x" ></i></div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

// if (showModal) {
//     return null;
// }