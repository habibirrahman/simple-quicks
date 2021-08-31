import React, { useState, useEffect, useRef } from "react";
import { Checkbox, Input } from "semantic-ui-react";
import "../../App.css";

import ExpandUp from "../../assets/expand-up.svg";
import ExpandDown from "../../assets/expand-down.svg";
import ThreePoint from "../../assets/three-point.svg";
import ClockGray from "../../assets/clock-gray.svg";
import Clock from "../../assets/clock.svg";
import PenGray from "../../assets/pen-gray.svg";
import Pen from "../../assets/pen.svg";
// import CalendarIcon from "../../assets/calendar.svg";

const daysOfMonth = () => [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const TaskItem = (props) => {
    const [expandButton, setExpandButton] = useState(!props.item.completed);
    const [checkboxValue, setCheckboxValue] = useState(props.item.completed);
    const [isLimitShow, setLimitShow] = useState(!checkboxValue);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [title, setTitle] = useState(props.item.title);
    const [titleInput, setTitleInput] = useState("");
    const [editTitle, setEditTitle] = useState(false);

    const [date, setDate] = useState(props.item.deadline);
    const [dateInput, setDateInput] = useState("");

    const [remaining, setRemaining] = useState("");

    const [desc, setDesc] = useState(props.item.description);
    const [descInput, setDescInput] = useState("");
    const [editDesc, setEditDesc] = useState(false);
    const [textRows, setTextRows] = useState(3);

    const menuRef = useRef(null);

    const _handleCheckbox = (e, { checked }) => {
        setCheckboxValue(checked);
        setLimitShow(!checked);
        checked && setExpandButton(false);
    };

    const _handleTitleInput = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setTitle(titleInput);
            setEditTitle(false);
            // set props
            props.item.title = titleInput;
        }
    };

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

    const _getDateFormatFromInput = (e) => {
        let year = e[0] + e[1] + e[2] + e[3];
        let month = e[5] + e[6];
        let day = e[8] + e[9];
        return { year: year, month: month, day: day };
    };

    const _getDateFormatFromData = (e) => {
        let year = e[6] + e[7] + e[8] + e[9];
        let month = e[3] + e[4];
        let day = e[0] + e[1];
        return { year: year, month: month, day: day };
    };

    const _handleSetRemaining = (e) => {
        let year = Number(e.year);
        let month = Number(e.month) - 1;
        let day = Number(e.day);
        let today = new Date();

        if (today.getFullYear() < year) {
            let diff = year - today.getFullYear();
            day = 365 * diff + day;
        } else if (today.getFullYear() > year) {
            return setRemaining("Over Due");
        }

        if (today.getMonth() < month) {
            let diff = month - today.getMonth();
            day = daysOfMonth()[month + 1] * diff + day;
        } else if (today.getMonth() > month) {
            return setRemaining("Over Due");
        }

        let term = day - today.getDate();
        if (term > 1) {
            return setRemaining(term + " Days Left");
        } else if (term === 1) {
            return setRemaining("Tomorrow");
        } else if (term === 0) {
            return setRemaining("Today");
        } else {
            return setRemaining("Over Due");
        }
    };

    const _handleChangeDate = (e) => {
        let input = _getDateFormatFromInput(e.target.value);
        setDateInput(e.target.value);
        setDate(input.day + "/" + input.month + "/" + input.year);
        _handleSetRemaining(input);
        // set props
        props.item.deadline = input.day + "/" + input.month + "/" + input.year;
    };

    const _handleDescInput = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setDesc(descInput);
            setEditDesc(false);
            // set props
            props.item.description = descInput;
        }
    };

    useEffect(() => {
        if (title === "") {
            return "";
        }
        setTitleInput(title);
    }, [title]);

    useEffect(() => {
        let length = descInput.length;
        if (length > 50) setTextRows(length / 50 + 2);
    }, [descInput]);

    useEffect(() => {
        if (desc === "") {
            return "";
        }
        setDescInput(desc);
    }, [desc]);

    useEffect(() => {
        if (date === "") {
            return setDateInput("");
        }
        let data = _getDateFormatFromData(date);
        setDateInput(data.year + "-" + data.month + "-" + data.day);
        _handleSetRemaining(data);
    }, [date]);

    return (
        <React.Fragment>
            <div className="item">
                <div className="info">
                    <div className="left">
                        <Checkbox
                            checked={checkboxValue}
                            style={{ marginTop: "1px" }}
                            onChange={_handleCheckbox}
                        />
                        {!editTitle ? (
                            <div>
                                {title === "" ? (
                                    <div
                                        className="title-unset"
                                        onClick={() => setEditTitle(true)}
                                    >
                                        Type Task Title
                                    </div>
                                ) : (
                                    <>
                                        {checkboxValue ? (
                                            <div className="title-checked">
                                                {title}
                                            </div>
                                        ) : (
                                            <div
                                                className="title"
                                                onClick={() =>
                                                    setEditTitle(true)
                                                }
                                            >
                                                {title}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="title-input">
                                <input
                                    type="text"
                                    placeholder="Type Task Title"
                                    value={titleInput}
                                    onChange={(e) =>
                                        setTitleInput(e.target.value)
                                    }
                                    onKeyDown={_handleTitleInput}
                                />
                            </div>
                        )}
                    </div>
                    <div className="right">
                        {isLimitShow && (
                            <div className="limit">{remaining}</div>
                        )}
                        <div className="date">{date}</div>

                        <img
                            className="expand"
                            src={expandButton ? ExpandUp : ExpandDown}
                            alt="ExpandButton"
                            onClick={() => setExpandButton(!expandButton)}
                        />
                        <div className="menu">
                            <img
                                src={ThreePoint}
                                alt="Menu"
                                onClick={() => setMenuOpen(!isMenuOpen)}
                            />
                            {isMenuOpen && (
                                <div className="task-menu" ref={menuRef}>
                                    <div className="menu">
                                        <div
                                            className="delete"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure you wish to delete this task?"
                                                    )
                                                )
                                                    props.onDeleteTask(
                                                        props.index
                                                    );
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {expandButton && (
                    <div className="details">
                        <div className="date-info">
                            {date === "" ? (
                                <img
                                    className="clock"
                                    src={ClockGray}
                                    alt="Clock"
                                />
                            ) : (
                                <img
                                    className="clock"
                                    src={Clock}
                                    alt="Clock"
                                />
                            )}
                            {/* <div
                                className="set-date"
                                onClick={() => setCalendarOpen(!isCalendarOpen)}
                            >
                                <div className="date-value">{date}</div>
                                <img src={CalendarIcon} alt="Calendar" />
                            </div> */}
                            <div className="set-calendar">
                                <Input
                                    type="date"
                                    placeholder="Set Date"
                                    value={dateInput}
                                    onChange={_handleChangeDate}
                                />
                            </div>
                        </div>
                        <div className="description">
                            {desc === "" ? (
                                <img
                                    src={PenGray}
                                    alt="Pen"
                                    onClick={() => setEditDesc(!editDesc)}
                                />
                            ) : (
                                <img
                                    src={Pen}
                                    alt="Pen"
                                    onClick={() => setEditDesc(!editDesc)}
                                />
                            )}
                            {!editDesc ? (
                                <div
                                    className="set-description"
                                    onClick={() => setEditDesc(true)}
                                >
                                    {desc === "" ? "No Description" : desc}
                                </div>
                            ) : (
                                <div className="set-description-input">
                                    <textarea
                                        name="desc"
                                        cols="65"
                                        rows={textRows}
                                        placeholder="Type a new description ..."
                                        value={descInput}
                                        onChange={(e) =>
                                            setDescInput(e.target.value)
                                        }
                                        onKeyDown={_handleDescInput}
                                    ></textarea>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <hr className="devider" />
            </div>
        </React.Fragment>
    );
};

export default TaskItem;
