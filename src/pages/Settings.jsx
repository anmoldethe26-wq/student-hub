import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

function Settings() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") !== "false"
    );

    useEffect(() => {

        localStorage.setItem(
            "darkMode",
            darkMode
        );

        if (darkMode) {
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
        }

    }, [darkMode]);

    const resetData = () => {

        const confirmReset =
            window.confirm(
                "Are you sure you want to delete all data?"
            );

        if (!confirmReset) return;

        localStorage.removeItem("tasks");
        localStorage.removeItem("notes");
        localStorage.removeItem("sessions");

        alert("All data has been reset.");
    };

    return (
        <div className="settings-page">

            <Sidebar />

            <div className="settings-container">

                <h1>Settings ⚙️</h1>

                <p className="settings-subtitle">
                    Customize your Student Hub experience.
                </p>

                <div className="settings-card">

                    <h2>Appearance</h2>

                    <div className="setting-item">

                        <span>Dark Mode</span>

                        <button
                            className="toggle-btn"
                            onClick={() =>
                                setDarkMode(!darkMode)
                            }
                        >
                            {darkMode
                                ? "ON 🌙"
                                : "OFF ☀️"}
                        </button>

                    </div>

                </div>

                <div className="settings-card">

                    <h2>Data Management</h2>

                    <button
                        className="danger-btn"
                        onClick={resetData}
                    >
                        Reset All Data
                    </button>

                </div>

                <div className="settings-card">

                    <h2>About</h2>

                    <p>
                        Student Hub v1.0
                    </p>

                    <p>
                        Built with React.js 🚀
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Settings;