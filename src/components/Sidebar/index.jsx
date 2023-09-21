import Conversation from "../Conversation";
import "./style.scss";
import React from "react";

export default function () {

    const minamino = {
        id: 1,
        name: "User 1",
        userCode: "minamino21412",
        avatar: "https://th.bing.com/th/id/OIP.ZpNOsfN4Tzl8UMtCe7j2kwHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=1.3"
    }

    const currentUser = minamino;

    const conversation = [
        {
            id: 1,
            name: "User 2",
            avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg",
            message: "Wait 'til the world is mine",
            time: "Wed 12:32",
            unread: false
        },
        {
            id: 2,
            name: "Đỗ Doãn Vũ",
            avatar: "https://th.bing.com/th/id/OIP.iNi82mqaHFetC_F3ANxBeQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            message: "Khong di a? ",
            time: "Today 08:31",
            unread: true
        },
        {
            id: 3,
            name: "Nguyen Hoang Vy",
            avatar: "https://th.bing.com/th/id/OIP.5aLF0OgX8_h2W7yrXmrZNgHaE8?w=192&h=128&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            message: "Nhô đi chưa 😊, tôi đang trên ...",
            time: "Today 08:32",
            unread: false
        },
        {
            id: 3,
            name: "Híu",
            avatar: "https://th.bing.com/th/id/OIP.mLA2Heru41ZftFNA4RgeigHaFj?w=192&h=144&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            message: "Oceee",
            time: "Mon 18:42",
            unread: false
        },
        {
            id: 4,
            name: "Quang Nam",
            avatar: "https://th.bing.com/th/id/OIP.gFM1TD9LEvbotNqSlPGrmQHaFY?w=192&h=140&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            message: "Chốc nữa run ko?",
            time: "Mon 17:22",
            unread: true
        },
        {
            id: 5,
            name: "Lâm Trần",
            avatar: "https://th.bing.com/th/id/OIP.OucO-gLm1krkEbWTltrRQAHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            message: "Uk oke 😊",
            time: "Mon 13:51",
            unread: false
        }
    ]

    return (
        <div className="Sidebar">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={currentUser.avatar} alt="" />
                </div>
                <div className="user-name">
                    <p className="name">{currentUser.name}</p>
                    <p className="id">@{currentUser.userCode}</p>
                </div>
            </div>
            <div className="search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search for people, messages,..." />
            </div>
            <div className="tab-container">
                <div className="tab active-tab">
                    <i class="fa-solid fa-comment"></i>
                    <p class='tab-name'>Chats</p>
                </div>

                <div className="tab">
                    <i class="fa-solid fa-user-group"></i>
                    <p class='tab-name'>Groups</p>
                </div>

                <div className="tab">
                    <i class="fa-solid fa-bell"></i>
                    <p class='tab-name'>Notifications</p>
                </div>
            </div>
            <div className="conversation-container">


                {conversation.map((item, index) => 
                    <Conversation key={index} {...item} index={index} />
                )}

            </div>
        </div>
    )
}