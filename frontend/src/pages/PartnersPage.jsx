import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "./LandingPage";
import "../styles/partners.css";

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

function Reveal({ children, className = "", style }) {
  const [ref, cls] = useReveal();
  return <div ref={ref} className={`${cls} ${className}`} style={style}>{children}</div>;
}


/* ── data ─────────────────────────────────────────────────────────── */

const BAND_STATS = [
  { num: 19, lbl: "Restaurants" },
  { num: 2,  lbl: "Caterers" },
  { num: 17, lbl: "NGOs" },
  { num: 8,  lbl: "Media" },
  { num: 13, lbl: "Companies" },
  { num: 5,  lbl: "Academic" },
];

const FILTERS = [
  { id: "all",         label: "All partners" },
  { id: "restaurants", label: "Restaurants" },
  { id: "catering",    label: "Catering" },
  { id: "ngos",        label: "NGOs" },
  { id: "media",       label: "Media" },
  { id: "companies",   label: "Companies" },
  { id: "academic",    label: "Academic" },
];

const CATEGORIES = [
  {
    id: "restaurants", ico: "🍴", icoBg: "#eaf5e0",
    label: "Restaurants", count: "19 partners",
    partners: [
      { name: "Zaatar W Zeit",       url: "http://www.zaatarwzeit.net",                      logo: "https://foodblessed.org/wp-content/uploads/2016/08/Zaatar_W_Zeit_Logo-01.svg-300x267.png" },
      { name: "Crepaway",            url: "http://www.crepaway.com",                          logo: "https://foodblessed.org/wp-content/uploads/2016/08/Crepaway-01-300x267.png" },
      { name: "Dunkin' Donuts",      url: "http://www.ddlebanon.com",                         logo: "https://foodblessed.org/wp-content/uploads/2016/08/d72db2928a9b9792c0c5275032796e31-300x266.jpg" },
      { name: "Classic Burger Joint",url: "http://cbj.me",                                    logo: "https://foodblessed.org/wp-content/uploads/2016/08/CBJ-300x266.jpg" },
      { name: "Semsom",              url: "http://www.semsom.com",                             logo: "https://foodblessed.org/wp-content/uploads/2016/08/mtg-semsom-logo_and_calligraphy.jpg" },
      { name: "Brisk",               url: "https://www.facebook.com/briskcafe",               logo: "https://foodblessed.org/wp-content/uploads/2016/08/Brisk-logo-small-300x264.jpg" },
      { name: "Frida Cuisine",       url: "http://www.fridacuisine.com",                      logo: "https://foodblessed.org/wp-content/uploads/2016/08/190193_526749567343155_1993599531_n-300x294.jpg" },
      { name: "Cake Pops Boutique",  url: "https://www.facebook.com/cakep.boutique",          logo: "https://foodblessed.org/wp-content/uploads/2016/08/11021379_652514011519922_7993967312347939815_o.jpg" },
      { name: "Casper & Gambini's",  url: "http://www.casperandgambinis.com",                 logo: "https://foodblessed.org/wp-content/uploads/2016/08/13524522_1081210795271254_7871638105742546891_n.png" },
      { name: "Brocheta",            url: "https://www.facebook.com/brocheta.lb",             logo: "https://foodblessed.org/wp-content/uploads/2016/08/247900_207499825961300_4872830_n-300x266.jpg" },
      { name: "Cinnabon",            url: "https://www.facebook.com/Cinnabon",                logo: "https://foodblessed.org/wp-content/uploads/2016/08/cinnabon-300x266.jpg" },
      { name: "Nippon",              url: "http://www.nipponsushiandgrill.com",               logo: "https://foodblessed.org/wp-content/uploads/2016/08/nippon-300x266.jpg" },
      { name: "Sugar Daddy's",       url: "http://www.sugardaddysbakery.com",                 logo: "https://foodblessed.org/wp-content/uploads/2016/08/423594_491828190868161_1190431119_n-300x266.jpg" },
      { name: "T-Marbouta",          url: "http://www.t-marbouta.com",                        logo: "https://foodblessed.org/wp-content/uploads/2016/08/logo-300x266.png" },
      { name: "Amaretti Caffe",      url: "http://www.amaretticaffe.com.lb",                  logo: "https://foodblessed.org/wp-content/uploads/2016/08/amaretti-300x266.png" },
      { name: "Diwan Beirut",        url: "http://www.diwanbeirut.com",                       logo: "https://foodblessed.org/wp-content/uploads/2016/08/11217967_558740060955661_8416609102805482600_n-300x264.jpg" },
      { name: "T-square",            url: "https://www.facebook.com/Tsquarecakes",            logo: "https://foodblessed.org/wp-content/uploads/2016/08/400909_455065367870032_1067328892_n-300x266.jpg" },
      { name: "Kababji",             url: "http://www.kababji.com",                            logo: "https://foodblessed.org/wp-content/uploads/2016/08/13697052_1271163772903350_4959571085549146390_n-300x266.jpg" },
      { name: "Le Sushi Bar",        url: "http://www.lesushibar.com",                        logo: "https://foodblessed.org/wp-content/uploads/2016/08/1069945_473450812740409_494778642_n-300x266.jpg" },
    ],
  },
  {
    id: "catering", ico: "🎉", icoBg: "#fdeede",
    label: "Catering Agencies", count: "2 partners",
    partners: [
      { name: "We Deliver",   url: "https://www.facebook.com/wedeliverleb",  logo: "https://foodblessed.org/wp-content/uploads/2016/08/10458475_782736745089970_5476712649752135945_n-300x267.png" },
      { name: "Fleur De Lys", url: "https://www.facebook.com/fleurdelysfcs", logo: "https://foodblessed.org/wp-content/uploads/2016/08/11700965_1004477292916614_972738073260902960_o-300x266.png" },
    ],
  },
  {
    id: "ngos", ico: "🤝", icoBg: "#e6f0fb",
    label: "NGOs & Non-Profits", count: "17 partners",
    partners: [
      { name: "La Famille du Cœur de Jésus", url: "http://www.fcj-liban.com",                                                                          logo: "https://foodblessed.org/wp-content/uploads/2016/08/n0-300x266.jpg" },
      { name: "Cedars for Care",              url: "https://www.facebook.com/cedars4care",                                                              logo: "https://foodblessed.org/wp-content/uploads/2016/08/14125749_1120621191317849_7161483085332743277_o-300x266.jpg" },
      { name: "Spring of Life",               url: "http://sol-kids.com",                                                                               logo: "https://foodblessed.org/wp-content/uploads/2016/08/spring-of-life-logo2-180x180-300x266.png" },
      { name: "Dar Al Aytam",                 url: "http://www.daralaytam.org",                                                                         logo: "https://foodblessed.org/wp-content/uploads/2016/08/dar-itam-300x266.jpg" },
      { name: "CCECS",                        url: "http://www.aub.edu.lb/ccecs",                                                                       logo: "https://foodblessed.org/wp-content/uploads/2016/08/1601120_791353367547872_966379477_n.jpg" },
      { name: "Franciscan School",            url: "http://www.franciscanschool.org/",                                                                  logo: "https://foodblessed.org/wp-content/uploads/2016/08/95866834_Image-copy-1-300x275.jpg" },
      { name: "Adyan",                        url: "http://www.adyanvillage.net/",                                                                      logo: "https://foodblessed.org/wp-content/uploads/2016/08/adyanlogo-1-300x275.png" },
      { name: "Who is Hussain?",              url: "http://www.whoishussain.org",                                                                       logo: "https://foodblessed.org/wp-content/uploads/2016/08/whoishussain-copy-300x275.jpg" },
      { name: "AUB – Red Cross",              url: "http://www.aub.edu.lb/sao/activities/org/clubs/inf/Pages/redcross.aspx",                            logo: "https://foodblessed.org/wp-content/uploads/2016/08/lrcLogo-copy-300x274.jpg" },
      { name: "FareShare",                    url: "http://www.fareshare.org.uk/",                                                                      logo: "https://foodblessed.org/wp-content/uploads/2016/08/fareshare-300x275.jpg" },
      { name: "Food Cycle",                   url: "http://foodcycle.org.uk/",                                                                          logo: "https://foodblessed.org/wp-content/uploads/2016/08/foodcycle-copy-300x275.jpg" },
      { name: "WRAP",                         url: "http://www.wrap.org.uk/",                                                                           logo: "https://foodblessed.org/wp-content/uploads/2016/08/wraplogo-copy-300x275.jpg" },
      { name: "NLWA",                         url: "http://www.nlwa.gov.uk/",                                                                           logo: "https://foodblessed.org/wp-content/uploads/2016/08/nlwa-copy-300x275.jpg" },
      { name: "John Smith Trust",             url: "http://www.johnsmithmemorialtrust.org/",                                                            logo: "https://foodblessed.org/wp-content/uploads/2016/08/jsmt_logo_new-copy-300x275.jpg" },
      { name: "Makhzoumi Foundation",         url: "http://www.makhzoumi-foundation.org",                                                               logo: "https://foodblessed.org/wp-content/uploads/2016/08/11407099_10152867146977190_3613025694549001014_n-300x268.jpg" },
      { name: "4aCause",                      url: "http://www.4acause.me",                                                                             logo: "https://foodblessed.org/wp-content/uploads/2016/08/578814_440906052616233_1016902806_n-300x267.jpg" },
      { name: "Jésuites Fraternity",          url: "http://www.jespro.org/",                                                                           logo: "https://foodblessed.org/wp-content/uploads/2016/08/jesuites-300x275.jpg" },
    ],
  },
  {
    id: "media", ico: "📺", icoBg: "#f3e9fb",
    label: "Media", count: "8 partners",
    partners: [
      { name: "MTV Lebanon",      url: "http://mtv.com.lb/",                  logo: "https://foodblessed.org/wp-content/uploads/2016/08/mtv-logo-300x275.jpg" },
      { name: "Future TV",        url: "http://www.futuretvnetwork.com/",      logo: "https://foodblessed.org/wp-content/uploads/2016/08/Future_tv_logo_2012-300x275.jpg" },
      { name: "Télé Lumière",     url: "http://www.noursat.tv/",              logo: "https://foodblessed.org/wp-content/uploads/2016/08/telelumeire-copy-300x275.jpg" },
      { name: "Time Out Beirut",  url: "http://www.timeout.com/beirut",       logo: "https://foodblessed.org/wp-content/uploads/2016/08/timeoutbeirut-300x275.jpg" },
      { name: "Lebtivity",        url: "http://www.lebtivity.com/",           logo: "https://foodblessed.org/wp-content/uploads/2016/08/lebtivity-300x275.jpg" },
      { name: "Cuizin Magazine",  url: "http://www.cuizinmag.com/",           logo: "https://foodblessed.org/wp-content/uploads/2016/08/cuizinnewlogo-copy-300x275.jpg" },
      { name: "NoGarlicNoOnions", url: "https://nogarlicnoonions.com/",       logo: "https://foodblessed.org/wp-content/uploads/2016/08/nogarlicnoonions-300x275.jpg" },
      { name: "Maria Frangieh",   url: "http://mariafrangieh.com/",           logo: "https://foodblessed.org/wp-content/uploads/2016/08/mariafrangieh-300x279.jpg" },
    ],
  },
  {
    id: "companies", ico: "🏢", icoBg: "#fbeede",
    label: "Companies", count: "13 partners",
    partners: [
      { name: "MindField",           url: "http://mindfield.co/",                                logo: "https://foodblessed.org/wp-content/uploads/2016/08/mindfield-300x275.jpg" },
      { name: "Unipack",             url: "http://unipackworldwide.com/",                        logo: "https://foodblessed.org/wp-content/uploads/2016/08/unipacklogo-300x275.jpg" },
      { name: "Cupcake Box",         url: "https://www.facebook.com/CupcakeBox.Charity",        logo: "https://foodblessed.org/wp-content/uploads/2016/08/cupcakebox-300x300.jpg" },
      { name: "Al Ahli Holding",     url: "http://www.csralahligroup.com/",                     logo: "https://foodblessed.org/wp-content/uploads/2016/08/alahliholding-copy-300x275.jpg" },
      { name: "Free Lens",           url: "https://www.facebook.com/FreeLens.Lebanon",          logo: "https://foodblessed.org/wp-content/uploads/2016/08/freelens-300x275.jpg" },
      { name: "Poppins",             url: "http://www.poppins.com.lb/",                         logo: "https://foodblessed.org/wp-content/uploads/2016/08/poppins-300x275.jpg" },
      { name: "Metlife Alico",       url: "http://metlifealico.com.lb/",                        logo: "https://foodblessed.org/wp-content/uploads/2016/08/metlife-logo-300x275.jpg" },
      { name: "Master Gum & Candies",url: "http://www.mastergum.com/",                         logo: "https://foodblessed.org/wp-content/uploads/2016/08/mastergumcandy-300x275.jpg" },
      { name: "Zoomaal",             url: "https://www.zoomaal.com/",                           logo: "https://foodblessed.org/wp-content/uploads/2016/08/zoomaal-300x275.jpg" },
      { name: "Darina",              url: "https://www.facebook.com/DarinaJuice",               logo: "https://foodblessed.org/wp-content/uploads/2016/08/darinajuice-300x275.jpg" },
      { name: "DOMO",                url: "http://www.meptico.com/TheBrands/Detail/4",          logo: "https://foodblessed.org/wp-content/uploads/2016/08/domologo-300x275.jpg" },
      { name: "MEPTICO",             url: "http://www.meptico.com/",                            logo: "https://foodblessed.org/wp-content/uploads/2016/08/meptico-300x275.jpg" },
      { name: "Vincent",             url: "http://www.vincent-leb.com/",                        logo: "https://foodblessed.org/wp-content/uploads/2016/08/vincent-300x275.png" },
    ],
  },
  {
    id: "academic", ico: "🎓", icoBg: "#e3f6ee",
    label: "Academic Institutions", count: "5 partners",
    partners: [
      { name: "AUB",                       url: "http://www.aub.edu.lb/",                                                                logo: "https://foodblessed.org/wp-content/uploads/2016/08/AUB-logo-2_400x400-300x275.jpg" },
      { name: "ESA",                       url: "https://www.esa.edu.lb",                                                                logo: "https://foodblessed.org/wp-content/uploads/2016/08/ESA_LOGO.svg-copy-300x275.jpg" },
      { name: "British Embassy",           url: "https://www.gov.uk/government/world/organisations/british-embassy-beirut",             logo: "https://foodblessed.org/wp-content/uploads/2016/08/britishembassybeirut-300x275.jpg" },
      { name: "Wellspring Learning Community", url: "http://www.wellspring.edu.lb/",                                                    logo: "https://foodblessed.org/wp-content/uploads/2016/08/WellspringLogo-300x275.jpg" },
      { name: "American Community School", url: "http://www.acs.edu.lb/",                                                               logo: "https://foodblessed.org/wp-content/uploads/2016/08/ACS_Beirut_Logo-300x275.jpg" },
    ],
  },
];

