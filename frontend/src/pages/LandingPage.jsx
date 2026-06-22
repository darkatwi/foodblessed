import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/landingpage.css";
import heroImg from "../assets/header.png";
import logoImg from "../assets/logo.png";
import volunteerImg from "../assets/above footer-volunteer.png";
import servingLove1 from "../assets/servinglove1.png";
import servingLove2 from "../assets/servinglove2.png";

/* ------------------------------------------------------------------
   Small reusable hooks (replace the vanilla <script> at the bottom
   of the original index.html)
------------------------------------------------------------------ */

// header background switches once you scroll past 40px
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// adds the `in` class to .reveal elements as they enter the viewport
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------
   Animated counter — counts up once it scrolls into view
------------------------------------------------------------------ */
function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 ? 1 : 0) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [text, setText] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const steps = 60;
          const inc = target / steps;
          let cur = 0;
          let i = 0;
          const t = setInterval(() => {
            i++;
            cur += inc;
            if (i >= steps) {
              cur = target;
              clearInterval(t);
            }
            setText(fmt(Math.round(cur)) + suffix);
          }, 22);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return (
    <div className="num" ref={ref}>
      {text}
    </div>
  );
}

/* ------------------------------------------------------------------
   Data
------------------------------------------------------------------ */
const STATS = [
  { target: 1810000, suffix: "+", label: "Meals served" },
  { target: 800000, suffix: "+", label: "People in need reached" },
  { target: 15000, suffix: "+", label: "Pledges signed" },
  { target: 2500, suffix: "t", label: "Tons of food rescued" },
];

const STEPS = [
  {
    n: "01",
    ico: "🥕",
    title: "We rescue",
    text: "Surplus food is recovered from restaurants, caterers, supermarkets and events before it ever goes to waste.",
  },
  {
    n: "02",
    ico: "🍲",
    title: "We cook & pack",
    text: "Hunger Heroes prepare hearty meals and assemble Food Assistance Packages with love in our soup kitchens.",
  },
  {
    n: "03",
    ico: "🤝",
    title: "We serve",
    text: "Free meals and packages reach families, the elderly and refugees through our trusted NGO partners.",
  },
];

const PACKAGE_ITEMS = [
  "Rice", "Lentils", "Chickpeas", "Vegetable oil", "Pasta",
  "Canned tuna", "Powder milk", "Flour", "+ more",
];

/* ------------------------------------------------------------------
   Sub-components
------------------------------------------------------------------ */
function Logo({ className = "" }) {
  return (
    <a href="#" className={`logo ${className}`}>
      <img src={logoImg} alt="FoodBlessed logo" className="logo-img" />
    </a>
  );
}

