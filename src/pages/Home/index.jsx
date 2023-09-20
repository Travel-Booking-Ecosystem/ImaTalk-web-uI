import "./style.scss";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";

export default function () {
    return (
        <div className="Home">
            <Sidebar />
            <Chat />
        </div>
    )
}

//TODO: use variable to store numberic values for CSS properties