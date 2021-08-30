import React, { useState, useEffect } from "react";
import "../../App.css";
import { Dropdown, Button, Loader } from "semantic-ui-react";

import TaskItem from "./TaskItem.js";

import InboxIcon from "../../assets/inbox.svg";
import TaskOpen from "../../assets/task-open.svg";
import BackIcon from "../../assets/back.svg";

const taskDataDummy = () => [
    {
        title: "Close off Case #012920- RODRIGUES, Amiguel",
        deadline: "12/09/2021",
        description:
            "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
        completed: false,
        type: "Personal Errands",
        tag: [],
    },
    {
        title: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
        deadline: "14/09/2021",
        description:
            "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
        completed: false,
        type: "My Tasks",
        tag: [],
    },
    {
        title: "Set up appointment with Dr Blake",
        deadline: "22/09/2021",
        description: "",
        completed: false,
        type: "My Tasks",
        tag: [],
    },
    {
        title: "Contact Mr Caleb - video conference?",
        deadline: "03/06/2021",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        completed: true,
        type: "My Tasks",
        tag: [],
    },
    {
        title: "Assign 3 homework to Client A",
        deadline: "02/06/2021",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        completed: true,
        type: "Urgent To-Do",
        tag: [],
    },
];

const getOptions = () => [
    {
        key: 1,
        text: "My Tasks",
        value: "My Tasks",
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
    const [dataDummy, setDataDummy] = useState(taskDataDummy());
    const [isLoadingShow, setLoadingShow] = useState(true);

    // const [isContentShow, setContentShow] = useState(false);
    const _handleChangeDropdown = (e, { value }) => {
        setDropdownValue(value);
        setTaskContentShow(false);
        setLoadingShow(true);
    };

    const _handleNewTask = () => {
        let new_task = [
            {
                title: "",
                deadline: "",
                description: "",
                completed: false,
                type: dropdownValue,
                tag: [],
            },
        ];

        // eslint-disable-next-line array-callback-return
        // dataDummy.map((item, index) => {
        //     new_task[index + 1] = item;
        // });
        new_task = [...new_task, ...dataDummy];
        console.log(new_task);
        // setTaskContentShow(false);
        return setDataDummy(new_task);
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            setTaskContentShow(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [dataDummy]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoadingShow(false);
            setTaskContentShow(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [isLoadingShow, dropdownValue]);

    return (
        <React.Fragment>
            {/* box of task */}
            <div className={props.taskCard}>
                <div className="task-header">
                    {/* <div className="dropdown"></div>
                    <div className="dropdown-open">
                        <div className="dropdown-item-1"></div>
                        <div className="dropdown-item-2"></div>
                    </div> */}
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
                {isLoadingShow && (
                    <Loader className="loading" active>
                        Loading Task List ...
                    </Loader>
                )}
                {isTaskContentShow && (
                    <div className="task-content">
                        {dataDummy.map((item, index) => (
                            <div key={index}>
                                {(item.type === dropdownValue ||
                                    item.type === "") && (
                                    <TaskItem
                                        item={item}
                                        type={dropdownValue}
                                    />
                                )}
                            </div>
                        ))}
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
