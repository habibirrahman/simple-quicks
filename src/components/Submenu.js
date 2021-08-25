import React, { useState, useEffect } from "react";
import "../App.css";

import InboxCard from "./inbox/Inbox.js";
import TaskCard from "./Task.js";

const Submenu = (props) => {
    const [otherIcon, setOtherIcon] = useState("other-icon-start");
    const _handleOtherIcon = (e) => setOtherIcon(e);
    const [backIcon, setBackIcon] = useState("back-menu-start");
    const _handleBackIcon = (e) => setBackIcon(e);
    const [inboxCard, setInboxCard] = useState("inbox-card-start");
    const _handleInboxCard = (e) => setInboxCard(e);
    const [taskCard, setTaskCard] = useState("task-card-start");
    const _handleTaskCard = (e) => setTaskCard(e);

    useEffect(() => {
        if (props.isSubmenuOpen === true) {
            const timer = setTimeout(() => {
                _handleOtherIcon("other-icon");
                _handleBackIcon("back-menu");
            }, 200);
            const timer2 = setTimeout(() => {
                if (props.inboxOrTask === true) {
                    _handleInboxCard("inbox-card");
                    _handleTaskCard("task-card");
                } else {
                    _handleInboxCard("inbox-card-start");
                    _handleTaskCard("task-card");
                }
            }, 300);
            return () => {
                clearTimeout(timer, timer2);
            };
        }
    });

    return (
        <React.Fragment>
            {props.inboxOrTask ? (
                // inbox opened
                <InboxCard
                    inboxCard={inboxCard}
                    otherIcon={otherIcon}
                    backIcon={backIcon}
                    inboxOrTask={props.inboxOrTask}
                    onOtherIcon={_handleOtherIcon}
                    onBackIcon={_handleBackIcon}
                    onMenuOpen={props.onMenuOpen}
                    onSubmenuOpen={props.onSubmenuOpen}
                    onInboxOrTask={props.onInboxOrTask}
                    onInboxCard={_handleInboxCard}
                    onTaskCard={_handleTaskCard}
                />
            ) : (
                // task opened
                <TaskCard
                    taskCard={taskCard}
                    otherIcon={otherIcon}
                    backIcon={backIcon}
                    inboxOrTask={props.inboxOrTask}
                    onOtherIcon={_handleOtherIcon}
                    onBackIcon={_handleBackIcon}
                    onMenuOpen={props.onMenuOpen}
                    onSubmenuOpen={props.onSubmenuOpen}
                    onInboxOrTask={props.onInboxOrTask}
                    onInboxCard={_handleInboxCard}
                    onTaskCard={_handleTaskCard}
                />
            )}
        </React.Fragment>
    );
};

export default Submenu;
