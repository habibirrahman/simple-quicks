import React, { useState, useEffect } from "react";
import "../../App.css";
import { Input, Loader, Form } from "semantic-ui-react";

import InboxItem from "./InboxItem.js";

import TaskIcon from "../../assets/task.svg";
import InboxOpen from "../../assets/inbox-open.svg";
import BackIcon from "../../assets/back.svg";

const group_messages = () => [
    {
        date: "June 08, 2021",
        time: "19:32",
        type: "receive",
        sender: "Mary Hilda",
        font_color: "#E5A443",
        color: "#FCEED3",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message: "Just Fill me in for his updates yea?",
        new_message: false,
    },
    {
        date: "June 08, 2021",
        time: "19:32",
        type: "send",
        sender: "Claren",
        font_color: "#9B51E0",
        color: "#EEDCFF",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message:
            "No worries. It will be completed ASAP. I’ve asked him yesterday.",
        new_message: false,
    },
    {
        date: "June 09, 2021",
        time: "19:32",
        type: "receive",
        sender: "Mary Hilda",
        font_color: "#E5A443",
        color: "#FCEED3",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message:
            "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
        new_message: false,
    },
    {
        date: "June 09, 2021",
        time: "19:32",
        type: "send",
        sender: "Claren",
        font_color: "#9B51E0",
        color: "#EEDCFF",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message:
            "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
        new_message: false,
    },
    {
        date: "June 09, 2021",
        time: "19:32",
        type: "receive",
        sender: "Mary Hilda",
        font_color: "#E5A443",
        color: "#FCEED3",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message: "Sure thing, Claren",
        new_message: false,
    },
    {
        date: "June 09, 2021",
        time: "19:32",
        type: "receive",
        sender: "Obaidullah Amarkhil",
        font_color: "#43B78D",
        color: "#D2F2EA",
        to: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        message: "Morning. I’ll try to do them. Thanks",
        new_message: true,
    },
];

const private_messages = () => [
    {
        date: "June 08, 2021",
        time: "19:32",
        type: "receive",
        sender: "FastVisa Support",
        font_color: "#2F80ED",
        color: "#F8F8F8",
        to: "Claren",
        message:
            "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
        new_message: false,
    },
    {
        date: "June 08, 2021",
        time: "19:32",
        type: "send",
        sender: "Claren",
        font_color: "#9B51E0",
        color: "#EEDCFF",
        to: "FastVisa Support",
        message: "Hi, I need help with something can you help me ?",
        new_message: false,
    },
];

const inboxDataDummy = () => [
    {
        profile: "ChatProfile",
        title: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
        last_sender: "Cameron Phillips",
        last_message: "Please check this out!",
        time: "09/06/2021 19:10",
        type: "group",
        participant: 3,
        read: false,
        history_chat: group_messages(),
    },
    {
        profile: "ChatProfile",
        title: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
        last_sender: "Ellen",
        last_message: "Hey, please read.",
        time: "02/06/2021 10:45",
        type: "group",
        participant: 4,
        read: false,
        history_chat: group_messages(),
    },
    {
        profile: "ChatProfile",
        title: "8405-Diana SALAZAR MUNGUIA",
        last_sender: "Cameron Phillips",
        last_message:
            "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
        time: "01/06/2021 12:19",
        type: "group",
        participant: 5,
        read: false,
        history_chat: group_messages(),
    },
    {
        profile: "ChatProfileSingle",
        title: "FastVisa Support",
        last_message: "Hey there! Welcome to your inbox.",
        time: "01/06/2021 12:19",
        type: "private",
        read: false,
        history_chat: private_messages(),
    },
    {
        profile: "ChatProfileSingle",
        title: "FastVisa Support",
        last_message: "Hey there! Welcome to your inbox.",
        time: "01/06/2021 12:19",
        type: "private",
        read: false,
        history_chat: private_messages(),
    },
];

const SearchBar = (props) => {
    return (
        <React.Fragment>
            <Form>
                <Input
                    fluid
                    focus
                    icon="search"
                    className="search"
                    placeholder="Search"
                    onChange={(e) => {
                        console.log("search results : " + e.target.value);
                    }}
                />
            </Form>
        </React.Fragment>
    );
};

const Inbox = (props) => {
    const [isLoadingShow, setLoadingShow] = useState(true);
    const [isChatsLoaded, setChatsLoaded] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoadingShow(false);
            setChatsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [props.inboxOrTask]);

    return (
        <React.Fragment>
            {/* box of Inbox */}
            <div className={props.inboxCard}>
                <div>
                    <SearchBar data={inboxDataDummy()} />
                    {isLoadingShow && (
                        <Loader className="loading" active>
                            Loading Chats ...
                        </Loader>
                    )}
                    {isChatsLoaded && (
                        <InboxItem inboxData={inboxDataDummy()} />
                    )}
                </div>
            </div>

            {/* other submenu */}
            <div className={props.otherIcon}>
                <img
                    src={TaskIcon}
                    className="task-button"
                    alt="TaskIcon"
                    onClick={() => {
                        setTimeout(() => {
                            props.onOtherIcon("other-icon-start");
                            props.onBackIcon("back-menu-start");
                        }, 200);
                        setTimeout(() => {
                            props.onMenuOpen(false);
                            props.onSubmenuOpen(true);
                            props.onInboxOrTask(false);
                            setChatsLoaded(false);
                            setLoadingShow(true);
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
                        setChatsLoaded(false);
                        setLoadingShow(true);
                    }, 200);
                    setTimeout(() => {
                        props.onMenuOpen(true);
                        props.onSubmenuOpen(false);
                    }, 400);
                }}
            />

            {/* open submenu */}
            <img src={InboxOpen} className="inbox-open" alt="InboxOpen" />
        </React.Fragment>
    );
};

export default Inbox;
