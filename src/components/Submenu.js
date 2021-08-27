import React, { useState, useEffect } from "react";
import "../App.css";

import Inbox from "./inbox/Inbox.js";
import Task from "./task/Task.js";

const Submenu = (props) => {
    const [otherIcon, setOtherIcon] = useState("other-icon-start");
    const [backIcon, setBackIcon] = useState("back-menu-start");
    const [inboxCard, setInboxCard] = useState("inbox-card-start");
    const [taskCard, setTaskCard] = useState("task-card-start");

    useEffect(() => {
        if (props.isSubmenuOpen === true) {
            let timer = setTimeout(() => {
                setOtherIcon("other-icon");
                setBackIcon("back-menu");
            }, 200);
            let timer2 = setTimeout(() => {
                if (props.inboxOrTask === true) {
                    setInboxCard("inbox-card");
                    setTaskCard("task-card-start");
                } else {
                    setInboxCard("inbox-card-start");
                    setTaskCard("task-card");
                }
            }, 300);
            return () => clearTimeout(timer, timer2);
        }
    });

    return (
        <React.Fragment>
            {props.inboxOrTask ? (
                // inbox opened
                <Inbox
                    inboxCard={inboxCard}
                    otherIcon={otherIcon}
                    backIcon={backIcon}
                    inboxOrTask={props.inboxOrTask}
                    onOtherIcon={setOtherIcon}
                    onBackIcon={setBackIcon}
                    onMenuOpen={props.onMenuOpen}
                    onSubmenuOpen={props.onSubmenuOpen}
                    onInboxOrTask={props.onInboxOrTask}
                    onInboxCard={setInboxCard}
                    onTaskCard={setTaskCard}
                />
            ) : (
                // task opened
                <Task
                    taskCard={taskCard}
                    otherIcon={otherIcon}
                    backIcon={backIcon}
                    inboxOrTask={props.inboxOrTask}
                    onOtherIcon={setOtherIcon}
                    onBackIcon={setBackIcon}
                    onMenuOpen={props.onMenuOpen}
                    onSubmenuOpen={props.onSubmenuOpen}
                    onInboxOrTask={props.onInboxOrTask}
                    onInboxCard={setInboxCard}
                    onTaskCard={setTaskCard}
                />
            )}
        </React.Fragment>
    );
};

export default Submenu;
