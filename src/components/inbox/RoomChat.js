import React, { useState, useEffect } from "react";
import "../../App.css";
import { Input, Button } from "semantic-ui-react";

import ChatBack from "../../assets/chat-back.svg";
import ChatClose from "../../assets/chat-close.svg";
import ThreePoint from "../../assets/three-point.svg";
import RedDownArrow from "../../assets/red-down-arrow.svg";

const BubbleSend = (props) => {
    return (
        <React.Fragment>
            <div className="chat-send">
                <div className="sender">You</div>
                <div className="content">
                    <div className="menu">
                        <img src={ThreePoint} alt="Menu" />
                    </div>
                    <div className="box">
                        <div className="message">{props.item.message}</div>
                        <div className="time">{props.item.time}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const BubbleReceive = (props) => {
    return (
        <React.Fragment>
            <div className="chat-receive">
                <div
                    className="sender"
                    style={{
                        color: props.item.font_color,
                    }}
                >
                    {props.item.sender}
                </div>
                <div className="content">
                    <div
                        className="box"
                        style={{
                            backgroundColor: props.item.color,
                        }}
                    >
                        <div className="message">{props.item.message}</div>
                        <div className="time">{props.item.time}</div>
                    </div>
                    {/* <div className="menu">
                        <img src={ThreePoint} alt="Menu" />
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    );
};

const RoomChat = (props) => {
    const [sizeContainer, setSizeContainer] = useState("container");
    const _handleSizeContainer = (e) => setSizeContainer(e);
    let chat = props.chatContent.history_chat;

    useEffect(() => {
        if (props.chatContent.type === "private") {
            _handleSizeContainer("container-private");
        } else if (props.chatContent.title.length > 71){
            _handleSizeContainer("container-long-title");
        }
    });

    return (
        <React.Fragment>
            <div className="room-chat">
                <div className="header">
                    <div
                        className="back"
                        onClick={() => {
                            props.onRoomChatShow(false, null);
                        }}
                    >
                        <img src={ChatBack} alt="ChatBack" />
                    </div>
                    <div className="info">
                        <div className="title">{props.chatContent.title}</div>
                        {props.chatContent.type === "group" ? (
                            <div className="participant">
                                {props.chatContent.participant} Participants
                            </div>
                        ) : null}
                    </div>
                    <div
                        className="close"
                        onClick={() => {
                            props.onRoomChatShow(false, null);
                        }}
                    >
                        <img src={ChatClose} alt="ChatClose" />
                    </div>
                </div>
                <hr className="devider" />
                <div className={sizeContainer}>
                    {chat.map((item, index) => (
                        <div key={index}>
                            {console.log(item.date)}
                            {index > 0 && chat[index - 1].date !== item.date ? (
                                <div className="date-separator">
                                    {item.date}
                                </div>
                            ) : (
                                console.log("date sama")
                            )}

                            {item.new_message === true ? (
                                <div className="red-separator">
                                    New Message
                                    <img src={RedDownArrow} alt="NewMessage" />
                                </div>
                            ) : null}
                            {item.type === "send" ? (
                                <BubbleSend item={item} />
                            ) : (
                                <BubbleReceive item={item} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <Input
                        name="send-message"
                        placeholder="Type a new message"
                        style={{
                            width: "588px",
                            marginRight: "13px",
                        }}
                        focus
                    />
                    <Button
                        primary
                        style={{
                            padding: "12.3px 20px",
                            margin: "0",
                        }}
                        onClick={() => console.log("Send Clicked")}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RoomChat;