/* ── component ────────────────────────────────────────────────────── */

export default function PartnersPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="partners-page">
      <Header />

      {/* HERO */}
      <section className="pagehero">
        <div className="pagehero-bg">
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=85" alt="Partnership handshake" />
        </div>
        <div className="wrap">
          <div className="crumb"><span onClick={() => navigate("/")}>Home</span> &nbsp;/&nbsp; Partners</div>
          <span className="eyebrow">CSR in action</span>
          <h1>Our blessed <em>partners.</em></h1>
          <p>We build long-term partnerships between food donors and food donees. From restaurants and caterers to NGOs, media, companies and schools — these are the people who make our mission possible.</p>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="band">
        <div className="wrap band-grid">
          {BAND_STATS.map((s) => (
            <div className="item" key={s.lbl}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS GRID */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="center" style={{ maxWidth: "660px", margin: "0 auto 40px" }}>
            <span className="tag">Better together</span>
            <h2 className="sec-title">Giving back, <em>together</em></h2>
            <p className="lead" style={{ margin: "0 auto" }}>FoodBlessed gives individuals and companies a real chance to develop their community by unleashing their inner Corporate Social Responsibility. Filter by category to explore who we work with.</p>
          </Reveal>

          <Reveal className="filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter${activeFilter === f.id ? " active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`cat-group${activeFilter !== "all" && activeFilter !== cat.id ? " hide" : ""}`}
            >
              <div className="cat-head">
                <span className="ic" style={{ background: cat.icoBg }}>{cat.ico}</span>
                <h3>{cat.label}</h3>
                <span className="count">{cat.count}</span>
                <hr />
              </div>
              <div className="logo-grid">
                {cat.partners.map((p) => (
                  <a key={p.name} className="p-card" href={p.url} target="_blank" rel="noreferrer">
                    <div className="p-logo">
                      <img src={p.logo} alt={p.name} />
                    </div>
                    <span className="p-name">{p.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta partners-cta">
        <div className="cta-bg">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=85" alt="Team collaboration" />
        </div>
        <div className="wrap">
          <Reveal>
            <h2>Want to become a <em>partner?</em></h2>
            <p>If your business has surplus food to donate or wants to fundraise for the cause, we'd love to unleash your inner Corporate Social Responsibility together.</p>
            <div className="cta-actions">
              <a href="https://foodblessed.org/contact/" className="btn btn-orange">Partner with us</a>
              <a href="https://foodblessed.org/donate/" className="btn btn-ghost">Make a donation</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
