import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Tasks.css";

function Tasks() {


    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem("tasks");

        return savedTasks
            ? JSON.parse(savedTasks)
            : [];
    });

    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
    }, [tasks]);

    const addTask = () => {

        if (!newTask.trim()) return;

        const taskObject = {
            id: Date.now(),
            text: newTask,
            priority,
            completed: false,
        };

        setTasks([taskObject, ...tasks]);

        setNewTask("");
        setPriority("Medium");
    };

    const deleteTask = (id) => {

        setTasks(
            tasks.filter(
                (task) => task.id !== id
            )
        );
    };

    const toggleTask = (id) => {

        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed:
                            !task.completed,
                    }
                    : task
            )
        );
    };

    const filteredTasks = tasks.filter(
        (task) => {

            if (filter === "Completed")
                return task.completed;

            if (filter === "Pending")
                return !task.completed;

            return true;
        }
    );

    return (

        <div className="tasks-page">

            <Sidebar />

            <div className="tasks-container">

                <h1>
                    Productivity Workspace 🚀
                </h1>

                <p className="subtitle">
                    Manage tasks and stay productive.
                </p>

                <div className="task-input">

                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={newTask}
                        onChange={(e) =>
                            setNewTask(
                                e.target.value
                            )
                        }
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(
                                e.target.value
                            )
                        }
                    >
                        <option>
                            High
                        </option>

                        <option>
                            Medium
                        </option>

                        <option>
                            Low
                        </option>

                    </select>

                    <button
                        onClick={addTask}
                    >
                        Add Task
                    </button>

                </div>

                <div className="filters">

                    <button
                        onClick={() =>
                            setFilter("All")
                        }
                    >
                        All
                    </button>

                    <button
                        onClick={() =>
                            setFilter(
                                "Pending"
                            )
                        }
                    >
                        Pending
                    </button>

                    <button
                        onClick={() =>
                            setFilter(
                                "Completed"
                            )
                        }
                    >
                        Completed
                    </button>

                </div>

                <div className="task-list">

                    {filteredTasks.length ===
                        0 ? (

                        <p className="empty-message">
                            No tasks found.
                        </p>

                    ) : (

                        filteredTasks.map(
                            (task) => (

                                <div
                                    className="task-card"
                                    key={task.id}
                                >

                                    <div>

                                        <h3
                                            style={{
                                                textDecoration:
                                                    task.completed
                                                        ? "line-through"
                                                        : "none",
                                            }}
                                        >
                                            {task.text}
                                        </h3>

                                        <span
                                            className={`priority ${task.priority.toLowerCase()}`}
                                        >
                                            {task.priority}
                                        </span>

                                    </div>

                                    <div className="task-buttons">

                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                toggleTask(
                                                    task.id
                                                )
                                            }
                                        >
                                            {task.completed
                                                ? "Undo"
                                                : "Complete"}
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteTask(
                                                    task.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            )
                        )

                    )}

                </div>

            </div>

        </div>
    );


}

export default Tasks;
