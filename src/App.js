import React, { useState } from "react";
import "./App.css";
import { Image } from "semantic-ui-react";

import Menu from "./components/Menu.js";
import Submenu from "./components/Submenu.js";

import QuicksIcon from "./assets/quicks.svg";

const App = () => {
    const [startQuicks, setStartQuicks] = useState(true);
    const _handleStartQuicks = (e) => setStartQuicks(e);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const _handleMenuOpen = (e) => setMenuOpen(e);
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    const _handleSubmenuOpen = (e) => setSubmenuOpen(e);
    // inbox = true, task = false
    const [inboxOrTask, setInboxOrTask] = useState(true);
    const _handleInboxOrTask = (e) => setInboxOrTask(e);

    return (
        <div className="app">
            <div className="start">
                {startQuicks ? (
                    <Image
                        src={QuicksIcon}
                        className="quicks"
                        alt="Quicks"
                        onClick={() => {
                            _handleMenuOpen(true);
                            _handleStartQuicks(false);
                        }}
                    />
                ) : null}
                {isMenuOpen ? (
                    <Menu
                        onStartQuicks={_handleStartQuicks}
                        onMenuOpen={_handleMenuOpen}
                        onSubmenuOpen={_handleSubmenuOpen}
                        onInboxOrTask={_handleInboxOrTask}
                    />
                ) : null}
                {isSubmenuOpen ? (
                    <Submenu
                        onMenuOpen={_handleMenuOpen}
                        isSubmenuOpen={isSubmenuOpen}
                        onSubmenuOpen={_handleSubmenuOpen}
                        inboxOrTask={inboxOrTask}
                        onInboxOrTask={_handleInboxOrTask}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default App;
