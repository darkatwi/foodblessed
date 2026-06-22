import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";
import { Header, Footer } from "./LandingPage";
import aboutheroImg from "../assets/abouthero.avif";

/* ── helpers ──────────────────────────────────────────────────────── */

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

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal]         = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.unobserve(el); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const steps = 60, inc = target / steps;
    const t = setInterval(() => {
      i++;
      setVal(Math.min(Math.round(inc * i), target));
      if (i >= steps) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [started, target]);

  return <span ref={ref}>{fmtNum(val)}{suffix}</span>;
}

/* ── data ─────────────────────────────────────────────────────────── */

const stats = [
  { target: 270_000, suffix: "+", label: "Meals served" },
  { target: 250_000, suffix: "+", label: "Beneficiaries fed" },
  { target:   2_000, suffix: "+", label: "Assistance packages" },
  { target:   1_000, suffix: "+", label: "Volunteers" },
  { target:     300, suffix: "+", label: "Partners" },
];

const pillars = [
  {
    ico: "🍽️", flip: false,
    h: "We support the right to food",
    p: "The right to sufficient food is enshrined in the International Declaration of Human Rights, yet it's long been overlooked. We take a rights-based approach — not food-as-charity — providing nutritious meals and packages to people at risk of becoming food insecure.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85",
    alt: "A nourishing plate of food",
  },
  {
    ico: "🤲", flip: true,
    h: "We tackle hunger",
    p: "In Lebanon, 30% of the population lives under the poverty line, and 1 in every 5 residents is a Syrian refugee. Regions like Bekaa and Akkar record the highest poverty yet receive the least aid — and most projects tackling food poverty hit a wall the moment funding runs out.",
    fact: { b: "30%", span: "live under the poverty line" },
    img: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=85",
    alt: "Handing out food",
  },
  {
    ico: "🌱", flip: false,
    h: "We promote food security",
    p: "Food security isn't just access to food — it's being able to consume and use it in a way that ensures mental and physical health. Beyond rescuing people from hunger, we rescue fruits and vegetables from going to waste by partnering with local retailers who donate their surplus produce.",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85",
    alt: "Fresh market produce",
  },
  {
    ico: "♻️", flip: true,
    h: "We tackle food waste",
    p: "About a third of the world's food — roughly 1.3 billion tonnes worth nearly $1 trillion — is lost or wasted every year. In Lebanon, nearly 30% of all edible food is wasted. Our Hunger Heroes intercept perfectly edible food from supermarkets, farms, restaurants and caterers, and turn it into wholesome free meals.",
    fact: { b: "1.3B", span: "tonnes wasted globally each year" },
    img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=85",
    alt: "Rescued vegetables",
  },
];

