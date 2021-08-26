import React, { useState } from "react";
import "../App.css";
import { Dropdown, Button } from "semantic-ui-react";

import InboxIcon from "../assets/inbox.svg";
import TaskOpen from "../assets/task-open.svg";
import BackIcon from "../assets/back.svg";

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
    const [isTaskShow, setTaskShow] = useState(true);
    const [dropdownValue, setDropdownValue] = useState(getOptions()[0].text);
    // const [isContentShow, setContentShow] = useState(false);
    const _handleChangeDropdown = (e, { value }) => {
        setDropdownValue(value);
        console.log(value);
    };
    const _handleNewTask = () => {
        console.log('new task')
    }
    return (
        <React.Fragment>
            {/* box of task */}
            {isTaskShow && null}
            <div className={props.taskCard}>
                <div className="task-header">
                    <Dropdown
                        selection
                        options={getOptions()}
                        value={dropdownValue}
                        onChange={_handleChangeDropdown}
                        ref={null}
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
