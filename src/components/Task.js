import React from "react";
import "../App.css";

import InboxIcon from "../assets/inbox.svg";
import TaskOpen from "../assets/task-open.svg";
import BackIcon from "../assets/back.svg";

const TaskCard = (props) => {
    return (
        <React.Fragment>
            <div>
                <div className={props.taskCard}>Task</div>
                <div className={props.otherIcon}>
                    <img
                        src={InboxIcon}
                        className="inbox-button"
                        alt="InboxIcon"
                        onClick={() => {
                            setTimeout(() => {
                                props.onOtherIcon("other-icon-start");
                                props.onBackIcon("back-menu-start");
                            }, 200);
                            setTimeout(() => {
                                props.onMenuOpen(false);
                                props.onSubmenuOpen(true);
                                props.onInboxOrTask(true);
                            }, 400);
                        }}
                    />
                </div>
                <img
                    src={BackIcon}
                    className={props.backIcon}
                    alt="Back"
                    onClick={() => {
                        setTimeout(() => {
                            props.onOtherIcon("other-icon-start");
                            props.onBackIcon("back-menu-start");
                            props.onInboxCard("inbox-card-start");
                            props.onTaskCard("task-card-start");
                        }, 200);
                        setTimeout(() => {
                            props.onMenuOpen(true);
                            props.onSubmenuOpen(false);
                        }, 400);
                    }}
                />
                <img src={TaskOpen} className="task-open" alt="TaskOpen" />
            </div>
        </React.Fragment>
    );
};

export default TaskCard;
