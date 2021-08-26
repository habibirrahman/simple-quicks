import React, { useState, useEffect } from "react";
import "../App.css";
import { Dropdown, Button, Checkbox } from "semantic-ui-react";

import InboxIcon from "../assets/inbox.svg";
import TaskOpen from "../assets/task-open.svg";
import BackIcon from "../assets/back.svg";

import ExpandUp from "../assets/expand-up.svg";
// import ExpandDown from "../assets/expand-down.svg";
import ThreePoint from "../assets/three-point.svg";
import Clock from "../assets/clock.svg";
import Calendar from "../assets/calendar.svg";
import Pen from "../assets/pen.svg";

const getOptions = () => [
    {
        key: 1,
        text: "My Task",
        value: "My Task",
    },
    {
        key: 2,
        text: "Personal Errands",
        value: "Personal Errands",
    },
    {
        key: 3,
        text: "Urgent To-Do",
        value: "Urgent To-Do",
    },
];

const Task = (props) => {
    const [isTaskContentShow, setTaskContentShow] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(getOptions()[0].text);
    // const [isContentShow, setContentShow] = useState(false);
    const _handleChangeDropdown = (e, { value }) => {
        setDropdownValue(value);
        console.log(value);
    };
    const _handleNewTask = () => {
        console.log("new task");
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            setTaskContentShow(true);
        }, 300);
        return () => clearTimeout(timer);
    });
    return (
        <React.Fragment>
            {/* box of task */}
            <div className={props.taskCard}>
                <div className="task-header">
                    <Dropdown
                        selection
                        options={getOptions()}
                        value={dropdownValue}
                        onChange={_handleChangeDropdown}
                    />
                    <Button
                        primary
                        style={{
                            padding: "12.3px 20px",
                            margin: "0",
                        }}
                        onClick={_handleNewTask}
                    >
                        New Task
                    </Button>
                </div>
                {/* <Loader className="loading" active>
                    Task Management Service <br />
                    Coming Soon ...
                </Loader> */}
                {isTaskContentShow && (
                    <div className="task-content">
                        <div className="item">
                            <div className="info">
                                <div className="left">
                                    <Checkbox
                                        style={{ marginTop: "1px" }}
                                        // onChange={}
                                        // onClick={}
                                    />
                                    <div className="title">
                                        Set up documentation report for several
                                        Cases : Case 145443, Case 192829 and
                                        Case 182203
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="limit">4 Days Left</div>
                                    <div className="date">14/06/2021</div>
                                    <img
                                        className="details"
                                        src={ExpandUp}
                                        alt="ExpandUp"
                                    />
                                    <img
                                        className="menu"
                                        src={ThreePoint}
                                        alt="Menu"
                                    />
                                </div>
                            </div>
                            <div className="action">
                                <div className="date-info">
                                    <img
                                        className="clock"
                                        src={Clock}
                                        alt="Clock"
                                    />
                                    <div className="set-date">
                                        <div className="date-value">
                                            14/06/2021
                                        </div>
                                        <img
                                            className="calendar-icon"
                                            src={Calendar}
                                            alt="Calendar"
                                        />
                                    </div>
                                </div>
                                <div className="description">
                                    <img className="pen" src={Pen} alt="Pen" />
                                    <div className="set-description">
                                        Closing off this case since this
                                        application has been cancelled. No one
                                        really understand how this case could
                                        possibly be cancelled. The options and
                                        the documents within this document were
                                        totally a guaranteed for a success!
                                    </div>
                                </div>
                            </div>
                            <hr className="devider" />
                        </div>
                    </div>
                )}
            </div>

            {/* other submenu */}
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

            {/* submenu back button */}

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
            {/* open submenu */}

            <img src={TaskOpen} className="task-open" alt="TaskOpen" />
        </React.Fragment>
    );
};

export default Task;
