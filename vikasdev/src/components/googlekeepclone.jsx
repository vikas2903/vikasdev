import { useEffect, useState } from "react";
import axios from "axios";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

const API_BASE_URL = "http://localhost:3002/api/notes";

const emptyDraft = {
  title: "",
  description: "",
  pinned: false,
};

function GoogleKeepClone() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [draft, setDraft] = useState(emptyDraft);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_BASE_URL);
      setNotes(Array.isArray(response.data?.notes) ? response.data.notes : []);
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || "Unable to load notes from the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setDraft(emptyDraft);
    setIsExpanded(false);
  };

  const handleSave = async () => {
    const title = draft.title.trim();
    const description = draft.description.trim();

    if (!title && !description) {
      resetForm();
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: title || "Untitled",
        description: description || "No description",
        pinned: draft.pinned,
      };

      const response = await axios.post(API_BASE_URL, payload);
      setNotes((currentNotes) => [response.data.note, ...currentNotes]);

      resetForm();
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Unable to save note.");
    } finally {
      setSaving(false);
    }
  };

  const openNote = (note) => {
    setActiveNote({
      _id: note._id,
      title: note.title || "",
      description: note.description || "",
      pinned: Boolean(note.pinned),
    });
  };

  const closeNotePopup = () => {
    setActiveNote(null);
  };

  const handleUpdateNote = async () => {
    if (!activeNote) {
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const response = await axios.put(`${API_BASE_URL}/${activeNote._id}`, {
        title: activeNote.title.trim() || "Untitled",
        description: activeNote.description.trim() || "No description",
        pinned: activeNote.pinned,
      });

      setNotes((currentNotes) =>
        currentNotes.map((note) => (note._id === activeNote._id ? response.data.note : note))
      );
      closeNotePopup();
    } catch (updateError) {
      setError(updateError.response?.data?.message || "Unable to update note.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      setError("");
      await axios.delete(`${API_BASE_URL}/${noteId}`);
      setNotes((currentNotes) => currentNotes.filter((note) => note._id !== noteId));
      if (activeNote?._id === noteId) {
        closeNotePopup();
      }
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || "Unable to delete note.");
    }
  };

  const handleTogglePin = async (note) => {
    try {
      setError("");
      const response = await axios.put(`${API_BASE_URL}/${note._id}`, {
        title: note.title,
        description: note.description,
        pinned: !note.pinned,
      });

      setNotes((currentNotes) =>
        currentNotes.map((currentNote) =>
          currentNote._id === note._id ? response.data.note : currentNote
        )
      );
    } catch (pinError) {
      setError(pinError.response?.data?.message || "Unable to update note.");
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      const value = `${note.title || ""} ${note.description || ""}`.toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div className="keep-page">
      <style>{`
        body {
          margin: 0;
          background: #f8f9fa;
          font-family: Arial, Helvetica, sans-serif;
          color: #202124;
        }

        .keep-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .keep-header {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 80px;
          padding: 0 20px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          JUSTIFY-CONTENT: center;
        }

        .keep-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 180px;
          color: #5f6368;
          font-size: 22px;
        }
          .keep-search input::placeholder {
    color: #000;
    margin: 0;
}

        .keep-logo {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: #ffcd38;
          display: grid;
          place-items: center;
          color: #fff;
        }

        .keep-search {
          flex: 1;
          max-width: 900px;
          display: flex;
          align-items: center;
          gap: 12px;
          height: 58px;
          padding: 0 22px;
          background: #f1f3f4;
          border-radius: 18px;
        }

        .keep-search input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          font-size: 17px;
          color: #1f2937;
        }

        .keep-header-action {
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #5f6368;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .keep-layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 20px;
          padding: 36px 18px;
        }

        .keep-sidebar {
          padding-top: 2px;
        }

        .keep-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 220px;
          height: 64px;
          padding: 0 22px;
          border: 0;
          border-radius: 0 32px 32px 0;
          background: #feefc3;
          color: #202124;
          font-size: 17px;
          font-weight: 600;
          text-align: left;
        }

        .keep-count {
          margin: 22px 0 0 26px;
          color: #4b5563;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .keep-main {
          padding-right: 16px;
        }

        .keep-composer {
          width: min(100%, 680px);
          margin: 2px auto 34px;
          background: #fff;
          border: 1px solid #dadce0;
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(60, 64, 67, 0.2);
        }

        .keep-composer-row {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 18px 22px;
        }

        .keep-composer input,
        .keep-composer textarea {
          width: 100%;
          border: 0;
          outline: none;
          resize: none;
          background: transparent;
          font-size: 16px;
          color: #202124;
          font-family: inherit;
          margin: 0;
        }

        .keep-composer input::placeholder {
    color: #000;
    font-weight: 400;
}
        .keep-composer textarea {
          min-height: 80px;
          padding: 0 22px 0;
        }

        .keep-create-text {
          color: #374151;
          font-size: 16px;
          line-height: 1.3;
          text-align: right;
        }

        .keep-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px 16px;
        }

        .keep-button {
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #202124;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 14px;
          cursor: pointer;
        }
          input[type=text]:focus, input[type=password]:focus {
    background: transparent;
}

        .keep-button:hover {
          background: #f1f3f4;
        }

        .keep-card-grid {
          columns: 260px;
          column-gap: 16px;
          width: 100%;
        }

        .keep-card {
          display: inline-block;
          width: 100%;
          margin: 0 0 16px;
          background: #fff;
          border: 1px solid #dadce0;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(60, 64, 67, 0.12);
          cursor: pointer;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
        }

        .keep-card-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 16px 8px;
        }

        .keep-card-title {
          margin: 0 0 14px;
          font-size: 16px;
          font-weight: 500;
        }

        .keep-card-text {
          margin: 0;
          color: #202124;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .keep-card-date {
          padding: 0 16px 10px;
          color: #6b7280;
          font-size: 13px;
        }

        .keep-card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 12px 10px;
          color: #5f6368;
        }

        .keep-icon-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .keep-icon-btn {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #5f6368;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .keep-icon-btn:hover {
          background: #f1f3f4;
        }

        .keep-section-title {
          margin: 0 0 20px;
          color: #415a77;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .keep-error {
          width: min(100%, 750px);
          margin: 0 auto 18px;
          padding: 12px 16px;
          border-radius: 12px;
          background: #fdecea;
          border: 1px solid #f5c2c0;
          color: #b42318;
        }

        .keep-empty {
          color: #6b7280;
          font-size: 15px;
        }

        .keep-popup-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(32, 33, 36, 0.36);
          display: grid;
          place-items: center;
          padding: 24px;
          z-index: 40;
        }

        .keep-popup {
          width: min(100%, 640px);
          background: #fff;
          border: 1px solid #dadce0;
          border-radius: 18px;
          box-shadow: 0 18px 42px rgba(60, 64, 67, 0.28);
          overflow: hidden;
        }

        .keep-popup-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 22px 8px;
        }

        .keep-popup-title,
        .keep-popup-text {
          width: 100%;
          border: 0;
          outline: none;
          resize: none;
          background: transparent;
          font-family: inherit;
          color: #202124;
        }

        .keep-popup-title {
          font-size: 20px;
          font-weight: 500;
        }

        .keep-popup-text {
          min-height: 160px;
          padding: 0 22px;
          font-size: 15px;
          line-height: 1.6;
        }

        .keep-popup-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px 16px;
        }

        .keep-popup-button-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .keep-layout {
            grid-template-columns: 1fr;
            padding: 24px 16px;
          }

          .keep-nav {
            width: 100%;
            border-radius: 18px;
          }
        }

        @media (max-width: 700px) {
          .keep-header {
            flex-wrap: wrap;
            height: auto;
            padding: 14px;
          }

          .keep-search {
            width: 100%;
            max-width: none;
          }

          .keep-composer-row {
            align-items: flex-start;
          }

          .keep-create-text {
            min-width: 72px;
            font-size: 14px;
          }
        }
      `}</style>

      <header className="keep-header">
        {/* <div className="keep-brand">
          <button className="keep-header-action" type="button" aria-label="Menu">
            <MenuIcon />
          </button>
          <div className="keep-logo">
            <LightbulbOutlinedIcon />
          </div>
          <span>Keep</span>
        </div> */}

        <div className="keep-search">
          <SearchIcon sx={{ color: "#5f6368" }} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <button className="keep-header-action" type="button" onClick={fetchNotes} aria-label="Refresh">
          <RefreshIcon />
        </button>
      </header>

      <div className="keep-layout">
        <aside className="keep-sidebar">
          <button type="button" className="keep-nav">
            <LightbulbOutlinedIcon fontSize="small" />
            <span>Notes</span>
          </button>
          <div className="keep-count">{filteredNotes.length} notes</div>
        </aside>

        <main className="keep-main">
          {error ? <div className="keep-error">{error}</div> : null}

          <section className="keep-composer">
            <div className="keep-composer-row">
              <input
                type="text"
                placeholder="Take a note..."
                value={draft.title}
                onFocus={() => setIsExpanded(true)}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, title: event.target.value }))
                }
              />
              <div className="keep-create-text">Create</div>
            </div>

            {isExpanded ? (
              <>
                <textarea
                  placeholder="Write your note..."
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, description: event.target.value }))
                  }
                />
                <div className="keep-actions">
                  <button
                    className="keep-icon-btn"
                    type="button"
                    onClick={() => setDraft((current) => ({ ...current, pinned: !current.pinned }))}
                    aria-label="Pin note"
                  >
                    <PushPinOutlinedIcon sx={{ color: draft.pinned ? "#f4b400" : "#5f6368" }} />
                  </button>

                  <div>
                    <button className="keep-button" type="button" onClick={resetForm}>
                      Cancel
                    </button>
                    <button className="keep-button" type="button" onClick={handleSave}>
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>

          <p className="keep-section-title">Pinned and others</p>

          {loading ? (
            <div className="keep-empty">Loading notes...</div>
          ) : filteredNotes.length ? (
            <section className="keep-card-grid">
              {filteredNotes.map((note) => (
                <article key={note._id} className="keep-card" onClick={() => openNote(note)}>
                  <div className="keep-card-top">
                    <div>
                      <h3 className="keep-card-title">{note.title}</h3>
                      <p className="keep-card-text">{note.description}</p>
                    </div>

                    <button
                      className="keep-icon-btn"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleTogglePin(note);
                      }}
                      aria-label="Toggle pin"
                    >
                      <PushPinOutlinedIcon sx={{ color: note.pinned ? "#5f6368" : "#9ca3af" }} />
                    </button>
                  </div>

                  <div className="keep-card-date">
                    {note.updatedAt
                      ? `Edited ${new Date(note.updatedAt).toLocaleDateString()}`
                      : "Edited recently"}
                  </div>

                  <div className="keep-card-actions">
                    <div className="keep-icon-row">
                      <button
                        className="keep-icon-btn"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openNote(note);
                        }}
                        aria-label="Edit note"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </button>
                    </div>

                    <button
                      className="keep-icon-btn"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(note._id);
                      }}
                      aria-label="Delete note"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className="keep-empty">No notes found.</div>
          )}
        </main>
      </div>

      {activeNote ? (
        <div className="keep-popup-backdrop" onClick={closeNotePopup}>
          <div className="keep-popup" onClick={(event) => event.stopPropagation()}>
            <div className="keep-popup-header">
              <input
                className="keep-popup-title"
                type="text"
                value={activeNote.title}
                onChange={(event) =>
                  setActiveNote((current) => ({ ...current, title: event.target.value }))
                }
              />
              <button
                className="keep-icon-btn"
                type="button"
                onClick={() =>
                  setActiveNote((current) => ({ ...current, pinned: !current.pinned }))
                }
                aria-label="Toggle pin"
              >
                <PushPinOutlinedIcon sx={{ color: activeNote.pinned ? "#5f6368" : "#9ca3af" }} />
              </button>
            </div>

            <textarea
              className="keep-popup-text"
              value={activeNote.description}
              onChange={(event) =>
                setActiveNote((current) => ({ ...current, description: event.target.value }))
              }
            />

            <div className="keep-popup-actions">
              <div className="keep-popup-button-row">
                <button
                  className="keep-icon-btn"
                  type="button"
                  onClick={() => handleDelete(activeNote._id)}
                  aria-label="Delete note"
                >
                  <DeleteOutlineIcon fontSize="small" />
                </button>
              </div>

              <div className="keep-popup-button-row">
                <button className="keep-button" type="button" onClick={closeNotePopup}>
                  <CloseIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: 0.5 }} />
                  Close
                </button>
                <button className="keep-button" type="button" onClick={handleUpdateNote}>
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GoogleKeepClone;
