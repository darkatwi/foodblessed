import { useState, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function fmt(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminPage() {
  const [token, setToken]           = useState(() => sessionStorage.getItem("fb_admin") || "");
  const [pw, setPw]                 = useState("");
  const [loginErr, setLoginErr]     = useState("");
  const [tab, setTab]               = useState("volunteers");
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [replyId, setReplyId]       = useState(null);
  const [replyText, setReplyText]   = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyStatus, setReplyStatus]   = useState({}); // { [id]: "sent" | "error" }

  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [vRes, cRes] = await Promise.all([
        fetch(`${API}/api/admin/volunteers`, { headers: authHeaders }),
        fetch(`${API}/api/admin/contacts`,   { headers: authHeaders }),
      ]);
      if (vRes.status === 401 || cRes.status === 401) {
        sessionStorage.removeItem("fb_admin");
        setToken("");
        return;
      }
      setVolunteers(await vRes.json());
      setContacts(await cRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const login = async (e) => {
    e.preventDefault();
    setLoginErr("");
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) { setLoginErr("Wrong password"); return; }
      const { token: t } = await res.json();
      sessionStorage.setItem("fb_admin", t);
      setToken(t);
      setPw("");
    } catch {
      setLoginErr("Could not reach server");
    }
  };

  const logout = () => { sessionStorage.removeItem("fb_admin"); setToken(""); };

  const openReply = (id) => { setReplyId(id); setReplyText(""); setReplyStatus(s => ({ ...s, [id]: null })); };
  const closeReply = () => { setReplyId(null); setReplyText(""); };

  const sendReply = async (contact) => {
    if (!replyText.trim()) return;
    setReplySending(true);
    try {
      const res = await fetch(`${API}/api/admin/contacts/${contact._id}/reply`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ replyText }),
      });
      if (!res.ok) throw new Error();
      setReplyStatus(s => ({ ...s, [contact._id]: "sent" }));
      setContacts(prev => prev.map(c => c._id === contact._id ? { ...c, repliedAt: new Date().toISOString() } : c));
      closeReply();
    } catch {
      setReplyStatus(s => ({ ...s, [contact._id]: "error" }));
    } finally {
      setReplySending(false);
    }
  };

  if (!token) return (
    <div style={styles.loginWrap}>
      <div style={styles.loginBox}>
        <img src="/logo.png" alt="FoodBlessed" style={{ height: 48, marginBottom: 20 }} />
        <h2 style={{ margin: "0 0 6px", color: "#2b2f24" }}>Admin Login</h2>
        <p style={{ color: "#6f7361", marginBottom: 24, fontSize: 14 }}>FoodBlessed internal dashboard</p>
        <form onSubmit={login}>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            style={styles.input}
            autoFocus
          />
          {loginErr && <p style={styles.err}>{loginErr}</p>}
          <button type="submit" style={styles.loginBtn}>Login →</button>
        </form>
      </div>
    </div>
  );

  const data = tab === "volunteers" ? volunteers : contacts;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <img src="/logo.png" alt="FoodBlessed" style={{ height: 40, marginBottom: 32 }} />
        <nav style={styles.nav}>
          <button style={{ ...styles.navBtn, ...(tab === "volunteers" ? styles.navActive : {}) }} onClick={() => setTab("volunteers")}>
            🙋 Volunteers
            <span style={styles.badge}>{volunteers.length}</span>
          </button>
          <button style={{ ...styles.navBtn, ...(tab === "contacts" ? styles.navActive : {}) }} onClick={() => setTab("contacts")}>
            ✉️ Contact messages
            <span style={styles.badge}>{contacts.length}</span>
          </button>
        </nav>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.h1}>{tab === "volunteers" ? "Volunteer Signups" : "Contact Messages"}</h1>
            <p style={styles.sub}>{data.length} {tab === "volunteers" ? "sign-ups" : "messages"} total</p>
          </div>
          <button onClick={fetchData} style={styles.refreshBtn} disabled={loading}>
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>

        <div style={styles.tableWrap}>
          {data.length === 0 ? (
            <p style={{ color: "#6f7361", padding: "40px 0", textAlign: "center" }}>No submissions yet.</p>
          ) : tab === "volunteers" ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Date", "Name", "Email", "Phone", "Role", "Note", "Email sent"].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v._id} style={styles.tr}>
                    <td style={styles.td}>{fmt(v.createdAt)}</td>
                    <td style={styles.td}>{v.first} {v.last}</td>
                    <td style={styles.td}><a href={`mailto:${v.email}`} style={styles.link}>{v.email}</a></td>
                    <td style={styles.td}>{v.phone || "—"}</td>
                    <td style={styles.td}>{v.role || "—"}</td>
                    <td style={{ ...styles.td, maxWidth: 220, whiteSpace: "normal" }}>{v.note || "—"}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={{ ...styles.pill, background: v.emailSent ? "#eaf5e0" : "#fdeede", color: v.emailSent ? "#4e8b2c" : "#d9601a" }}>
                        {v.emailSent ? "✓ Sent" : "✗ No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Date", "Name", "Email", "Phone", "Topic", "Message", "Reply"].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <>
                    <tr key={c._id} style={styles.tr}>
                      <td style={styles.td}>{fmt(c.createdAt)}</td>
                      <td style={styles.td}>{c.first} {c.last}</td>
                      <td style={styles.td}><a href={`mailto:${c.email}`} style={styles.link}>{c.email}</a></td>
                      <td style={styles.td}>{c.phone || "—"}</td>
                      <td style={styles.td}>{c.topic || "—"}</td>
                      <td style={{ ...styles.td, maxWidth: 260, whiteSpace: "normal" }}>{c.message || "—"}</td>
                      <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                        {c.repliedAt ? (
                          <span style={{ ...styles.pill, background: "#eaf5e0", color: "#4e8b2c" }}>✓ Replied</span>
                        ) : (
                          <button
                            onClick={() => replyId === c._id ? closeReply() : openReply(c._id)}
                            style={{ ...styles.replyBtn, background: replyId === c._id ? "#e6dfcc" : "#f47b20" }}
                          >
                            {replyId === c._id ? "Cancel" : "↩ Reply"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {replyId === c._id && (
                      <tr key={`reply-${c._id}`}>
                        <td colSpan={7} style={{ padding: "0 16px 16px", background: "#fdfaf2" }}>
                          <div style={styles.replyBox}>
                            <p style={styles.replyTo}>Replying to <strong>{c.first}</strong> &lt;{c.email}&gt;</p>
                            <textarea
                              rows={5}
                              value={replyText}
                              onChange={e => setReplyText(e.target.value)}
                              placeholder="Type your reply here…"
                              style={styles.replyTextarea}
                              autoFocus
                            />
                            {replyStatus[c._id] === "error" && (
                              <p style={{ color: "#c0392b", fontSize: 13, margin: "4px 0 8px" }}>Failed to send. Try again.</p>
                            )}
                            <div style={{ display: "flex", gap: 10 }}>
                              <button
                                onClick={() => sendReply(c)}
                                disabled={replySending || !replyText.trim()}
                                style={{ ...styles.replyBtn, background: "#6cb33f", opacity: (replySending || !replyText.trim()) ? .6 : 1 }}
                              >
                                {replySending ? "Sending…" : "Send reply →"}
                              </button>
                              <button onClick={closeReply} style={{ ...styles.replyBtn, background: "#e6dfcc", color: "#2b2f24" }}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  loginWrap: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f4efe2", fontFamily: "'DM Sans', sans-serif",
  },
  loginBox: {
    background: "#fff", borderRadius: 20, padding: "48px 40px", textAlign: "center",
    boxShadow: "0 24px 60px -20px rgba(43,47,36,.18)", width: "100%", maxWidth: 360,
  },
  input: {
    width: "100%", padding: "13px 15px", border: "1.5px solid #e4ddca", borderRadius: 12,
    fontFamily: "inherit", fontSize: 15, background: "#fdfaf2", color: "#2b2f24",
    marginBottom: 12, boxSizing: "border-box", outline: "none",
  },
  loginBtn: {
    width: "100%", padding: "14px", borderRadius: 999, border: "none",
    background: "#6cb33f", color: "#fff", fontWeight: 700, fontSize: 15,
    cursor: "pointer", fontFamily: "inherit",
  },
  err: { color: "#c0392b", fontSize: 13, marginBottom: 10 },
  page: {
    display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif",
    background: "#f4efe2",
  },
  sidebar: {
    width: 240, background: "#2e3d22", padding: "32px 20px",
    display: "flex", flexDirection: "column", flexShrink: 0,
  },
  nav: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  navBtn: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "11px 14px", borderRadius: 10, border: "none", background: "transparent",
    color: "rgba(255,255,255,.7)", fontFamily: "inherit", fontSize: 14,
    fontWeight: 600, cursor: "pointer", textAlign: "left", gap: 8,
  },
  navActive: { background: "rgba(255,255,255,.12)", color: "#fff" },
  badge: {
    background: "#f47b20", color: "#fff", borderRadius: 999,
    padding: "2px 8px", fontSize: 12, fontWeight: 700, minWidth: 22, textAlign: "center",
  },
  logoutBtn: {
    marginTop: 24, padding: "10px 16px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,.2)",
    background: "transparent", color: "rgba(255,255,255,.6)", fontFamily: "inherit",
    fontSize: 13, cursor: "pointer",
  },
  main: { flex: 1, padding: "36px 40px", overflow: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  h1: { margin: 0, fontSize: 28, color: "#2b2f24" },
  sub: { margin: "4px 0 0", color: "#6f7361", fontSize: 14 },
  refreshBtn: {
    padding: "10px 20px", borderRadius: 999, border: "none",
    background: "#6cb33f", color: "#fff", fontWeight: 700, fontSize: 14,
    cursor: "pointer", fontFamily: "inherit",
  },
  tableWrap: {
    background: "#fff", borderRadius: 16, boxShadow: "0 8px 28px -10px rgba(43,47,36,.12)",
    overflow: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 700 },
  th: {
    padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700,
    letterSpacing: ".08em", textTransform: "uppercase", color: "#6f7361",
    borderBottom: "1px solid #e6dfcc", whiteSpace: "nowrap",
  },
  td: {
    padding: "14px 16px", fontSize: 14, color: "#2b2f24",
    borderBottom: "1px solid #f0ebe0", verticalAlign: "top", whiteSpace: "nowrap",
  },
  tr: { transition: "background .15s" },
  link: { color: "#4e8b2c", textDecoration: "none" },
  pill: { padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  replyBtn: {
    padding: "7px 16px", borderRadius: 999, border: "none", color: "#fff",
    fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  replyBox: {
    background: "#fff", border: "1.5px solid #e6dfcc", borderRadius: 12,
    padding: "20px 24px", marginTop: 4,
  },
  replyTo: { fontSize: 13, color: "#6f7361", margin: "0 0 12px" },
  replyTextarea: {
    width: "100%", padding: "12px 14px", border: "1.5px solid #e4ddca",
    borderRadius: 10, fontFamily: "inherit", fontSize: 14, background: "#fdfaf2",
    color: "#2b2f24", resize: "vertical", marginBottom: 12, boxSizing: "border-box",
    outline: "none",
  },
};
