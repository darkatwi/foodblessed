import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "./LandingPage";
import "../styles/donate.css";

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

const GG_URL = "https://www.globalgiving.org/projects/foodblessed-emergency-relief-plan/";

const AMOUNTS = [
  { value: 19,  label: "$19",  sub: "1 package" },
  { value: 50,  label: "$50",  sub: "≈ 2 families" },
  { value: 100, label: "$100", sub: "≈ 5 families" },
  { value: 250, label: "$250", sub: "≈ 13 families" },
];

const PACKAGE_ITEMS = ["Rice","Lentils","Chickpeas","Beans","Oil","Pasta","Canned tuna","Powder milk","Flour","+ more"];

const METHODS = [
  {
    ico: "🌍",
    title: "GlobalGiving (online)",
    lines: ["Credit card, PayPal & more · tax-deductible in the US", "globalgiving.org/projects/foodblessed-emergency-relief-plan/"],
    link: "https://www.globalgiving.org/projects/foodblessed-emergency-relief-plan/",
  },
  {
    ico: "🏦",
    title: "Bank transfer / Wise",
    lines: ["BBAC SAL · Account name: ORG FoodBlessed", "SWIFT: BBACLBBX", "USD IBAN: LB33 0028 0000 0000 0045 7757 8002"],
  },
  {
    ico: "📱",
    title: "Whish Money",
    lines: ["In person at any Whish office or via the app", "Send to: +961 70 159 337"],
  },
  {
    ico: "💸",
    title: "OMT / Western Union",
    lines: ["Recipient: Maya Terro · then send your MTCN by WhatsApp"],
  },
  {
    ico: "📦",
    title: "In-kind donations",
    lines: ["Staple foods, clothes, toys & more welcome.", "WhatsApp +961 70 159 337"],
  },
];

export default function DonatePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(50);
  const [frequency, setFrequency] = useState("ONCE");

  return (
    <div className="donate-page">
      <Header />

      {/* HERO */}
      <section className="pagehero">
        <div className="pagehero-bg">
          <img src="https://foodblessed.org/wp-content/uploads/2015/09/foodblessed-plate.jpg" alt="A FoodBlessed meal" />
        </div>
        <div className="wrap">
          <div className="crumb"><span onClick={() => navigate("/")}>Home</span> &nbsp;/&nbsp; Donate</div>
          <span className="eyebrow">Make a donation</span>
          <h1>Every little<br /><em>helps.</em></h1>
          <p>Whether you advocate, donate in-kind or monetary, or give your time — you'll be helping put an end to hunger and food waste in Lebanon.</p>
        </div>
      </section>

      {/* PACKAGE BANNER */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="pkg-banner">
            <span className="tag" style={{ color: "#ffe1c4" }}>Most impactful</span>
            <h2 style={{ color: "#fff", fontSize: "30px", marginBottom: "6px" }}>Donate a Food Assistance Package</h2>
            <div className="price">$19</div>
            <p style={{ color: "rgba(255,255,255,.9)", maxWidth: "520px", margin: "8px auto 0" }}>
              Feeds a family of four for a whole month — delivered through our NGO partners.
            </p>
            <div className="pkg-items">
              {PACKAGE_ITEMS.map((item) => <span key={item}>{item}</span>)}
            </div>
            <a href={GG_URL} target="_blank" rel="noreferrer" className="btn btn-green">
              Donate a package &nbsp;→
            </a>
          </Reveal>
        </div>
      </section>

      {/* GIVE + METHODS */}
      <section className="sec-tight">
        <div className="wrap donate-grid">

          {/* Donation form */}
          <Reveal className="dcard">
            <h3>Donate online</h3>
            <p className="lead" style={{ fontSize: "15px", marginBottom: "18px" }}>Pick an amount and give directly — secure checkout via GlobalGiving.</p>

            {/* Frequency toggle */}
            <div className="freq-toggle">
              <button className={`freq-btn${frequency === "ONCE" ? " sel" : ""}`} onClick={() => setFrequency("ONCE")}>One-time</button>
              <button className={`freq-btn${frequency === "MONTH" ? " sel" : ""}`} onClick={() => setFrequency("MONTH")}>Monthly</button>
            </div>

            {/* Amount picker */}
            <div className="amounts">
              {AMOUNTS.map((a) => (
                <button
                  key={a.value}
                  className={`amount${selected === a.value ? " sel" : ""}`}
                  onClick={() => setSelected(a.value)}
                >
                  <b>{a.label}</b>
                  <span>{a.sub}</span>
                </button>
              ))}
            </div>

            {/* GlobalGiving form — hidden fields carry the selection */}
            <form
              action="https://www.globalgiving.org/dy/cart/view/gg.html"
              method="post"
              className="gg-form"
            >
              <input type="hidden" name="cmd" value="addItem" />
              <input type="hidden" name="projid" value="66762" />
              <input type="hidden" name="rf" value="ggWidget_custom_donation_form" />
              <input type="hidden" name="frequency" value={frequency} />

              <div className="gg-amount-row">
                <span className="gg-currency">$</span>
                <input
                  name="amount"
                  type="number"
                  min="10"
                  max="85000"
                  required
                  className="gg-amount-input"
                  value={selected}
                  onChange={(e) => setSelected(Number(e.target.value))}
                />
              </div>

              <button type="submit" className="btn btn-green gg-submit">
                {frequency === "MONTH" ? `Give $${selected}/month` : `Donate $${selected}`} &nbsp;→
              </button>
            </form>

            <p style={{ fontSize: "12px", color: "var(--muted)", textAlign: "center", marginTop: "10px" }}>
              Tax-deductible in the US · Powered by GlobalGiving
            </p>
          </Reveal>

          {/* More ways */}
          <Reveal className="dcard">
            <h3>More ways to give</h3>
            {METHODS.map((m) => (
              <div className={`method${m.link ? " method-link" : ""}`} key={m.title} onClick={m.link ? () => window.open(m.link, "_blank", "noreferrer") : undefined}>
                <b><span className="ic">{m.ico}</span> {m.title}</b>
                {m.lines.map((line) => <p key={line}>{line}</p>)}
                {m.link && <span className="method-cta">Donate now →</span>}
              </div>
            ))}
          </Reveal>

        </div>
      </section>

      {/* IN-PERSON CTA */}
      <section className="donate-cta">
        <div className="wrap">
          <Reveal className="donate-cta-inner">
            <span className="eyebrow-tag">Visit us in person</span>
            <h2>Prefer to give <em>in person?</em></h2>
            <p>
              Drop by our head office any time — our Hunger Heroes will welcome you with open arms.
              Bring food donations, meet the team, or just say hello.
            </p>
            <div className="donate-cta-detail">
              <span>📍 Confidence Center, Ground Fl., Youssef El Hayek St, Sin El Fil, Beirut</span>
              <span>📞 +961 70 159 337</span>
            </div>
            <div className="donate-cta-actions">
              <button className="btn btn-orange" onClick={() => navigate("/contact")}>Get directions &nbsp;→</button>
              <a href="https://wa.me/96170159337" target="_blank" rel="noreferrer" className="btn btn-green">WhatsApp us</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
