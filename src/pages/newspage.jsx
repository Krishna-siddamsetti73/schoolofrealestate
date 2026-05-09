import { useEffect, useState, useRef, useCallback } from "react";

const T = {
  bg:       "#F7F5F0",
  card:     "#FFFFFF",
  border:   "#E8E4DC",
  text:     "#1A1714",
  sub:      "#6B6560",
  faint:    "#A8A29A",
  grad:     "linear-gradient(135deg, #C9A84C 0%, #2C3E6B 100%)",
  gold:     "#C9A84C",
  goldDk:   "#B8860B",
  goldBg:   "#FDF6E3",
  navy:     "#1E3A6B",
  navyBg:   "#EBF0FA",
  green:    "#1A6B3A",
  greenBg:  "#EDF7F2",
  tel:      "#1A4FAD",
  telBg:    "#EBF0FA",
  ap:       "#8B1F2D",
  apBg:     "#FAF0F1",
  telugu:   "#5B3FA8",
  teluguBg: "#F0EDFB",
  et:       "#2D6A6A",
  etBg:     "#EBF5F5",
};

const FEEDS = [
  { label:"Hyderabad", color:T.goldDk, bg:T.goldBg,   url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DHyderabad%2Breal%2Bestate%2Bgrowth%26hl%3Den-IN%26gl%3DIN%26ceid%3DIN%3Aen" },
  { label:"Telangana", color:T.tel,    bg:T.telBg,    url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DTelangana%2Breal%2Bestate%2Binvestment%26hl%3Den-IN%26gl%3DIN%26ceid%3DIN%3Aen" },
  { label:"Andhra",    color:T.ap,     bg:T.apBg,     url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DAndhra%2BPradesh%2Bproperty%2Blaunch%26hl%3Den-IN%26gl%3DIN%26ceid%3DIN%3Aen" },
  { label:"Telugu",    color:T.telugu, bg:T.teluguBg, url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%E0%B0%B0%E0%B0%BF%E0%B0%AF%E0%B0%B2%E0%B1%8D%2B%E0%B0%85%E0%B0%AD%E0%B0%BF%E0%B0%B5%E0%B1%83%E0%B0%A6%E0%B1%8D%E0%B0%A7%E0%B0%BF%26hl%3Dte%26gl%3DIN%26ceid%3DIN%3Ate" },
  { label:"ET Realty", color:T.et,     bg:T.etBg,     url:"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frealty.economictimes.indiatimes.com%2Frss%2Ftopstories" },
];

const NEG = ["fraud","scam","illegal","collapse","loss","demolish","complaint","decline","drop","fall","crash","problem","delay","violation","penalty","arrest","cheat","trouble","crisis","fail","reject","cancel","ban","court"];
const POS = ["growth","launch","approved","investment","new project","record","rise","surge","milestone","profit","boom","expansion","infrastructure","opportunity","soar","success","inaugurate","approve","fund","attract","build","open","township","villa","apartment","plot","layout","smart","metro","crore","lakh","ఆమోదం","అభివృద్ధి","పెట్టుబడి"];
const EMOJIS = ["🏗️","🏢","🏘️","💰","🌆","🏙️","🏠","📊","🌳","🛣️","✅","🎯"];
const TOPICS = ["HMDA","RERA","Amaravati","Vizag","Warangal","Township","Villas","Apartments","Plots","Metro","IT Corridor","ORR","Smart City","Investment"];
const TABS   = ["All","Telangana","Andhra","Telugu","Hyderabad"];

const IMGS = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
];

const FALLBACK = [
  { title:"Hyderabad property market records 28% YoY growth — New launches surge across ORR corridor", source:"Hyderabad", region:"Telangana" },
  { title:"HMDA approves integrated township of 3,400 acres near Hyderabad — ₹12,000 Cr investment planned", source:"Telangana", region:"Telangana" },
  { title:"Amaravati capital region sees 45% jump in land registrations — AP infrastructure boost", source:"Andhra", region:"Andhra" },
  { title:"Vizag Smart City attracts ₹8,500 Cr real estate investment — IT corridor expands", source:"Andhra", region:"Andhra" },
  { title:"హైదరాబాద్‌లో రియల్ ఎస్టేట్ రంగంలో రికార్డు పెట్టుబడులు — కొత్త టౌన్‌షిప్‌లు", source:"Telugu", region:"Telugu" },
  { title:"Warangal emerges as Telangana's new IT hub — residential demand up 60% in 2025", source:"Telangana", region:"Telangana" },
  { title:"Data centers add ₹15,000 Cr to Hyderabad commercial real estate — 22 facilities approved", source:"Hyderabad", region:"Telangana" },
  { title:"అమరావతి నిర్మాణం వేగంగా జరుగుతోంది — ప్రభుత్వం ₹6,000 కోట్లు మంజూరు చేసింది", source:"Telugu", region:"Telugu" },
  { title:"Tirupati industrial corridor drives land surge — new residential layouts see record bookings", source:"Andhra", region:"Andhra" },
  { title:"Greenfield airport near Hyderabad triples land prices — investors flock to 50km radius", source:"ET Realty", region:"Telangana" },
  { title:"RERA Telangana strengthens buyer protections — record 1,200 projects registered Q1 2026", source:"ET Realty", region:"Telangana" },
  { title:"Luxury villas in Jubilee Hills see 40% pre-launch sellout — premium Hyderabad demand soars", source:"Hyderabad", region:"Telangana" },
].map((n, i) => {
  const f = FEEDS.find(f => f.label === n.source) || FEEDS[0];
  return { ...n, id:`f${i}`, link:"#", image:IMGS[i % IMGS.length],
    pubDate:new Date(Date.now() - i * 3600000).toISOString(),
    color:f.color, bg:f.bg, sentiment:"positive" };
});

/* ── helpers ── */
function getSentiment(t) {
  const s = t.toLowerCase();
  if (NEG.some(w => s.includes(w))) return "negative";
  if (POS.some(w => s.includes(w))) return "positive";
  return "neutral";
}
function getRegion(t, label) {
  if (label === "Telugu") return "Telugu";
  const s = t.toLowerCase();
  if (s.includes("andhra")||s.includes("vizag")||s.includes("amaravati")||s.includes("vijayawada")||s.includes("tirupati")) return "Andhra";
  return "Telangana";
}
function ago(d) {
  if (!d) return "";
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}
function parseItems(data, feed, startIdx) {
  if (!data?.items?.length) return [];
  let idx = startIdx;
  return data.items.slice(0, 12).map(item => {
    const title = (item.title || "").replace(/<[^>]+>/g, "").trim();
    if (getSentiment(title) === "negative" || title.length < 15) return null;
    const rawImg = item.enclosure?.link || item.thumbnail || item.image || "";
    const image = rawImg && rawImg.startsWith("http") ? rawImg : IMGS[idx++ % IMGS.length];
    return {
      id:`${feed.label}-${idx}-${Date.now()}`,
      title, link:item.link || "#", image,
      source:feed.label, color:feed.color, bg:feed.bg,
      pubDate:item.pubDate || "",
      sentiment:getSentiment(title),
      region:getRegion(title, feed.label),
    };
  }).filter(Boolean);
}
function regionStyle(region, source) {
  if (source==="Telugu"  || region==="Telugu")   return { color:T.telugu, background:T.teluguBg };
  if (source==="Andhra"  || region==="Andhra")   return { color:T.ap,     background:T.apBg };
  if (source==="Hyderabad")                      return { color:T.goldDk, background:T.goldBg };
  if (source==="ET Realty")                      return { color:T.et,     background:T.etBg };
  return { color:T.tel, background:T.telBg };
}

/* ── Tag pill ── */
function Tag({ label, color, bg }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px",
      background:bg, color, fontSize:"0.42rem", fontWeight:700,
      letterSpacing:"0.12em", textTransform:"uppercase", borderRadius:4 }}>
      {label}
    </span>
  );
}

