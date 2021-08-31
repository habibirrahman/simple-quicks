import React, { useState } from "react";
import "./App.css";
import { Image } from "semantic-ui-react";

import Menu from "./components/Menu.js";
import Submenu from "./components/Submenu.js";

import QuicksIcon from "./assets/quicks.svg";

const App = () => {
    const [startQuicks, setStartQuicks] = useState(true);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    // inbox = true, task = false
    const [inboxOrTask, setInboxOrTask] = useState(true);

    return (
        <div className="app">
            <div className="start">
                {startQuicks && (
                    <Image
                        src={QuicksIcon}
                        className="quicks"
                        alt="Quicks"
                        onClick={() => {
                            setMenuOpen(true);
                        }}
                    />
                )}
                {isMenuOpen && (
                    <Menu
                        onStartQuicks={setStartQuicks}
                        onMenuOpen={setMenuOpen}
                        onSubmenuOpen={setSubmenuOpen}
                        onInboxOrTask={setInboxOrTask}
                    />
                )}
                {isSubmenuOpen && (
                    <Submenu
                        isSubmenuOpen={isSubmenuOpen}
                        inboxOrTask={inboxOrTask}
                        onMenuOpen={setMenuOpen}
                        onSubmenuOpen={setSubmenuOpen}
                        onInboxOrTask={setInboxOrTask}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
