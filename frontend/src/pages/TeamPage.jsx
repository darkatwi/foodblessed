import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "./LandingPage";
import "../styles/team.css";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.12 }
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

const CORE = [
  {
    name: "Maya Terro",
    role: "Co-founder & Executive Director",
    quote: "Food is a primal, everyday part of our lives — and love drives everything we do at FoodBlessed.",
    initials: "MT",
    color: "#f47b20",
  },
  {
    name: "Nour Abdul Reda",
    role: "Vice President & Volunteer Coordinator",
    quote: "We offer meals, hugs, cooking lessons — and a community that lifts people beyond just food.",
    initials: "NA",
    color: "#6cb33f",
  },
  {
    name: "Nizar Mahmoud",
    role: "Pro-bono Financial Consultant",
    quote: "You must be the change you wish to see. FoodBlessed embodies that belief every single day.",
    initials: "NM",
    color: "#33611d",
  },
  {
    name: "Diana Sweid",
    role: "Program Manager, #BeatHungerLB",
    quote: "This work teaches us about gratitude and what it truly means to make a collective impact.",
    initials: "DS",
    color: "#d9601a",
  },
  {
    name: "Hilmi Rifai",
    role: "General Secretary",
    quote: "FoodBlessed is centred on love. We must raise awareness about food poverty and stop waste.",
    initials: "HR",
    color: "#4e8b2c",
  },
  {
    name: "Ghassan Farhat",
    role: "Treasurer",
    quote: "Our volunteers are the heart and essence of FoodBlessed's success in the fight against hunger.",
    initials: "GF",
    color: "#f47b20",
  },
  {
    name: "Bashir Omari",
    role: "Technology Officer",
    quote: "Meaningful change comes from organisations that impact both the people they serve and those who serve.",
    initials: "BO",
    color: "#6cb33f",
  },
  {
    name: "Omar Daou",
    role: "Accountant",
    quote: "Volunteering gave me confidence, leadership — and a deep respect for every culture around the table.",
    initials: "OD",
    color: "#33611d",
  },
];

const AMBASSADORS = [
  {
    name: "Sara Mohammad Assi",
    role: "Ambassador · 2020–present",
    quote: "Food is an expression of love and human connection for those who need it most.",
    initials: "SA",
    color: "#f47b20",
  },
  {
    name: "Yasmine Idriss",
    role: "Ambassador · 2016–present",
    quote: "I share tips and recipes for wasting less — because fighting hunger starts at home.",
    initials: "YI",
    color: "#6cb33f",
  },
  {
    name: "Marilyn Hajj",
    role: "Ambassador · 2019–present",
    quote: "Serving others is transformative — it builds character through patience and responsibility.",
    initials: "MH",
    color: "#d9601a",
  },
  {
    name: "Amany Sabbagh",
    role: "Ambassador · 2014–2017",
    quote: "A physician by day. A Hunger Hero for life.",
    initials: "AS",
    color: "#4e8b2c",
  },
];

function MemberCard({ member }) {
  return (
    <Reveal className="team-card">
      <div className="team-avatar" style={{ background: member.color }}>
        {member.initials}
      </div>
      <div className="team-info">
        <h3>{member.name}</h3>
        <span className="team-role">{member.role}</span>
        <p className="team-quote">"{member.quote}"</p>
      </div>
    </Reveal>
  );
}

export default function TeamPage() {
  const navigate = useNavigate();

  return (
    <div className="team-page">
      <Header forceScrolled />

      {/* CORE TEAM */}
      <section className="team-sec">
        <div className="wrap">
          <Reveal className="team-head">
            <span className="tag">Core team</span>
            <h2 className="sec-title">The people who <em>make it happen</em></h2>
            <p className="lead">From operations to finance, outreach to technology — each member brings a unique skill set driven by the same heart.</p>
          </Reveal>
          <div className="team-grid">
            {CORE.map((m) => <MemberCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      {/* AMBASSADORS */}
      <section className="team-sec team-sec-alt">
        <div className="wrap">
          <Reveal className="team-head">
            <span className="tag">Ambassadors</span>
            <h2 className="sec-title">Voices that <em>amplify the cause</em></h2>
            <p className="lead">Our ambassadors spread the FoodBlessed message across Lebanon and beyond — using their platforms to end hunger and food waste.</p>
          </Reveal>
          <div className="team-grid team-grid-4">
            {AMBASSADORS.map((m) => <MemberCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="team-cta">
        <div className="wrap">
          <Reveal className="team-cta-inner">
            <span className="eyebrow-tag">Join the team</span>
            <h2>Want to be a <em>Hunger Hero?</em></h2>
            <p>Our team is made up entirely of volunteers. Whether you have an hour or a hundred — there's a place for you here.</p>
            <div className="team-cta-actions">
              <button className="btn btn-green" onClick={() => navigate("/volunteer")}>Volunteer with us &nbsp;→</button>
              <button className="btn btn-orange" onClick={() => navigate("/donate")}>Support the mission</button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
