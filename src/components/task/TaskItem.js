import React, { useState } from "react";
import "../../App.css";
import { Checkbox } from "semantic-ui-react";

import ExpandUp from "../../assets/expand-up.svg";
import ExpandDown from "../../assets/expand-down.svg";
import ThreePoint from "../../assets/three-point.svg";
import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import Pen from "../../assets/pen.svg";

const TaskItem = (props) => {
    const [expandButton, setExpandButton] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [isLimitShow, setLimitShow] = useState(!checkboxValue);
    const _handleCheckbox = (e, { checked }) => {
        setCheckboxValue(checked);
        setLimitShow(!checked);
        checked && setExpandButton(false);
    };
    return (
        <React.Fragment>
            <div className="item">
                <div className="info">
                    <div className="left">
                        <Checkbox
                            style={{ marginTop: "1px" }}
                            onChange={_handleCheckbox}
                        />
                        <div
                            className={
                                checkboxValue ? "title-checked" : "title"
                            }
                        >
                            Set up documentation report for several Cases : Case
                            145443, Case 192829 and Case 182203
                        </div>
                    </div>
                    <div className="right">
                        {isLimitShow && (
                            <div className="limit">4 Days Left</div>
                        )}
                        <div className="date">14/06/2021</div>
                        <img
                            className="expand"
                            src={expandButton ? ExpandUp : ExpandDown}
                            alt="ExpandButton"
                            onClick={() => setExpandButton(!expandButton)}
                        />
                        <img className="menu" src={ThreePoint} alt="Menu" />
                    </div>
                </div>
                {expandButton && (
                    <div className="details">
                        <div className="date-info">
                            <img className="clock" src={Clock} alt="Clock" />
                            <div className="set-date">
                                <div className="date-value">14/06/2021</div>
                                <img src={Calendar} alt="Calendar" />
                            </div>
                        </div>
                        <div className="description">
                            <img src={Pen} alt="Pen" />
                            <div className="set-description">
                                Closing off this case since this application has
                                been cancelled. No one really understand how
                                this case could possibly be cancelled. The
                                options and the documents within this document
                                were totally a guaranteed for a success!
                            </div>
                        </div>
                    </div>
                )}

                <hr className="devider" />
            </div>
        </React.Fragment>
    );
};

export default TaskItem;
