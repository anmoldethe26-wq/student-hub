import Sidebar from "../components/Sidebar";
import "./Analytics.css";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

function Analytics() {

    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const sessions =
        Number(localStorage.getItem("sessions")) || 0;

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(
            (task) => task.completed
        ).length;

    const pendingTasks =
        totalTasks - completedTasks;

    const totalNotes =
        notes.length;

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );

    const productivityScore =
        Math.min(
            100,
            Math.round(
                completionRate * 0.6 +
                sessions * 3 +
                totalNotes * 2
            )
        );

    const studyData = [
        { day: "Mon", hours: 2 },
        { day: "Tue", hours: 4 },
        { day: "Wed", hours: 3 },
        { day: "Thu", hours: 5 },
        { day: "Fri", hours: 6 },
        { day: "Sat", hours: 4 },
        { day: "Sun", hours: 2 },
    ];

    const taskData = [
        {
            name: "Completed",
            value: completedTasks,
        },
        {
            name: "Pending",
            value: pendingTasks,
        },
    ];

    const COLORS = [
        "#3b82f6",
        "#ef4444",
    ];

    return (

        <div className="analytics-page">

            <Sidebar />

            <div className="analytics-container">

                <h1>
                    Analytics Dashboard 📊
                </h1>

                <p className="analytics-subtitle">
                    Track your productivity and performance.
                </p>

                {/* Stats Cards */}

                <div className="analytics-cards">

                    <div className="analytics-card">
                        <h3>Total Tasks</h3>
                        <h1>{totalTasks}</h1>
                    </div>

                    <div className="analytics-card">
                        <h3>Completed</h3>
                        <h1>{completedTasks}</h1>
                    </div>

                    <div className="analytics-card">
                        <h3>Pending</h3>
                        <h1>{pendingTasks}</h1>
                    </div>

                    <div className="analytics-card">
                        <h3>Notes</h3>
                        <h1>{totalNotes}</h1>
                    </div>

                    <div className="analytics-card">
                        <h3>Focus Sessions</h3>
                        <h1>{sessions}</h1>
                    </div>

                    <div className="analytics-card">
                        <h3>Completion Rate</h3>
                        <h1>{completionRate}%</h1>
                    </div>

                </div>

                {/* Productivity Score */}

                <div className="productivity-section">

                    <h2>
                        Productivity Score 🚀
                    </h2>

                    <div className="score-bar">

                        <div
                            className="score-fill"
                            style={{
                                width: `${productivityScore}%`,
                            }}
                        ></div>

                    </div>

                    <h1>
                        {productivityScore}/100
                    </h1>

                </div>

                {/* Charts */}

                <div className="charts-grid">

                    <div className="chart-card">

                        <h2>
                            Weekly Study Hours
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={studyData}
                            >

                                <XAxis
                                    dataKey="day"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="hours"
                                    fill="#3b82f6"
                                    radius={[
                                        8,
                                        8,
                                        0,
                                        0,
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="chart-card">

                        <h2>
                            Task Completion
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={taskData}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >

                                    {taskData.map(
                                        (
                                            entry,
                                            index
                                        ) => (

                                            <Cell
                                                key={
                                                    index
                                                }
                                                fill={
                                                    COLORS[
                                                    index
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Analytics;