import { useState, useRef, useEffect } from "react";
import { classify } from "./model";
import logoImg from "../assets/logo.png";
import "./chatbot.css";

const WELCOME = "Hi! I'm the FoodBlessed assistant 🌿 Ask me anything about our mission, volunteering, donations, or how we fight hunger in Lebanon!";

const QUICK_REPLIES = [
  "How can I volunteer?",
  "How do I donate?",
  "What is FoodBlessed?",
  "What's a Food Assistance Package?",
  "Where are you located?",
  "How can I contact you?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: WELCOME }]);
  const [showChips, setShowChips] = useState(true);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // Show greeting bubble after 2.5 s if chat hasn't been opened yet
  useEffect(() => {
    const t = setTimeout(() => setGreeting(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  function openChat() {
    setOpen(true);
    setGreeting(false);
  }

  function send(q) {
    const text = (typeof q === "string" ? q : input).trim();
    if (!text) return;
    setInput("");
    setShowChips(false);
    setMessages((m) => [...m, { from: "user", text }]);
    setTyping(true);

    setTimeout(() => {
      const answer = classify(text);
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: answer }]);
    }, 420 + Math.random() * 280);
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="fb-chat-root">
      {/* FAB */}
      {/* Greeting bubble */}
      {greeting && !open && (
        <div className="fb-chat-greeting" onClick={openChat}>
          <div className="fb-chat-greeting-text">
            <strong>👋 Hi there!</strong>
            How can we help you today?
          </div>
          <span
            className="fb-chat-greeting-close"
            onClick={(e) => { e.stopPropagation(); setGreeting(false); }}
          >✕</span>
        </div>
      )}

      <button
        className={`fb-chat-fab ${open ? "open" : ""}`}
        onClick={() => { setOpen((o) => !o); setGreeting(false); }}
        aria-label={open ? "Close chat" : "Chat with FoodBlessed"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
          </svg>
        )}
        {!open && <span className="fb-chat-badge">?</span>}
      </button>

      {/* Window */}
      {open && (
        <div className="fb-chat-window">

          {/* Header */}
          <div className="fb-chat-header">
            <div className="fb-chat-logo-wrap">
              <img src={logoImg} alt="FoodBlessed" />
            </div>
            <div className="fb-chat-header-info">
              <div className="fb-chat-name">FoodBlessed Assistant</div>
              <div className="fb-chat-tagline">
                <span className="fb-chat-dot" />
                Ask me anything
              </div>
            </div>
            <button className="fb-chat-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          {/* Messages */}
          <div className="fb-chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`fb-msg fb-msg-${msg.from}`}>
                {msg.from === "bot" && <div className="fb-msg-avatar">🌿</div>}
                <div className="fb-msg-bubble">
                  {msg.text.split("\n").map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick reply chips — show after welcome, hide once user sends */}
            {showChips && !typing && (
              <div className="fb-chips">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} className="fb-chip" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="fb-msg fb-msg-bot">
                <div className="fb-msg-avatar">🌿</div>
                <div className="fb-msg-bubble fb-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="fb-chat-footer">
            <input
              className="fb-chat-input"
              type="text"
              placeholder="Ask about FoodBlessed…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              maxLength={300}
              autoFocus
            />
            <button className="fb-chat-send" onClick={() => send()} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </div>
          <div className="fb-chat-footer-brand">Powered by <b>FoodBlessed</b></div>
        </div>
      )}
    </div>
  );
}