function Header({ forceScrolled = false }) {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled || forceScrolled ? "scrolled" : ""}>
      <div className="wrap nav">
        <Logo />
        <nav>
          <ul className={menuOpen ? "open" : ""}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/volunteer" onClick={closeMenu}>Volunteer</Link></li>
            <li><Link to="/team" onClick={closeMenu}>Team</Link></li>
            <li><Link to="/partners" onClick={closeMenu}>Partners</Link></li>
            <li><Link to="/make-a-difference" onClick={closeMenu}>Make a Difference</Link></li>
            <li><Link to="/community-fridge" onClick={closeMenu}>Community Fridge</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
          </ul>
        </nav>
        <div className="nav-cta">
          <Link to="/donate" className="btn btn-orange btn-donate">
            <i>♥</i> Donate
          </Link>
          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src={heroImg}
          alt="FoodBlessed volunteers serving meals"
        />
      </div>
      <div className="wrap">
        <div className="hero-content">
          <span className="eyebrow">★ Lebanon's volunteer-run hunger relief</span>
          <h1>
            Feeding the hungry,
            <br />
            <em>one meal at a time.</em>
          </h1>
          <p>
            We rescue surplus food and turn it into warm, nourishing meals for
            families in need across Lebanon — powered entirely by everyday Hunger
            Heroes.
          </p>
          <div className="hero-actions">
            <Link to="/donate" className="btn btn-orange">
              Donate a meal &nbsp;→
            </Link>
            <a href="https://foodblessed.org/volunteer/" className="btn btn-ghost">
              Become a Hunger Hero
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        <span>scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats-grid">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <Counter target={s.target} suffix={s.suffix} />
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <span className="tag">We are Hunger Heroes</span>
          <h2 className="sec-title">
            A <em>win-win-win</em> model against hunger &amp; food waste.
          </h2>
          <p>
            FoodBlessed is a community-based, volunteer-driven food rescue
            initiative fighting hunger in Lebanon. We recover surplus food from
            events, restaurants and partners, then transform it into wholesome
            free meals for those who need them most.
          </p>
          <p>
            Every plate we serve diverts food from the landfill and brings
            dignity to an underprivileged community — combining environmental and
            social responsibility in one mission.
          </p>
          <a href="https://foodblessed.org/about/" className="btn btn-outline">
            Discover our story
          </a>
        </div>
        <div className="about-media reveal">
          <img
            className="main"
            src={servingLove1}
            alt="Volunteers preparing food"
          />
          <img
            className="float"
            src={servingLove2}
            alt="Serving meals"
          />
          <div className="badge-circle">
            Since<b>2012</b>serving love
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="how-head reveal">
          <span className="tag">How it works</span>
          <h2 className="sec-title">
            From surplus to a <em>warm meal</em>
          </h2>
          <p>
            We connect socially responsible food donors with the local community,
            turning what would be wasted into hope on a plate.
          </p>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step reveal" key={step.n}>
              <span className="n">{step.n}</span>
              <div className="ico">{step.ico}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Package() {
  return (
    <section className="package" id="package">
      <div className="package-inner">
        <div className="package-img reveal">
          <img
            src="https://foodblessed.org/wp-content/uploads/2015/09/foodblessed-plate.jpg"
            alt="A FoodBlessed plate"
          />
        </div>
        <div className="package-text reveal">
          <span className="tag">Food Assistance Package</span>
          <h2>Feed a family of four for a whole month.</h2>
          <div className="price">
            $19<small> / package</small>
          </div>
          <p>
            One package covers the basic needs of a four-member family for a
            month — packed with staples and delivered through our NGO partners to
            families in need.
          </p>
          <div className="items">
            {PACKAGE_ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div>
            <Link to="/donate" className="btn btn-green">
              Donate a package &nbsp;→
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="quote">
      <div className="wrap reveal">
        <span className="quote-mark">“</span>
        <blockquote>
          It's not how much we give, but how much love we put into giving.
        </blockquote>
        <div className="who">— A guiding belief at FoodBlessed</div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta">
      <div className="cta-bg">
        <img
          src={volunteerImg}
          alt="Community meal"
        />
      </div>
      <div className="wrap reveal">
        <h2>
          Be an everyday <em>Hunger Hero.</em>
        </h2>
        <p>
          Whether you cook, serve, donate or pledge to waste less — every action
          puts a meal on someone's table. Join the movement today.
        </p>
        <div className="cta-actions">
          <a href="https://foodblessed.org/volunteer/" className="btn btn-green">
            Volunteer with us
          </a>
          <Link to="/donate" className="btn btn-orange">
            Make a donation
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p>
              A local hunger-relief initiative run by volunteers fighting hunger
              and food waste in Lebanon — one meal at a time.
            </p>
            <div className="socials">
              <a href="https://www.facebook.com/FoodBlessed" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/foodblessed" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="http://www.linkedin.com/company/2780209" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.twitter.com/@foodblessed" aria-label="X (Twitter)">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/community-fridge">Community Fridge</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get involved</h4>
            <ul>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><a href="https://foodblessed.org/pledge/" target="_blank" rel="noreferrer">Take the Pledge</a></li>
              <li><Link to="/make-a-difference">#MakeADifferenceLB</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reach us</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="tel:+9613040989">+961 3 040 989</a></li>
              <li><a href="https://maps.google.com/?q=Sin+El+Fil+Beirut+Lebanon" target="_blank" rel="noreferrer">Burj Hammoud, Beirut</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 FoodBlessed. All rights reserved.</span>
          <span>Feeding the hungry, one meal at a time.</span>
        </div>
      </div>
    </footer>
  );
}

export { Header, Footer };

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------ */
export default function FoodBlessed() {
  useScrollReveal();

  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <About />
      <HowItWorks />
      <Package />
      <Quote />
      <CTA />
      <Footer />
    </>
  );
}