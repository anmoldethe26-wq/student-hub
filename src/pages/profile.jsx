import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile() {

    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const sessions =
        Number(localStorage.getItem("sessions")) || 0;

    const completedTasks =
        tasks.filter((task) => task.completed).length;

    const focusHours = Math.floor((sessions * 25) / 60);

    const productivityScore = Math.min(
        Math.round(
            (completedTasks * 3 +
                notes.length * 2 +
                sessions * 5) / 2
        ),
        100
    );

    return (
        <div className="profile-page">

            <Sidebar />

            <div className="profile-container">

                <div className="profile-card">

                    <div className="avatar">
                        👨‍💻
                    </div>

                    <h1>Anmol Dethe</h1>

                    <p className="role">
                        Student Productivity Enthusiast 🚀
                    </p>

                    <p className="member">
                        Member since 2025
                    </p>

                    <div className="score-section">

                        <h2>Productivity Score</h2>

                        <div className="score-bar">

                            <div
                                className="score-fill"
                                style={{
                                    width: `${productivityScore}%`,
                                }}
                            ></div>

                        </div>

                        <p>{productivityScore}/100</p>

                    </div>

                    <div className="profile-stats">

                        <div className="stat-box">
                            <h2>{tasks.length}</h2>
                            <p>Tasks</p>
                        </div>

                        <div className="stat-box">
                            <h2>{completedTasks}</h2>
                            <p>Completed</p>
                        </div>

                        <div className="stat-box">
                            <h2>{notes.length}</h2>
                            <p>Notes</p>
                        </div>

                        <div className="stat-box">
                            <h2>{sessions}</h2>
                            <p>Focus Sessions</p>
                        </div>

                    </div>

                    <div className="achievements">

                        <h2>🏆 Achievements</h2>

                        <div className="achievement-grid">

                            <div className="achievement-card">
                                🔥 {sessions} Focus Sessions
                            </div>

                            <div className="achievement-card">
                                ✅ {completedTasks} Tasks Completed
                            </div>

                            <div className="achievement-card">
                                📝 {notes.length} Notes Created
                            </div>

                            <div className="achievement-card">
                                ⏱ {focusHours}h Focus Time
                            </div>

                        </div>

                    </div>

                    <div className="skills">

                        <h2>Current Skills</h2>

                        <div className="skill-tags">

                            <span>React.js</span>
                            <span>JavaScript</span>
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>Machine Learning</span>
                            <span>GitHub</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;