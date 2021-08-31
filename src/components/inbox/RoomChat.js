import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import { Input, Button, Loader, Form } from "semantic-ui-react";

import ChatBack from "../../assets/chat-back.svg";
import ChatClose from "../../assets/chat-close.svg";
import ThreePoint from "../../assets/three-point.svg";
import RedDownArrow from "../../assets/red-down-arrow.svg";

const monthNames = () => [
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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setMenuOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(menuRef);
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
                        <img
                            src={ThreePoint}
                            alt="Menu"
                            onClick={() => setMenuOpen(!isMenuOpen)}
                        />
                        {isMenuOpen && (
                            <div className="chat-menu-send" ref={menuRef}>
                                <div
                                    className="edit"
                                    onClick={() => {
                                        console.log("Edit Clicked");
                                    }}
                                >
                                    Edit
                                </div>
                                <hr />
                                <div
                                    className="delete"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you wish to delete this message?"
                                            )
                                        )
                                            props.onDeleteMessage(props.index);
                                    }}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setMenuOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(menuRef);
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
                    <div className="menu">
                        <img
                            src={ThreePoint}
                            alt="Menu"
                            onClick={() => setMenuOpen(!isMenuOpen)}
                        />
                        {isMenuOpen && (
                            <div className="chat-menu-receive" ref={menuRef}>
                                <div
                                    className="item"
                                    onClick={() => {
                                        console.log("Share Clicked");
                                    }}
                                >
                                    Share
                                </div>
                                <hr />
                                <div
                                    className="item"
                                    onClick={() => {
                                        console.log("Reply Clicked");
                                    }}
                                >
                                    Reply
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const RoomChat = (props) => {
    const [roomChat, setRoomChat] = useState("room-chat-start");
    const [isShowContent, setShowContent] = useState(false);
    const [isChatConnected, setChatConnected] = useState(true);
    const [chat, setChat] = useState(props.chatItem.history_chat);
    const [messageInput, setMessageInput] = useState("");
    const sizeContainer = () => {
        if (props.chatItem.type === "private") {
            return "container-private";
        } else if (props.chatItem.title.length > 71) {
            return "container-long-title";
        } else return "container";
    };

    const _clearState = () => {
        setMessageInput("");
        _handleReadAllMessage();
        setTimeout(() => {
            setShowContent(false);
            setRoomChat("room-chat-start");
        }, 100);
        setTimeout(() => {
            setChatConnected(true);
            props.onRoomChatShow(false, []);
        }, 400);
    };

    const _handleReadAllMessage = (e) => {
        // eslint-disable-next-line array-callback-return
        chat.map((item, index) => {
            if (item.new_message === true) {
                let newChat = [...chat];
                let updateChat = newChat[index];
                updateChat.new_message = false;
                // newChat.splice(index, 1);
                newChat[index] = updateChat;
                setChat(newChat);
            }
        });
    };

    const _getSendingTime = () => {
        let today = new Date();
        let month = monthNames()[today.getMonth()];
        let date = month + " " + today.getDate() + ", " + today.getFullYear();
        if (today.getHours() < 10) {
            var hours = "0" + today.getHours();
        } else {
            hours = today.getHours();
        }
        if (today.getMinutes() < 10) {
            var minutes = "0" + today.getMinutes();
        } else {
            minutes = today.getMinutes();
        }
        let time = hours + ":" + minutes;
        return { date: date, time: time };
    };

    const _handleSending = (e) => {
        if (messageInput === null || messageInput.match(/^ *$/) !== null) {
            setMessageInput("");
            return;
        }
        let sending_time = _getSendingTime();
        let send_message = {
            date: sending_time.date,
            time: sending_time.time,
            type: "send",
            sender: "Claren",
            font_color: "#9B51E0",
            color: "#EEDCFF",
            to: props.chatItem.title,
            message: messageInput,
            new_message: false,
        };
        setMessageInput("");
        _handleReadAllMessage();
        setChat([...chat, send_message]);
        // set props
        props.chatItem.history_chat = [...chat, send_message];
    };

    const _handleDeleteMessage = (e) => {
        let deleted = [...chat];
        if (e !== -1) {
            deleted.splice(e, 1);
            setChat(deleted);
            props.chatItem.history_chat.splice(e, 1);
        }
    };

    useEffect(() => {
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
                                    _clearState();
                                }}
                            >
                                <img src={ChatBack} alt="ChatBack" />
                            </div>
                            <div className="info">
                                <div className="title">
                                    {props.chatItem.title}
                                </div>
                                {props.chatItem.type === "group" && (
                                    <div className="participant">
                                        {props.chatItem.participant}{" "}
                                        Participants
                                    </div>
                                )}
                            </div>
                            <div
                                className="close"
                                onClick={() => {
                                    _clearState();
                                }}
                            >
                                <img src={ChatClose} alt="ChatClose" />
                            </div>
                        </div>
                        <hr className="devider" />
                        <div className={sizeContainer()}>
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
                                            onDeleteMessage={
                                                _handleDeleteMessage
                                            }
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
                            <Form>
                                <Input
                                    focus
                                    type="text"
                                    placeholder="Type a new message"
                                    style={{
                                        width: "580px",
                                        marginRight: "13px",
                                    }}
                                    value={messageInput}
                                    onChange={(e) =>
                                        setMessageInput(e.target.value)
                                    }
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
                            </Form>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default RoomChat;
