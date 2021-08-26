import React, { useState, useEffect } from "react";
import "../../App.css";
import { Input, Button, Loader } from "semantic-ui-react";

import ChatBack from "../../assets/chat-back.svg";
import ChatClose from "../../assets/chat-close.svg";
import ThreePoint from "../../assets/three-point.svg";
import RedDownArrow from "../../assets/red-down-arrow.svg";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const BubbleSend = (props) => {
    return (
        <React.Fragment>
            <div className="chat-send">
                {props.index === 0 ||
                    (props.item.sender !==
                        props.chat[props.index - 1].sender && (
                        <div className="sender">You</div>
                    ))}
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
                {props.index === 0 ||
                    (props.item.sender !==
                        props.chat[props.index - 1].sender && (
                        <div
                            className="sender"
                            style={{
                                color: props.item.font_color,
                            }}
                        >
                            {props.item.sender}
                        </div>
                    ))}

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
    const [roomChat, setRoomChat] = useState("room-chat-start");
    const [isShowContent, setShowContent] = useState(false);
    const [sizeContainer, setSizeContainer] = useState("container");
    const [isChatConnected, setChatConnected] = useState(true);

    const _hanleSizeContainer = (e) => setSizeContainer(e);
    const [chat, setChat] = useState(props.chatContent.history_chat);
    const [messageInput, setMessageInput] = useState("");

    const clearState = () => {
        setMessageInput("");
        setChat(props.chatContent.history_chat);
        setTimeout(() => {
            setShowContent(false);
            setRoomChat("room-chat-start");
        }, 100);
        setTimeout(() => {
            setChatConnected(true);
            props.onInboxShow(true);
            props.onRoomChatShow(false, []);
        }, 400);
    };

    const _handleChangeReadAllMessage = (e) => {
        // eslint-disable-next-line array-callback-return
        chat.map((item, index) => {
            if (item.new_message === true) {
                let newChat = [...chat];
                let updateChat = chat[index];
                updateChat.new_message = false;
                newChat.splice(index, 1);
                newChat[index] = updateChat;
                setChat(newChat);
            }
        });
    };

    const _handleChangeInput = (e) => {
        setMessageInput(e.target.value);
    };

    const getSendingTime = () => {
        let today = new Date();
        let month = monthNames[today.getMonth()];
        let date = month + " " + today.getDate() + ", " + today.getFullYear();
        var minutes = today.getMinutes();
        if (today.getMinutes().length === 1) {
            minutes = "0" + today.getMinutes();
        }
        let time = today.getHours() + ":" + minutes;
        return { date: date, time: time };
    };

    const _handleSending = (e) => {
        if (messageInput === "") {
            return;
        }
        let sendingTime = getSendingTime();
        let send_message = {
            date: sendingTime.date,
            time: sendingTime.time,
            type: "send",
            sender: "Claren",
            font_color: "#9B51E0",
            color: "#EEDCFF",
            to: "-",
            message: messageInput,
            new_message: false,
        };
        setMessageInput("");
        _handleChangeReadAllMessage();
        setChat([...chat, send_message]);
    };

    useEffect(() => {
        if (props.chatContent.type === "private") {
            _hanleSizeContainer("container-private");
        } else if (props.chatContent.title.length > 71) {
            _hanleSizeContainer("container-long-title");
        }
        if (props.isRoomChatShow === true) {
            let timer = setTimeout(() => {
                setRoomChat("room-chat");
            }, 300);
            let timer2 = setTimeout(() => {
                setShowContent(true);
            }, 500);
            let timer3 = setTimeout(() => {
                setChatConnected(false);
            }, 2000);
            return () => clearTimeout(timer, timer2, timer3);
        }
    });

    return (
        <React.Fragment>
            <div className={roomChat}>
                {isShowContent && (
                    <div>
                        <div className="header">
                            <div
                                className="back"
                                onClick={() => {
                                    clearState();
                                }}
                            >
                                <img src={ChatBack} alt="ChatBack" />
                            </div>
                            <div className="info">
                                <div className="title">
                                    {props.chatContent.title}
                                </div>
                                {props.chatContent.type === "group" && (
                                    <div className="participant">
                                        {props.chatContent.participant}{" "}
                                        Participants
                                    </div>
                                )}
                            </div>
                            <div
                                className="close"
                                onClick={() => {
                                    clearState();
                                }}
                            >
                                <img src={ChatClose} alt="ChatClose" />
                            </div>
                        </div>
                        <hr className="devider" />
                        <div className={sizeContainer}>
                            {chat.map((item, index) => (
                                <div className="bubble-chat" key={index}>
                                    {index === 0 ||
                                        (chat[index - 1].date !== item.date && (
                                            <div className="date-separator">
                                                {item.date}
                                            </div>
                                        ))}
                                    {item.new_message &&
                                        !chat[index - 1].new_message && (
                                            <div className="red-separator">
                                                New Message
                                                <img
                                                    src={RedDownArrow}
                                                    alt="NewMessage"
                                                />
                                            </div>
                                        )}
                                    {item.type === "send" ? (
                                        <BubbleSend
                                            item={item}
                                            index={index}
                                            chat={chat}
                                        />
                                    ) : (
                                        <BubbleReceive
                                            item={item}
                                            index={index}
                                            chat={chat}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {isChatConnected && (
                            <div className="chat-connecting">
                                <Loader
                                    size="small"
                                    active
                                    inline
                                    color="#2F80ED"
                                />
                                <div className="info">
                                    Please wait while we connect you with one of
                                    our team ...
                                </div>
                            </div>
                        )}
                        <div className="chat-footer">
                            <Input
                                focus
                                type="text"
                                placeholder="Type a new message"
                                style={{
                                    width: "580px",
                                    marginRight: "13px",
                                }}
                                value={messageInput}
                                onChange={_handleChangeInput}
                                ref={null}
                            />
                            <Button
                                primary
                                type="submit"
                                style={{
                                    padding: "12.3px 20px",
                                    margin: "0",
                                }}
                                onClick={_handleSending}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default RoomChat;
