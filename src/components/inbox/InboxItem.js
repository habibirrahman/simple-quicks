import React, { useState } from "react";
import "../../App.css";

import RoomChat from "./RoomChat.js";

import ChatProfileGroup from "../../assets/chat-profile.svg";
import ChatProfilePrivate from "../../assets/chat-profile-single.svg";
import ChatAlert from "../../assets/chat-alert.svg";

const InboxItem = (props) => {
    const [isRoomChatShow, setRoomChatShow] = useState(false);
    const [chatItem, setChatItem] = useState([]);
    const _handleRoomChatShow = (e, item) => {
        setRoomChatShow(e);
        setChatItem(item);
    };
    return (
        <React.Fragment>
            <div className="inbox-container">
                {props.inboxData.map((item, index) => (
                    <div key={index}>
                        <div
                            className="item"
                            onClick={() => {
                                _handleRoomChatShow(true, item);
                            }}
                        >
                            {item.type === "group" ? (
                                <div className="profile">
                                    <img src={ChatProfileGroup} alt="Profile" />
                                </div>
                            ) : (
                                <div className="profile">
                                    <img
                                        src={ChatProfilePrivate}
                                        alt="Profile"
                                    />
                                </div>
                            )}

                            <div className="content">
                                <div className="title">{item.title}</div>
                                {item.type === "group" && (
                                    <div className="sender">
                                        {item.last_sender} :
                                    </div>
                                )}
                                <div className="message">
                                    {item.last_message}
                                </div>
                            </div>
                            <div className="info">
                                <div className="time">{item.time}</div>
                                {!item.read && (
                                    <img src={ChatAlert} alt="Alert" />
                                )}
                            </div>
                        </div>
                        <hr className="line" />
                    </div>
                ))}
            </div>
            {isRoomChatShow && (
                <RoomChat
                    isRoomChatShow={isRoomChatShow}
                    chatItem={chatItem}
                    onRoomChatShow={_handleRoomChatShow}
                />
            )}
        </React.Fragment>
    );
};

export default InboxItem;
