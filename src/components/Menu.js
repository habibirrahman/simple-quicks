import React, { useState, useEffect } from "react";
import "../App.css";

import QuicksIcon from "../assets/quicks.svg";
import InboxIcon from "../assets/inbox.svg";
import TaskIcon from "../assets/task.svg";

const Menu = (props) => {
    const [inboxStyle, setInboxStyle] = useState("inbox-start");
    const [taskStyle, setTaskStyle] = useState("task-start");

    useEffect(() => {
        let timer = setTimeout(() => {
            setInboxStyle("inbox");
        }, 200);
        let timer2 = setTimeout(() => {
            setTaskStyle("task");
        }, 400);
        return () => clearTimeout(timer, timer2);
    }, [inboxStyle, taskStyle]);

    return (
        <React.Fragment>
            <div className={taskStyle}>
                <div className="task-title">Task</div>
                <img
                    src={TaskIcon}
                    className="task-button"
                    alt="TaskIcon"
                    onClick={() => {
                        setTimeout(() => {
                            setTaskStyle("task-start");
                        }, 100);
                        setTimeout(() => {
                            setInboxStyle("inbox-start");
                        }, 300);
                        setTimeout(() => {
                            props.onMenuOpen(false);
                            props.onSubmenuOpen(true);
                            props.onInboxOrTask(false);
                            props.onStartQuicks(true);
                        }, 500);
                    }}
                />
            </div>
            <div className={inboxStyle}>
                <div className="inbox-title">Inbox</div>
                <img
                    src={InboxIcon}
                    className="inbox-button"
                    alt="InboxIcon"
                    onClick={() => {
                        setTimeout(() => {
                            setTaskStyle("task-start");
                        }, 100);
                        setTimeout(() => {
                            setInboxStyle("inbox-start");
                        }, 300);
                        setTimeout(() => {
                            props.onMenuOpen(false);
                            props.onSubmenuOpen(true);
                            props.onInboxOrTask(true);
                            props.onStartQuicks(true);
                        }, 500);
                    }}
                />
            </div>
            <img
                src={QuicksIcon}
                className="quicks"
                alt="Quicks"
                onClick={() => {
                    setTimeout(() => {
                        setTaskStyle("task-start");
                    }, 100);
                    setTimeout(() => {
                        setInboxStyle("inbox-start");
                    }, 300);
                    setTimeout(() => {
                        props.onMenuOpen(false);
                    }, 500);
                }}
            />
        </React.Fragment>
    );
};

export default Menu;
