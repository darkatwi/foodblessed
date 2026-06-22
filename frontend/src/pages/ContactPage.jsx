import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "./LandingPage";
import "../styles/contact.css";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible ? "reveal in" : "reveal"];
}

function Reveal({ children, className = "" }) {
  const [ref, cls] = useReveal();
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function ContactPage() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({ name: "", email: "", topic: "Volunteering", message: "" });
  const update = (key) => (e) => setF((x) => ({ ...x, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.message) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first: f.name, email: f.email, topic: f.topic, message: f.message }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or call +961 70 159 337.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Header />

      {/* HERO */}
      <section className="pagehero">
        <div className="pagehero-bg">
          <img src="https://foodblessed.org/wp-content/uploads/2017/05/18300829_1361250073960973_2195209975710760331_n.jpg" alt="Contact FoodBlessed" />
        </div>
        <div className="wrap">
          <div className="crumb"><span onClick={() => navigate("/")}>Home</span> &nbsp;/&nbsp; Contact</div>
          <span className="eyebrow">Get in touch</span>
          <h1>We'd love to <em>hear from you.</em></h1>
          <p>Questions about volunteering, donating, partnerships or food assistance? Reach out — we're a friendly bunch.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="sec">
        <div className="wrap contact-grid">

          {/* LEFT — info + map */}
          <Reveal>
            <span className="tag">Reach us</span>
            <h2 className="sec-title" style={{ marginBottom: "24px" }}>Say <em>hello</em></h2>
            <div className="info-card">
              <div className="row">
                <span className="ic">📞</span>
                <div>
                  <h4>Food assistance</h4>
                  <a href="https://wa.me/96181038801">+961 81 038 801 (WhatsApp)</a>
                </div>
              </div>
              <div className="row">
                <span className="ic">💚</span>
                <div>
                  <h4>Donations &amp; volunteering</h4>
                  <a href="tel:+96170159337">+961 70 159 337</a>
                </div>
              </div>
              <div className="row">
                <span className="ic">📍</span>
                <div>
                  <h4>Visit us</h4>
                  <p>Confidence Center, Ground Fl. Youssef El Hayek St, Sin El Fil. Facing Sin El Fil Municipality, Beirut, Lebanon.</p>
                </div>
              </div>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15755.6139203191!2d35.47417340766657!3d33.88424977766578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f172fd0b087bf%3A0xe753119747df3ca4!2sFoodBlessed+Office!5e0!3m2!1sen!2slb!4v1538723239503"
                title="FoodBlessed office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal className="form-card">
            <h2 className="sec-title" style={{ fontSize: "26px", marginBottom: "20px" }}>Send a message</h2>
            {done ? (
              <p className="thanks">Thanks for reaching out! We'll reply soon. 💚</p>
            ) : (
              <form onSubmit={submit}>
                <div className="two">
                  <div className="field"><label>Name</label><input type="text" value={f.name} onChange={update("name")} required /></div>
                  <div className="field"><label>Email</label><input type="email" value={f.email} onChange={update("email")} required /></div>
                </div>
                <div className="field">
                  <label>I'm reaching out about</label>
                  <select value={f.topic} onChange={update("topic")}>
                    {["Volunteering", "Donating", "Partnership", "Food assistance", "Press / media", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field"><label>Message</label><textarea rows="5" value={f.message} onChange={update("message")} required /></div>
                {error && <p style={{ color: "#c0392b", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}
                <button className="btn btn-green" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", opacity: loading ? .7 : 1 }}>
                  {loading ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </Reveal>

        </div>
      </section>

      <Footer />
    </div>
  );
}