/* ── GCircle ── */
function GCircle({ emoji, size=44 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:T.grad,
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, fontSize:size*0.38 }}>
      {emoji}
    </div>
  );
}

/* ══════════════════════
   AUTO-SCROLLING TICKER STRIP
   Continuous marquee-style breaking news scroll
══════════════════════ */
function ScrollStrip({ news, loading }) {
  const trackRef   = useRef(null);
  const pausedRef  = useRef(false);
  const rafRef     = useRef(null);
  const posRef     = useRef(0);
  const SPEED      = 0.6; // px per frame — tweak for faster/slower

  useEffect(() => {
    const el = trackRef.current;
    if (!el || loading || !news.length) return;

    // Wait one paint so offsetWidth is correct
    const start = () => {
      const inner = el.querySelector(".ticker-inner");
      if (!inner) return;
      const totalW = inner.scrollWidth / 2; // duplicated content

      const step = () => {
        if (!pausedRef.current) {
          posRef.current -= SPEED;
          if (Math.abs(posRef.current) >= totalW) posRef.current = 0;
          inner.style.transform = `translateX(${posRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(start);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafRef.current);
    };
  }, [news, loading]);

  const items = news.slice(0, 14);
  // Duplicate items so the scroll loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div style={{ background:T.card, borderTop:`1px solid ${T.border}`,
      borderBottom:`3px solid ${T.gold}`, height:90, display:"flex",
      alignItems:"stretch", overflow:"hidden", position:"relative" }}>

      {/* Left label badge */}
      <div style={{ flexShrink:0, background:T.grad, display:"flex",
        alignItems:"center", gap:8, padding:"0 18px", zIndex:2 }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:"#fff",
          animation:"blink 1.2s infinite", display:"inline-block" }} />
        <span style={{ fontSize:"0.46rem", fontWeight:800, letterSpacing:"0.28em",
          color:"#fff", textTransform:"uppercase", whiteSpace:"nowrap" }}>Breaking</span>
      </div>

      {/* Scrollable track */}
      <div ref={trackRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"stretch" }}>

        {loading || !news.length ? (
          <div style={{ display:"flex", alignItems:"center", paddingLeft:20,
            gap:10, color:T.faint, fontSize:"0.65rem", whiteSpace:"nowrap" }}>
            <div style={{ width:14, height:14, border:`2px solid ${T.gold}`,
              borderTopColor:"transparent", borderRadius:"50%",
              animation:"spin .8s linear infinite" }} />
            Loading stories…
          </div>
        ) : (
          <div className="ticker-inner"
            style={{ display:"flex", alignItems:"stretch",
              width:"max-content", willChange:"transform" }}>
            {doubled.map((item, i) => {
              const rs = regionStyle(item.region, item.source);
              return (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", flexDirection:"column", justifyContent:"center",
                    width:280, padding:"10px 16px", borderRight:`1px solid ${T.border}`,
                    flexShrink:0, textDecoration:"none", transition:"background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                    <Tag label={item.source} color={rs.color} bg={rs.background} />
                    <span style={{ fontSize:"0.42rem", color:T.faint }}>{ago(item.pubDate)}</span>
                  </div>
                  <div style={{ fontSize:"0.72rem", fontWeight:600, lineHeight:1.4,
                    color:T.text, fontFamily:"'Playfair Display',Georgia,serif",
                    display:"-webkit-box", WebkitLineClamp:2,
                    WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {item.title}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Fade edges */}
      <div style={{ position:"absolute", left:120, top:0, bottom:0, width:32, pointerEvents:"none",
        background:`linear-gradient(to right, ${T.card}, transparent)`, zIndex:1 }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:40, pointerEvents:"none",
        background:`linear-gradient(to left, ${T.card}, transparent)`, zIndex:1 }} />
    </div>
  );
}

/* ══════════════════════
   HERO CARD
══════════════════════ */
function HeroCard({ item }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  const rs = regionStyle(item.region, item.source);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr",
        background:T.card, borderRadius:20, overflow:"hidden",
        border:`1px solid ${T.border}`, marginBottom:20,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.10)" : "0 4px 20px rgba(0,0,0,0.06)",
        transition:"all .35s cubic-bezier(0.22,1,0.36,1)" }}>

      {/* Image side */}
      <div style={{ position:"relative", minHeight:320, overflow:"hidden" }}>
        <img src={err ? IMGS[0] : item.image} alt={item.title}
          onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover",
            position:"absolute", inset:0,
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition:"transform .7s ease" }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(135deg,rgba(26,23,20,0.25) 0%,transparent 60%)" }} />
        <div style={{ position:"absolute", top:14, left:14 }}>
          <Tag label={item.region} color={rs.color} bg={rs.background} />
        </div>
        <div style={{ position:"absolute", bottom:14, left:14,
          background:T.greenBg, padding:"4px 10px", borderRadius:7,
          display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:11 }}>📈</span>
          <span style={{ fontSize:"0.44rem", fontWeight:700, color:T.green,
            letterSpacing:"0.1em", textTransform:"uppercase" }}>Growth Story</span>
        </div>
      </div>

      {/* Text side */}
      <div style={{ padding:"30px 26px", display:"flex",
        flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <GCircle emoji="🏆" size={40} />
            <div>
              <span style={{ fontSize:"0.44rem", fontWeight:800, letterSpacing:"0.28em",
                textTransform:"uppercase", color:T.goldDk, display:"block", marginBottom:3 }}>
                Top Story
              </span>
              <span style={{ fontSize:"0.48rem", color:T.faint }}>{ago(item.pubDate)}</span>
            </div>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"1.22rem", fontWeight:700, lineHeight:1.5,
            color: hov ? T.navy : T.text, margin:"12px 0 12px",
            transition:"color .25s" }}>
            {item.title}
          </h2>
          <Tag label={item.source} color={rs.color} bg={rs.background} />
        </div>
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:6,
            marginTop:24, padding:"10px 20px", background:T.grad,
            borderRadius:10, fontSize:"0.54rem", fontWeight:700,
            letterSpacing:"0.16em", textTransform:"uppercase",
            color:"#fff", textDecoration:"none", alignSelf:"flex-start" }}>
          Read Full Story →
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════
   NEWS CARD
══════════════════════ */
function NewsCard({ item, index, delay }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  const rs = regionStyle(item.region, item.source);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:T.card, borderRadius:16, overflow:"hidden",
        border:`1px solid ${T.border}`, display:"flex", flexDirection:"column",
        transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? "0 12px 36px rgba(0,0,0,0.10)" : "0 2px 10px rgba(0,0,0,0.05)",
        transition:"all .35s cubic-bezier(0.22,1,0.36,1)",
        animation:`fadeUp .6s ease ${delay}s both` }}>

      <div style={{ position:"relative", height:160, overflow:"hidden" }}>
        <img src={err ? IMGS[index % IMGS.length] : item.image} alt={item.title}
          onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover",
            transform: hov ? "scale(1.07)" : "scale(1)", transition:"transform .6s" }} />
        <div style={{ position:"absolute", top:10, right:10 }}>
          <Tag label={item.region} color={rs.color} bg={rs.background} />
        </div>
      </div>

      <div style={{ padding:"14px", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <GCircle emoji={EMOJIS[index % EMOJIS.length]} size={28} />
          <div>
            <div style={{ fontSize:"0.46rem", fontWeight:700, letterSpacing:"0.1em",
              textTransform:"uppercase", color:item.color }}>{item.source}</div>
            <div style={{ fontSize:"0.42rem", color:T.faint, marginTop:2 }}>{ago(item.pubDate)}</div>
          </div>
        </div>
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"0.82rem", fontWeight:700, lineHeight:1.5,
            color: hov ? T.navy : T.text, flex:1,
            display:"-webkit-box", WebkitLineClamp:3,
            WebkitBoxOrient:"vertical", overflow:"hidden",
            marginBottom:12, textDecoration:"none", transition:"color .2s" }}>
          {item.title}
        </a>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:4,
            background:T.greenBg, padding:"3px 8px", borderRadius:6 }}>
            <span style={{ fontSize:10 }}>📈</span>
            <span style={{ fontSize:"0.42rem", fontWeight:700, color:T.green,
              letterSpacing:"0.08em", textTransform:"uppercase" }}>Growth</span>
          </div>
          <a href={item.link} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:"0.52rem", fontWeight:700, textDecoration:"none",
              color: hov ? T.navy : T.goldDk, transition:"color .2s" }}>
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════
   LIST ROW
══════════════════════ */
function ListRow({ item, index }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"flex", gap:12, padding:"12px", borderRadius:12,
        border:`1px solid ${hov ? T.border : "transparent"}`,
        background: hov ? T.card : "transparent",
        textDecoration:"none", transition:"all .25s",
        animation:`fadeUp .5s ease ${index*0.04}s both` }}>
      <div style={{ width:72, height:56, borderRadius:9, overflow:"hidden", flexShrink:0 }}>
        <img src={err ? IMGS[index % IMGS.length] : item.image} alt={item.title}
          onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover",
            transform: hov ? "scale(1.08)" : "scale(1)", transition:"transform .4s" }} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5, flexWrap:"wrap" }}>
          <GCircle emoji={EMOJIS[index % EMOJIS.length]} size={20} />
          <span style={{ fontSize:"0.44rem", fontWeight:700, letterSpacing:"0.1em",
            textTransform:"uppercase", color:item.color }}>{item.source}</span>
          <span style={{ fontSize:"0.42rem", color:T.faint }}>{ago(item.pubDate)}</span>
          <span style={{ marginLeft:"auto", fontSize:"0.42rem", fontWeight:700,
            color:T.green, background:T.greenBg, padding:"1px 6px",
            borderRadius:4, textTransform:"uppercase" }}>📈</span>
        </div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif",
          fontSize:"0.8rem", fontWeight:600, lineHeight:1.45,
          color: hov ? T.navy : T.text, transition:"color .2s",
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {item.title}
        </div>
      </div>
    </a>
  );
}

/* ══════════════════════
   SECTION HEADER
══════════════════════ */
function SectionHd({ emoji, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"4px 0 14px" }}>
      <GCircle emoji={emoji} size={30} />
      <span style={{ fontSize:"0.52rem", fontWeight:700, letterSpacing:"0.24em",
        textTransform:"uppercase", color:T.sub }}>{label}</span>
      <div style={{ flex:1, height:1.5,
        background:`linear-gradient(to right,${T.border},transparent)` }} />
    </div>
  );
}

/* ══════════════════════
   SIDEBAR PANELS
══════════════════════ */
function SideCard({ children }) {
  return (
    <div style={{ background:T.card, borderRadius:16, padding:"18px",
      border:`1px solid ${T.border}` }}>
      {children}
    </div>
  );
}
function SideHd({ emoji, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:14 }}>
      <GCircle emoji={emoji} size={32} />
      <span style={{ fontSize:"0.52rem", fontWeight:700, letterSpacing:"0.18em",
        textTransform:"uppercase", color:T.sub }}>{label}</span>
    </div>
  );
}

function SourcePanel({ news }) {
  return (
    <SideCard>
      <SideHd emoji="📡" label="Sources" />
      {FEEDS.map((f, i) => {
        const count = news.filter(n => n.source === f.label).length;
        const pct   = news.length ? Math.round((count / news.length) * 100) : 0;
        return (
          <div key={f.label} style={{ marginBottom: i < FEEDS.length - 1 ? 12 : 0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:"0.58rem", fontWeight:700, color:f.color }}>{f.label}</span>
              <span style={{ fontSize:"0.54rem", color:T.sub }}>{count}</span>
            </div>
            <div style={{ height:4, background:"#F0EDE8", borderRadius:6, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:T.grad,
                borderRadius:6, transition:"width 1.2s ease" }} />
            </div>
          </div>
        );
      })}
    </SideCard>
  );
}

function TopicsPanel({ onSearch, active }) {
  return (
    <SideCard>
      <SideHd emoji="🔍" label="Quick Search" />
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {TOPICS.map(t => (
          <button key={t} onClick={() => onSearch(active === t ? "" : t)}
            style={{ padding:"5px 10px", fontSize:"0.54rem", fontFamily:"inherit",
              border:`1px solid ${active === t ? T.gold : T.border}`,
              background: active === t ? T.grad : "transparent",
              color: active === t ? "#fff" : T.sub,
              cursor:"pointer", borderRadius:7, transition:"all .2s", fontWeight:600 }}>
            {t}
          </button>
        ))}
      </div>
    </SideCard>
  );
}

function AboutPanel() {
  const items = [
    { emoji:"💡", label:"Easy to Understand",  desc:"Simple summaries of complex property market movements across AP & TS" },
    { emoji:"🏗️", label:"Practical Coverage",   desc:"Real projects, launches and investment news from Telugu states" },
    { emoji:"💰", label:"Growth-Focused",        desc:"Only growth and development stories — real estate opportunities" },
  ];
  return (
    <SideCard>
      <SideHd emoji="ℹ️" label="About" />
      {items.map((item, i) => (
        <div key={i} style={{ display:"flex", gap:10, padding:"10px",
          background:T.bg, borderRadius:10, marginBottom: i < items.length - 1 ? 8 : 0 }}>
          <GCircle emoji={item.emoji} size={32} />
          <div>
            <div style={{ fontSize:"0.62rem", fontWeight:700, color:T.text, marginBottom:2 }}>{item.label}</div>
            <div style={{ fontSize:"0.54rem", color:T.sub, lineHeight:1.5 }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </SideCard>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function NewsPage() {
  const [allNews,    setAllNews]    = useState(FALLBACK);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab,        setTab]        = useState("All");
  const [search,     setSearch]     = useState("");
  const [updated,    setUpdated]    = useState("just now");

  const fetchAll = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      let imgCounter = 0;
      const results = await Promise.allSettled(
        FEEDS.map(f =>
          fetch(f.url, { signal: AbortSignal.timeout(9000) })
            .then(r => r.json())
            .then(d => {
              const items = parseItems(d, f, imgCounter);
              imgCounter += items.length;
              return items;
            })
            .catch(() => [])
        )
      );
      const items = [];
      results.forEach(r => { if (r.status === "fulfilled") items.push(...r.value); });
      if (items.length >= 4) {
        setAllNews(items);
        setUpdated(new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" }));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const iv = setInterval(() => fetchAll(), 10 * 60 * 1000);
    return () => clearInterval(iv);
  }, [fetchAll]);

  // Only show positive/neutral — never show negative
  const filtered = allNews.filter(n => {
    if (n.sentiment === "negative") return false;
    const matchTab =
      tab === "All" ||
      (tab === "Telangana" && (n.region === "Telangana" || n.source === "Telangana")) ||
      (tab === "Andhra"    && (n.region === "Andhra"    || n.source === "Andhra")) ||
      (tab === "Telugu"    && (n.region === "Telugu"    || n.source === "Telugu")) ||
      (tab === "Hyderabad" && (n.source === "Hyderabad" || n.title.toLowerCase().includes("hyderabad")));
    const matchQ = !search || n.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchQ;
  });

  const hero     = filtered[0];
  const featured = filtered.slice(1, 7);
  const more     = filtered.slice(7);

  return (
    <div style={{ background:T.bg, minHeight:"100vh",
      fontFamily:"'Inter',sans-serif", color:T.text,
      display:"flex", flexDirection:"column", marginTop:100}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { display: none; }

        @media(max-width:1100px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .sidebar-col { display: none !important; }
          .stats-row { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media(max-width:680px) {
          .card-grid { grid-template-columns: 1fr !important; }
          .hero-card { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
          .tab-bar   { overflow-x: auto; flex-wrap: nowrap !important; }
          .tab-btn   { flex-shrink: 0; }
          .hdr-actions { flex-wrap: wrap; }
        }
      `}</style>

      {/* ══ HEADER ══ */}
      <header style={{ background:T.card, borderBottom:`1px solid ${T.border}`,
        padding:"0 clamp(16px,4vw,56px)", flexShrink:0 }}>

        <div className="hdr-actions" style={{ display:"flex", alignItems:"center",
          justifyContent:"space-between", padding:"16px 0 12px", gap:12, flexWrap:"wrap" }}>
          {/* Brand */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <GCircle emoji="🏙️" size={48} />
            <div>
              <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",
                fontSize:"clamp(1.2rem,3vw,1.8rem)", fontWeight:800,
                letterSpacing:"-0.02em", lineHeight:1.1, color:T.text }}>
                Telugu States Property
              </h1>
              <p style={{ fontSize:"0.57rem", color:T.sub, marginTop:3, letterSpacing:"0.05em" }}>
                Real Estate News · Telangana &amp; Andhra Pradesh
              </p>
            </div>
          </div>

          {/* Search + Refresh */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:10, top:"50%",
                transform:"translateY(-50%)", fontSize:13, pointerEvents:"none" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search news…"
                style={{ padding:"8px 12px 8px 32px", background:T.bg,
                  border:`1px solid ${T.border}`, borderRadius:10,
                  color:T.text, fontSize:"0.75rem", outline:"none",
                  width:200, fontFamily:"inherit" }}
                onFocus={e  => e.target.style.borderColor = T.gold}
                onBlur={e   => e.target.style.borderColor = T.border} />
            </div>
            <button onClick={() => fetchAll(true)}
              style={{ display:"flex", alignItems:"center", gap:6,
                padding:"8px 16px", background:T.grad, border:"none",
                borderRadius:10, color:"#fff", cursor:"pointer",
                fontSize:"0.56rem", fontWeight:700, letterSpacing:"0.14em",
                textTransform:"uppercase", fontFamily:"inherit" }}>
              <span style={{ fontSize:12, display:"inline-block",
                animation: refreshing ? "spin .7s linear infinite" : "none" }}>🔄</span>
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar" style={{ display:"flex", gap:0, flexWrap:"wrap",
          borderTop:`1px solid ${T.border}` }}>
          {TABS.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)}
              style={{ padding:"10px 18px", fontSize:"0.58rem", fontWeight:700,
                letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer",
                background:"transparent", border:"none", fontFamily:"inherit",
                color: tab === t ? T.goldDk : T.sub,
                borderBottom: tab === t ? `2.5px solid ${T.gold}` : "2.5px solid transparent",
                transition:"all .2s", whiteSpace:"nowrap" }}>
              {t}
            </button>
          ))}
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center",
            gap:7, paddingRight:4 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:T.green,
              animation:"blink 2s infinite", display:"inline-block" }} />
            <span style={{ fontSize:"0.5rem", color:T.faint }}>
              {filtered.length} stories · {updated}
            </span>
          </div>
        </div>
      </header>

      {/* ══ STATS ROW ══ */}
      {!loading && (
        <div className="stats-row" style={{ display:"grid",
          gridTemplateColumns:"repeat(6,1fr)", gap:10,
          padding:"20px clamp(16px,4vw,56px)" }}>
          {[
            { e:"📰", l:"Total",     v:allNews.length,                                    c:T.text   },
            { e:"📈", l:"Growth",    v:allNews.filter(n=>n.sentiment==="positive").length, c:T.green  },
            { e:"🏙️", l:"Telangana",  v:allNews.filter(n=>n.region==="Telangana").length,  c:T.tel    },
            { e:"🌊", l:"Andhra",     v:allNews.filter(n=>n.region==="Andhra").length,     c:T.ap     },
            { e:"🔤", l:"Telugu",     v:allNews.filter(n=>n.region==="Telugu").length,     c:T.telugu },
            { e:"📡", l:"Sources",    v:FEEDS.length,                                      c:T.goldDk },
          ].map((s, i) => (
            <div key={s.l} style={{ background:T.card, borderRadius:12, padding:"14px 10px",
              textAlign:"center", border:`1px solid ${T.border}`,
              animation:`fadeUp .5s ease ${i*0.07}s both` }}>
              <div style={{ display:"flex", justifyContent:"center" }}>
                <GCircle emoji={s.e} size={36} />
              </div>
              <div style={{ fontSize:"1.6rem", fontWeight:800, color:s.c,
                fontFamily:"'Playfair Display',Georgia,serif",
                lineHeight:1, margin:"8px 0 4px" }}>{s.v}</div>
              <div style={{ fontSize:"0.48rem", color:T.sub,
                letterSpacing:"0.12em", textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}``

      {/* ══ AUTO-SCROLL TICKER STRIP ══ */}
      <ScrollStrip news={filtered} loading={loading} />

      {/* ══ MAIN CONTENT ══ */}
      <main style={{ flex:1, maxWidth:1440, width:"100%", margin:"0 auto",
        padding:"24px clamp(16px,4vw,56px) 60px" }}>
        <div className="main-grid" style={{ display:"grid",
          gridTemplateColumns:"1fr 280px", gap:20, alignItems:"start" }}>

          {/* LEFT */}
          <div>
            {loading ? (
              <div className="card-grid" style={{ display:"grid",
                gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ borderRadius:16, height:300,
                    background:"linear-gradient(90deg,#F5F2EC 25%,#EDEAE3 50%,#F5F2EC 75%)",
                    backgroundSize:"400% 100%",
                    animation:`spin 1.8s linear infinite`,
                    border:`1px solid ${T.border}` }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 24px",
                background:T.card, borderRadius:20, border:`1px solid ${T.border}` }}>
                <GCircle emoji="🔍" size={56} />
                <p style={{ marginTop:14, color:T.sub, fontSize:"0.95rem" }}>
                  No stories found for <strong>"{search || tab}"</strong>
                </p>
              </div>
            ) : (
              <>
                {hero && <HeroCard item={hero} />}

                <SectionHd emoji="⚡" label="Latest Stories" />

                <div className="card-grid" style={{ display:"grid",
                  gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                  {featured.map((item, i) => (
                    <NewsCard key={item.id} item={item} index={i} delay={i * 0.06} />
                  ))}
                </div>

                {more.length > 0 && (
                  <div style={{ marginTop:28 }}>
                    <SectionHd emoji="📋" label="More Stories" />
                    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      {more.map((item, i) => <ListRow key={item.id} item={item} index={i} />)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar-col" style={{ position:"sticky", top:16,
            display:"flex", flexDirection:"column", gap:14 }}>
            <SourcePanel news={allNews} />
            <TopicsPanel onSearch={setSearch} active={search} />
            <AboutPanel />
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background:T.card, borderTop:`1px solid ${T.border}`,
        padding:"18px clamp(16px,4vw,56px)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <GCircle emoji="🏙️" size={32} />
          <div>
            <p style={{ fontSize:"0.57rem", color:T.sub }}>Telugu States Real Estate · Growth &amp; Development News</p>
            <p style={{ fontSize:"0.5rem", color:T.faint, marginTop:2 }}>
              ET Realty · Google News India · Auto-refreshes every 10 min
            </p>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:T.green,
            animation:"blink 2s infinite", display:"inline-block" }} />
          <span style={{ fontSize:"0.53rem", color:T.sub }}>Live · {updated}</span>
        </div>
      </footer>
    </div>
  );
}