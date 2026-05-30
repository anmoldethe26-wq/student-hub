import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Notes.css";

function Notes() {

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );
    }, [notes]);

    const addOrUpdateNote = () => {

        if (
            !title.trim() ||
            !content.trim()
        )
            return;

        if (editingId) {

            setNotes(
                notes.map((note) =>
                    note.id === editingId
                        ? {
                            ...note,
                            title,
                            content,
                        }
                        : note
                )
            );

            setEditingId(null);

        } else {

            const newNote = {
                id: Date.now(),
                title,
                content,
                date:
                    new Date().toLocaleDateString(),
            };

            setNotes([newNote, ...notes]);
        }

        setTitle("");
        setContent("");
    };

    const editNote = (note) => {

        setTitle(note.title);

        setContent(note.content);

        setEditingId(note.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const deleteNote = (id) => {

        setNotes(
            notes.filter(
                (note) => note.id !== id
            )
        );

        if (editingId === id) {

            setEditingId(null);

            setTitle("");

            setContent("");
        }
    };

    const filteredNotes = notes.filter(
        (note) =>
            note.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||
            note.content
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    return (
        <div className="notes-page">

            <Sidebar />

            <div className="notes-container">

                <h1>
                    Notes Workspace 📝
                </h1>

                <p className="notes-subtitle">
                    Capture ideas, study notes
                    and important information.
                </p>

                <div className="note-form">

                    <input
                        type="text"
                        placeholder="Note title..."
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder="Write your note..."
                        value={content}
                        maxLength="500"
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                    />

                    <p className="char-count">
                        {content.length}/500
                        Characters
                    </p>

                    <button
                        onClick={
                            addOrUpdateNote
                        }
                    >
                        {editingId
                            ? "Update Note"
                            : "Add Note"}
                    </button>

                </div>

                <input
                    type="text"
                    className="search-notes"
                    placeholder="🔍 Search notes..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                {filteredNotes.length ===
                    0 ? (

                    <div className="empty-notes">
                        📝 No notes found.
                    </div>

                ) : (

                    <div className="notes-grid">

                        {filteredNotes.map(
                            (note) => (

                                <div
                                    className="note-card"
                                    key={note.id}
                                >

                                    <h3>
                                        {
                                            note.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            note.content
                                        }
                                    </p>

                                    <small>
                                        {
                                            note.date
                                        }
                                    </small>

                                    <div className="note-actions">

                                        <button
                                            className="edit-note"
                                            onClick={() =>
                                                editNote(
                                                    note
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-note"
                                            onClick={() =>
                                                deleteNote(
                                                    note.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Notes;