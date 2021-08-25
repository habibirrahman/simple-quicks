import React from "react";
import "../../App.css";

import ChatProfileGroup from "../../assets/chat-profile.svg";
import ChatProfilePrivate from "../../assets/chat-profile-single.svg";
import ChatAlert from "../../assets/chat-alert.svg";

const InboxItem = (props) => {
    return (
        <React.Fragment>
            <div className="inbox-container">
                {props.inboxData.map((item, index) => (
                    <div key={index}>
                        <div
                            className="item"
                            onClick={() => props.onRoomChatShow(true, item)}
                        >
                            {item.type === "group" ? (
                                <div className="profile">
                                    <img src={ChatProfileGroup} alt="Profile" />
                                </div>
                            ) : (
                                <div className="profile">
                                    <img src={ChatProfilePrivate} alt="Profile" />
                                </div>
                            )}

                            <div className="content">
                                <div className="title">{item.title}</div>
                                {item.type === "group" ? (
                                    <div className="sender">
                                        {item.last_sender} :
                                    </div>
                                ) : null}
                                <div className="message">
                                    {item.last_message}
                                </div>
                            </div>
                            <div className="info">
                                <div className="time">{item.time}</div>
                                {item.read ? null : (
                                    <img src={ChatAlert} alt="Alert" />
                                )}
                            </div>
                        </div>
                        <hr className="line" />
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default InboxItem;
