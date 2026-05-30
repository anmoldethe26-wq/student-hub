import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Timer.css";

function Timer() {

    const modes = {
        pomodoro: 1500,
        short: 300,
        long: 900,
    };

    const [mode, setMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(modes.pomodoro);
    const [isRunning, setIsRunning] = useState(false);

    const [sessions, setSessions] = useState(() => {
        return Number(localStorage.getItem("sessions")) || 0;
    });

    useEffect(() => {

        let timer;

        if (isRunning && timeLeft > 0) {

            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

        } else if (timeLeft === 0) {

            setIsRunning(false);

            if (mode === "pomodoro") {

                const updatedSessions = sessions + 1;

                setSessions(updatedSessions);

                localStorage.setItem(
                    "sessions",
                    updatedSessions
                );

                alert("🎉 Focus Session Completed!");
            }
        }

        return () => clearInterval(timer);

    }, [isRunning, timeLeft, mode, sessions]);

    const formatTime = () => {

        const minutes = Math.floor(timeLeft / 60);

        const seconds = timeLeft % 60;

        return `${minutes
            .toString()
            .padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
    };

    const changeMode = (selectedMode) => {

        setMode(selectedMode);

        setTimeLeft(modes[selectedMode]);

        setIsRunning(false);
    };

    const progress =
        ((modes[mode] - timeLeft) / modes[mode]) * 100;

    return (
        <div className="timer-page">

            <Sidebar />

            <div className="timer-container">

                <h1>Pomodoro Focus Timer 🍅</h1>

                <p className="timer-subtitle">
                    Stay focused and boost productivity.
                </p>

                <div className="timer-modes">

                    <button
                        className={mode === "pomodoro" ? "active-mode" : ""}
                        onClick={() => changeMode("pomodoro")}
                    >
                        Pomodoro
                    </button>

                    <button
                        className={mode === "short" ? "active-mode" : ""}
                        onClick={() => changeMode("short")}
                    >
                        Short Break
                    </button>

                    <button
                        className={mode === "long" ? "active-mode" : ""}
                        onClick={() => changeMode("long")}
                    >
                        Long Break
                    </button>

                </div>

                <div className="timer-card">

                    <div className="progress-ring">

                        <svg width="260" height="260">

                            <circle
                                cx="130"
                                cy="130"
                                r="110"
                                className="bg-circle"
                            />

                            <circle
                                cx="130"
                                cy="130"
                                r="110"
                                className="progress-circle"
                                style={{
                                    strokeDashoffset:
                                        691 - (691 * progress) / 100,
                                }}
                            />

                        </svg>

                        <div className="timer-text">
                            {formatTime()}
                        </div>

                    </div>

                    <div className="timer-buttons">

                        <button
                            className="start-btn"
                            onClick={() => setIsRunning(true)}
                        >
                            Start
                        </button>

                        <button
                            className="pause-btn"
                            onClick={() => setIsRunning(false)}
                        >
                            Pause
                        </button>

                        <button
                            className="reset-btn"
                            onClick={() => {
                                setTimeLeft(modes[mode]);
                                setIsRunning(false);
                            }}
                        >
                            Reset
                        </button>

                    </div>

                </div>

                <div className="session-card">

                    <h2>🔥 Focus Sessions</h2>

                    <h1>{sessions}</h1>

                    <p>Focus Sessions Completed</p>

                    <div className="session-stats">

                        <div>

                            <h3>{sessions * 25}m</h3>

                            <span>Focus Time</span>

                        </div>

                        <div>

                            <h3>{Math.min(Math.round((sessions / 4) * 100), 100)}%</h3>

                            <span>Goal</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Timer;