/* ── component ────────────────────────────────────────────────────── */

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <Header />
      {/* PAGE HERO */}
      <section className="pagehero">
        <div className="pagehero-bg">
          <img src={aboutheroImg} alt="FoodBlessed volunteers" />
        </div>
        <div className="wrap">
          <div className="crumb"><span onClick={() => navigate("/")}>Home</span> &nbsp;/&nbsp; About</div>
          <span className="eyebrow">Mission · Vision · Values</span>
          <h1>More than a meal —<br /><em>a movement.</em></h1>
          <p>Co-founded in 2012, FoodBlessed works with businesses and civil society to reduce the number of people going hungry in Lebanon — while tackling the growing problem of food waste.</p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="sec">
        <div className="wrap split">
          <Reveal className="split-text">
            <span className="tag">What we do</span>
            <h2 className="sec-title">A volunteer-driven food <em>rescue</em> program.</h2>
            <p>FoodBlessed is a community-based, volunteer-driven food rescue program that provides an effective and efficient solution to hunger, while addressing the serious and growing problem of food waste in Lebanon.</p>
            <p>We distribute free meals and FoodBlessed Food Assistance Packages (FAPs) to those in need, and ask the community to be more mindful of the food they let go to waste — offering practical solutions and the chance to serve through the concept of Individual and Corporate Social Responsibility.</p>
          </Reveal>
          <Reveal className="split-media">
            <div className="stack">
              <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=85" alt="Preparing food packages" />
              <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=85" alt="Fresh produce" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="stats">
        <div className="wrap stats-grid">
          {stats.map(({ target, suffix, label }) => (
            <div key={label} className="stat">
              <div className="num"><Counter target={target} suffix={suffix} /></div>
              <div className="label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="sec bg-cream2">
        <div className="wrap">
          <Reveal className="head-center">
            <span className="tag">Why we exist</span>
            <h2 className="sec-title">Four causes, <em>one mission</em></h2>
            <p className="lead">Every meal we serve answers a problem bigger than hunger alone.</p>
          </Reveal>

          {pillars.map((p) => (
            <Reveal key={p.h} className={`pillar${p.flip ? " flip" : ""}`}>
              <div className="pillar-text">
                <div className="pillar-ico">{p.ico}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
                {p.fact && (
                  <div className="fact"><b>{p.fact.b}</b><span>{p.fact.span}</span></div>
                )}
              </div>
              <div className="pillar-media"><img src={p.img} alt={p.alt} /></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="sec story">
        <div className="wrap story-grid">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85" alt="Cooking with love" />
          </Reveal>
          <Reveal>
            <span className="award">🏆 2013 "CSR in Action" — Best Social Project</span>
            <span className="tag">Our story</span>
            <h2 className="sec-title">From a paradox to a <em>purpose</em></h2>
            <p>Having always been perplexed by the paradox of so many people going hungry while so much food is wasted, Maya Terro became a food activist and co-founded FoodBlessed in 2012.</p>
            <p>To this day, FoodBlessed remains the only entity in Lebanon and the region that tackles food poverty by linking Individual and Corporate Social Responsibility to food rescue and food waste reduction.</p>
            <p>Meals at each soup kitchen are prepared and served entirely by volunteers — because more than the meal itself, what keeps our regulars coming back is the love we put into it. Food is love, and when you share it, you show people how much you care.</p>
          </Reveal>
        </div>
      </section>

      {/* NETWORK */}
      <section className="sec bg-cream2">
        <div className="wrap">
          <Reveal className="head-center">
            <span className="tag">How the network runs</span>
            <h2 className="sec-title">Connecting <em>donors</em> to <em>donees</em></h2>
            <p className="lead">The heart of our work is building sustainable, long-term partnerships between those with food to give and those who need it most.</p>
          </Reveal>
          <Reveal className="net-grid">
            <div className="net-card donor">
              <div className="ico">🏪</div>
              <h3>Food donors</h3>
              <p>We approach businesses and encourage them to donate surplus food or fundraise for the cause.</p>
              <ul>
                <li>Restaurants &amp; catering agencies</li>
                <li>Supermarkets &amp; food retailers</li>
                <li>Farms &amp; produce markets</li>
                <li>Event &amp; dining facilities</li>
              </ul>
            </div>
            <div className="net-arrow">→</div>
            <div className="net-card donee">
              <div className="ico">🤝</div>
              <h3>Food donees</h3>
              <p>We match each donation to a vetted recipient based on their real needs.</p>
              <ul>
                <li>Local NGOs &amp; non-profits</li>
                <li>Religious &amp; community institutes</li>
                <li>The elderly &amp; homeless</li>
                <li>Refugees &amp; at-risk communities</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-bg">
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=85" alt="Community" />
        </div>
        <div className="wrap">
          <Reveal>
            <h2>Ready to be part of the <em>story?</em></h2>
            <p>Every meal starts with someone who decided to help. Volunteer your time or fuel a Food Assistance Package today.</p>
            <div className="cta-actions">
              <span className="btn btn-green"  onClick={() => navigate("volunteer")}>Volunteer with us</span>
              <span className="btn btn-orange" onClick={() => navigate("donate")}>Make a donation</span>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}