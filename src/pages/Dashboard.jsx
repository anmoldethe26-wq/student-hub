import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

import "./Dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        tasks: 0,
        completed: 0,
        notes: 0,
        sessions: 0,
    });

    useEffect(() => {

        const tasks =
            JSON.parse(localStorage.getItem("tasks")) || [];

        const notes =
            JSON.parse(localStorage.getItem("notes")) || [];

        const sessions =
            Number(localStorage.getItem("sessions")) || 0;

        setStats({
            tasks: tasks.length,
            completed: tasks.filter(
                (task) => task.completed
            ).length,
            notes: notes.length,
            sessions,
        });

    }, []);

    return (
        <div className="app">

            <Sidebar />

            <div className="main-content">

                <Header />

                {/* Stats Cards */}

                <div className="cards">

                    <div className="card card1">
                        <DashboardCard
                            title="📋 Tasks"
                            value={stats.tasks}
                        />
                    </div>

                    <div className="card card2">
                        <DashboardCard
                            title="✅ Done"
                            value={stats.completed}
                        />
                    </div>

                    <div className="card card3">
                        <DashboardCard
                            title="📝 Notes"
                            value={stats.notes}
                        />
                    </div>

                    <div className="card card4">
                        <DashboardCard
                            title="🍅 Focus"
                            value={stats.sessions}
                        />
                    </div>

                </div>

                {/* Bottom Section */}

                <div className="dashboard-bottom">

                    <div className="recent-tasks">

                        <h2>Quick Actions ⚡</h2>

                        <Link
                            to="/tasks"
                            className="task-item"
                        >
                            ➕ Add New Task
                        </Link>

                        <Link
                            to="/notes"
                            className="task-item"
                        >
                            📝 Create Note
                        </Link>

                        <Link
                            to="/timer"
                            className="task-item"
                        >
                            🍅 Start Focus Session
                        </Link>

                        <Link
                            to="/analytics"
                            className="task-item"
                        >
                            📊 View Analytics
                        </Link>

                    </div>

                    <div className="right-widgets">

                        <div className="progress-card">

                            <h2>Weekly Goal</h2>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${Math.min(
                                            (stats.sessions / 4) * 100,
                                            100
                                        )}%`,
                                    }}
                                ></div>

                            </div>

                            <p>
                                {Math.min(
                                    Math.round(
                                        (stats.sessions / 4) * 100
                                    ),
                                    100
                                )}
                                % Completed
                            </p>

                        </div>

                        <div className="streak-card">

                            <h2>🔥 Study Streak</h2>

                            <h1>{stats.sessions}</h1>

                            <p>Focus Sessions</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;