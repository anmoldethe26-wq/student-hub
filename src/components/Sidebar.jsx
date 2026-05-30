import { useState } from "react";
import { Link } from "react-router-dom";

import {
    FaHome,
    FaTasks,
    FaStickyNote,
    FaClock,
    FaChartBar,
    FaUser,
    FaCog,
    FaBars,
    FaTimes,
} from "react-icons/fa";

function Sidebar() {

    const [open, setOpen] = useState(false);

    return (
        <>

            <button
                className="menu-btn"
                onClick={() => setOpen(true)}
            >
                <FaBars />
            </button>

            <div
                className={`sidebar ${open ? "show-sidebar" : ""
                    }`}
            >

                <button
                    className="close-btn"
                    onClick={() => setOpen(false)}
                >
                    <FaTimes />
                </button>

                <div className="logo">
                    <h2>Student Hub</h2>
                </div>

                <ul>

                    <li>
                        <Link to="/">
                            <FaHome /> Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/tasks">
                            <FaTasks /> Tasks
                        </Link>
                    </li>

                    <li>
                        <Link to="/notes">
                            <FaStickyNote /> Notes
                        </Link>
                    </li>

                    <li>
                        <Link to="/timer">
                            <FaClock /> Timer
                        </Link>
                    </li>

                    <li>
                        <Link to="/analytics">
                            <FaChartBar /> Analytics
                        </Link>
                    </li>

                    <li>
                        <Link to="/profile">
                            <FaUser /> Profile
                        </Link>
                    </li>

                    <li>
                        <Link to="/settings">
                            <FaCog /> Settings
                        </Link>
                    </li>

                </ul>

            </div>

        </>
    );
}

export default Sidebar;