import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "./LandingPage";
import "../styles/volunter.css";

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


const roles = [
  { ico: "🚚", h: "Collect surplus",        p: "Help recover surplus food from restaurants, caterers and partners before it goes to waste." },
  { ico: "🍳", h: "Cook & bake",            p: "Prepare hearty meals or bake for our monthly bake sale and fundraising events." },
  { ico: "🥄", h: "Serve meals",            p: "Serve hot meals at our soup kitchens and share a moment with our guests." },
  { ico: "📦", h: "Pack packages",          p: "Assemble Food Assistance Packages for families in need across Lebanon." },
  { ico: "📣", h: "Fundraise & outreach",   p: "Help with fundraising, awareness campaigns and community outreach." },
  { ico: "🤝", h: "Food drives",            p: "Organise or join food drives to collect perishable and non-perishable items." },
];


const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function VolunteerPage() {
  const navigate = useNavigate();
  const [f, setF] = useState({ first: "", last: "", email: "", phone: "", role: "Collect surplus food", note: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setF((x) => ({ ...x, [key]: e.target.value }));

  const submit = async () => {
    if (!f.first || !f.email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error("Submission failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or call +961 70 159 337.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="volunteer-page">
      <Header />
      <section className="pagehero">
        <div className="pagehero-bg">
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=85" alt="Volunteers serving meals" />
        </div>
        <div className="wrap">
          <div className="crumb"><span onClick={() => navigate("/")}>Home</span> &nbsp;/&nbsp; Volunteer</div>
          <span className="eyebrow">Become a Hunger Hero</span>
          <h1>Give your time,<br /><em>change a life.</em></h1>
          <p>Whether you cook, bake, serve a meal or pack a package for a family in need, volunteering with FoodBlessed is a transformative experience.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <Reveal>
            <span className="tag">Why we call them heroes</span>
            <h2 className="sec-title">Everyday people doing <em>extraordinary</em> good.</h2>
            <p>We call our volunteers Hunger Heroes because they're everyday heroes who put their time and energy to good use — all while making sure no good food goes to waste.</p>
            <p>Joining FoodBlessed is a deeply rewarding community experience. Unlikely friendships blossom, politics and differences fall away, and people are treated as the equal human beings they are.</p>
            <a href="#signup" className="btn btn-green">Sign up to help</a>
          </Reveal>
          <Reveal>
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85" alt="Volunteers cooking" />
          </Reveal>
        </div>
      </section>

      <section className="sec bg-cream2">
        <div className="wrap">
          <Reveal className="center" >
            <span className="tag">Ways to help</span>
            <h2 className="sec-title">Find the role that <em>fits you</em></h2>
            <p className="lead" style={{ margin: "0 auto" }}>Once you're a Hunger Hero, you can sign up for any of these — single-day volunteers are always welcome.</p>
          </Reveal>
          <div className="grid-3 roles">
            {roles.map((r) => (
              <Reveal key={r.h} className="card">
                <div className="ico">{r.ico}</div>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="center map-head">
            <span className="tag">Where to find us</span>
            <h2 className="sec-title">Come say <em>hello</em></h2>
            <p className="lead" style={{ margin: "0 auto" }}>Drop by our head office to volunteer, donate in person, or just learn more about what we do.</p>
          </Reveal>
          <Reveal className="map-wrap">
            <div className="map-info">
              <div className="map-row">
                <span className="map-ic">📍</span>
                <div><b>Our office</b><p>Confidence Center, Ground Floor, Youssef El Hayek Street, Sin El Fil — facing Sin El Fil Municipality, Beirut, Lebanon.</p></div>
              </div>
              <div className="map-row">
                <span className="map-ic">📞</span>
                <div><b>Donations &amp; volunteering</b><p><a href="tel:+96170159337">+961 70 159 337</a></p></div>
              </div>
              <div className="map-row">
                <span className="map-ic">🕒</span>
                <div><b>Reach out anytime</b><p>Message us on WhatsApp and a Hunger Hero will get back to you.</p></div>
              </div>
              <a className="btn btn-green" href="https://www.google.com/maps/dir/?api=1&destination=FoodBlessed+Office+Sin+El+Fil+Beirut" target="_blank" rel="noreferrer" style={{ marginTop: 6 }}>Get directions &nbsp;→</a>
            </div>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15755.6139203191!2d35.47417340766657!3d33.88424977766578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f172fd0b087bf%3A0xe753119747df3ca4!2sFoodBlessed%20Office!5e0!3m2!1sen!2slb!4v1538723239503"
                title="FoodBlessed office location"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec bg-cream2" id="signup">
        <div className="wrap">
          <Reveal className="center" >
            <span className="tag">Sign up</span>
            <h2 className="sec-title">Become a <em>Hunger Hero</em></h2>
          </Reveal>
          <Reveal className="form-card">
            {done ? (
              <p className="thanks">Thank you! We'll be in touch soon. 💚 You can also call +961 70 159 337.</p>
            ) : (
              <>
                <div className="two">
                  <div className="field"><label>First name</label><input type="text" value={f.first} onChange={update("first")} /></div>
                  <div className="field"><label>Last name</label><input type="text" value={f.last} onChange={update("last")} /></div>
                </div>
                <div className="two">
                  <div className="field"><label>Email</label><input type="email" value={f.email} onChange={update("email")} /></div>
                  <div className="field"><label>Phone / WhatsApp</label><input type="tel" value={f.phone} onChange={update("phone")} /></div>
                </div>
                <div className="field">
                  <label>How would you like to help?</label>
                  <select value={f.role} onChange={update("role")}>
                    {["Collect surplus food", "Cook & bake", "Serve meals", "Pack packages", "Fundraising & outreach", "Wherever I'm needed"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field"><label>Anything you'd like us to know?</label><textarea rows="4" value={f.note} onChange={update("note")} /></div>
                {error && <p style={{ color: "#c0392b", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}
                <button className="btn btn-green" onClick={submit} disabled={loading} style={{ width: "100%", justifyContent: "center", opacity: loading ? .7 : 1 }}>
                  {loading ? "Submitting…" : "Sign me up →"}
                </button>
              </>
            )}
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}