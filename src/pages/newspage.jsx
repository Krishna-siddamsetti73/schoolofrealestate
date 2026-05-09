import { useEffect, useState, useRef, useCallback } from "react";

// ── Site theme: matches your white/navy/gold production site ──
const T = {
  bg:       "#F1F5F9",   // page background (light slate)
  paper:    "#FFFFFF",   // card/header background
  card:     "#FFFFFF",
  border:   "#E2E8F0",   // subtle border
  rule:     "#1E3A8A",   // navy — primary brand colour
  text:     "#1E293B",   // near-black body text
  sub:      "#475569",   // secondary text
  faint:    "#94A3B8",   // muted/timestamp text
  gold:     "#D4A017",   // gold accent (buttons, highlights)
  goldDk:   "#B8860B",   // darker gold for hover
  goldBg:   "#FEF9EC",   // gold tint bg
  navy:     "#1E3A8A",   // primary navy
  navyBg:   "#EFF6FF",   // light navy tint
  navyDk:   "#172554",   // dark navy hover
  green:    "#15803D",
  greenBg:  "#F0FDF4",
  tel:      "#1E3A8A",
  telBg:    "#EFF6FF",
  ap:       "#9F1239",
  apBg:     "#FFF1F2",
  telugu:   "#6D28D9",
  teluguBg: "#F5F3FF",
  et:       "#0E7490",
  etBg:     "#ECFEFF",
  grad:     "linear-gradient(135deg, #D4A017 0%, #1E3A8A 100%)",
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

/* ── Region Pill Tag ── */
function Dateline({ source, region }) {
  const rs = regionStyle(region, source);
  return (
    <span style={{
      display:"inline-block", padding:"2px 10px",
      background:rs.background, color:rs.color,
      fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.1em",
      textTransform:"uppercase", borderRadius:4,
      fontFamily:"'Inter',system-ui,sans-serif",
    }}>
      {source}
    </span>
  );
}

/* ── Ticker Strip ── */
function ScrollStrip({ news, loading }) {
  const trackRef  = useRef(null);
  const pausedRef = useRef(false);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);
  const SPEED     = 0.55;

  useEffect(() => {
    const el = trackRef.current;
    if (!el || loading || !news.length) return;
    const start = () => {
      const inner = el.querySelector(".ticker-inner");
      if (!inner) return;
      const totalW = inner.scrollWidth / 2;
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
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(rafRef.current); };
  }, [news, loading]);

  const doubled = [...news.slice(0,14), ...news.slice(0,14)];

  return (
    <div style={{
      background: T.navy, height:44, display:"flex",
      alignItems:"stretch", overflow:"hidden", position:"relative",
      borderBottom:`1px solid ${T.border}`,
    }}>
      {/* BREAKING label */}
      <div style={{
        flexShrink:0, background:T.gold, display:"flex",
        alignItems:"center", gap:7, padding:"0 16px", zIndex:2,
      }}>
        <span style={{
          width:7, height:7, borderRadius:"50%", background:"#fff",
          animation:"blink 1s infinite", display:"inline-block",
        }} />
        <span style={{
          fontSize:"0.58rem", fontWeight:800, letterSpacing:"0.22em",
          color:"#1A1A1A", textTransform:"uppercase", whiteSpace:"nowrap",
          fontFamily:"'Inter',system-ui,sans-serif",
        }}>
          Breaking
        </span>
      </div>

      <div ref={trackRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"center" }}>
        {loading || !news.length ? (
          <span style={{ paddingLeft:16, color:"#94A3B8", fontSize:"0.75rem" }}>Loading…</span>
        ) : (
          <div className="ticker-inner"
            style={{ display:"flex", alignItems:"center", width:"max-content", willChange:"transform" }}>
            {doubled.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"inline-flex", alignItems:"center", gap:10,
                  padding:"0 22px", borderRight:`1px solid rgba(255,255,255,0.12)`,
                  textDecoration:"none", whiteSpace:"nowrap",
                }}>
                <span style={{ color:T.gold, fontSize:"0.58rem", fontWeight:700,
                  letterSpacing:"0.08em", fontFamily:"'Inter',system-ui,sans-serif" }}>
                  {item.source.toUpperCase()}
                </span>
                <span style={{
                  color:"#E2E8F0", fontSize:"0.8rem",
                  fontFamily:"'Inter',system-ui,sans-serif",
                  fontWeight:400, letterSpacing:"0.01em",
                }}>
                  {item.title}
                </span>
                <span style={{ color:"#64748B", fontSize:"0.58rem",
                  fontFamily:"'Inter',system-ui,sans-serif" }}>{ago(item.pubDate)}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div style={{ position:"absolute", left:108, top:0, bottom:0, width:28,
        background:`linear-gradient(to right, ${T.navy}, transparent)`, zIndex:1, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:28,
        background:`linear-gradient(to left, ${T.navy}, transparent)`, zIndex:1, pointerEvents:"none" }} />
    </div>
  );
}

/* ── Hero Card — clean modern card matching site style ── */
function HeroCard({ item }) {
  const [err, setErr] = useState(false);
  const [hov, setHov] = useState(false);
  const rs = regionStyle(item.region, item.source);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:T.card, borderRadius:16, overflow:"hidden",
        border:`1px solid ${T.border}`, marginBottom:20,
        display:"grid", gridTemplateColumns:"1.3fr 1fr",
        boxShadow: hov ? "0 8px 32px rgba(30,58,138,0.10)" : "0 2px 12px rgba(0,0,0,0.06)",
        transition:"box-shadow .3s",
      }}>

      {/* Image */}
      <div style={{ position:"relative", minHeight:320, overflow:"hidden" }}>
        <img src={err ? IMGS[0] : item.image} alt={item.title}
          onError={() => setErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0,
            transform: hov ? "scale(1.04)" : "scale(1)", transition:"transform .6s ease" }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(135deg,rgba(30,58,138,0.18) 0%,transparent 60%)" }} />
        <div style={{ position:"absolute", top:14, left:14 }}>
          <Dateline source={item.region} region={item.region} />
        </div>
        <div style={{ position:"absolute", bottom:14, left:14,
          background:T.greenBg, padding:"4px 10px", borderRadius:8,
          display:"flex", alignItems:"center", gap:5,
          border:`1px solid #BBF7D0` }}>
          <span style={{ fontSize:11 }}>📈</span>
          <span style={{ fontSize:"0.6rem", fontWeight:700, color:T.green,
            letterSpacing:"0.06em", textTransform:"uppercase",
            fontFamily:"'Inter',system-ui,sans-serif" }}>Growth Story</span>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding:"28px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.2em",
              textTransform:"uppercase", color:T.gold,
              fontFamily:"'Inter',system-ui,sans-serif" }}>Top Story</span>
            <span style={{ fontSize:"0.6rem", color:T.faint,
              fontFamily:"'Inter',system-ui,sans-serif" }}>· {ago(item.pubDate)}</span>
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"1.25rem", fontWeight:700, lineHeight:1.5,
            color: hov ? T.navy : T.text, marginBottom:12, transition:"color .25s",
          }}>
            {item.title}
          </h2>
          <Dateline source={item.source} region={item.region} />
        </div>
        <a href={item.link} target="_blank" rel="noopener noreferrer"
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            marginTop:20, padding:"10px 22px", background:T.grad,
            borderRadius:50, fontSize:"0.62rem", fontWeight:700,
            letterSpacing:"0.12em", textTransform:"uppercase",
            color:"#fff", textDecoration:"none", alignSelf:"flex-start",
            fontFamily:"'Inter',system-ui,sans-serif",
            boxShadow:"0 4px 14px rgba(212,160,23,0.3)",
          }}>
          Read Full Story →
        </a>
      </div>
    </div>
  );
}

/* ── News Card — matches site card style ── */
function ColCard({ item, index, wide }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:T.card, borderRadius:12, overflow:"hidden",
        border:`1px solid ${T.border}`, marginBottom:14,
        boxShadow: hov ? "0 8px 24px rgba(30,58,138,0.10)" : "0 1px 6px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-3px)" : "none",
        transition:"all .3s cubic-bezier(0.22,1,0.36,1)",
        animation:`fadeUp .5s ease ${index*0.07}s both`,
      }}>
      {wide && (
        <div style={{ overflow:"hidden", height:160 }}>
          <img src={err ? IMGS[index%IMGS.length] : item.image} alt={item.title}
            onError={() => setErr(true)}
            style={{ width:"100%", height:"100%", objectFit:"cover",
              transform: hov ? "scale(1.05)" : "scale(1)", transition:"transform .6s", display:"block" }} />
        </div>
      )}
      <div style={{ padding:"14px 14px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <Dateline source={item.source} region={item.region} />
          <span style={{ fontSize:"0.6rem", color:T.faint,
            fontFamily:"'Inter',system-ui,sans-serif" }}>{ago(item.pubDate)}</span>
        </div>
        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
          <h3 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize: wide ? "1rem" : "0.88rem",
            fontWeight:700, lineHeight:1.5,
            color: hov ? T.navy : T.text, marginBottom:10, transition:"color .2s",
            display:"-webkit-box", WebkitLineClamp: wide ? 3 : 2,
            WebkitBoxOrient:"vertical", overflow:"hidden",
          }}>
            {item.title}
          </h3>
        </a>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:4,
            background:T.greenBg, padding:"2px 8px", borderRadius:6,
            border:`1px solid #BBF7D0` }}>
            <span style={{ fontSize:10 }}>📈</span>
            <span style={{ fontSize:"0.55rem", fontWeight:700, color:T.green,
              letterSpacing:"0.06em", textTransform:"uppercase",
              fontFamily:"'Inter',system-ui,sans-serif" }}>Growth</span>
          </span>
          <a href={item.link} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:"0.62rem", fontWeight:700, textDecoration:"none",
              color: hov ? T.navy : T.gold, transition:"color .2s",
              fontFamily:"'Inter',system-ui,sans-serif" }}>
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Brief Row ── */
function Brief({ item, index }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", gap:12, padding:"12px 0",
        borderBottom:`1px solid ${T.border}`, textDecoration:"none",
        animation:`fadeUp .4s ease ${index*0.05}s both`,
      }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5, flexWrap:"wrap" }}>
          <Dateline source={item.source} region={item.region} />
          <span style={{ fontSize:"0.58rem", color:T.faint,
            fontFamily:"'Inter',system-ui,sans-serif" }}>· {ago(item.pubDate)}</span>
        </div>
        <p style={{
          fontFamily:"'Playfair Display',Georgia,serif",
          fontSize:"0.88rem", lineHeight:1.5,
          color: hov ? T.navy : T.text, transition:"color .2s",
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>
          {item.title}
        </p>
      </div>
    </a>
  );
}

/* ── Section Divider ── */
function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0, margin:"24px 0 16px" }}>
      <div style={{ flex:1, height:2, background:T.navy }} />
      <span style={{
        fontFamily:"'Inter',system-ui,sans-serif",
        fontSize:"0.62rem", fontWeight:800, letterSpacing:"0.22em",
        textTransform:"uppercase", color:"#fff",
        background:T.navy, padding:"5px 16px",
        borderRadius:"0 0 6px 6px",
      }}>
        {label}
      </span>
      <div style={{ flex:1, height:2, background:T.navy }} />
    </div>
  );
}

/* ══ MAIN PAGE ══ */
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
  const col1     = filtered.slice(1, 4);
  const col2     = filtered.slice(4, 7);
  const col3     = filtered.slice(7, 10);
  const briefs   = filtered.slice(10, 20);
  const moreList = filtered.slice(20);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  return (
    <div style={{
      background:T.bg, minHeight:"100vh",
      fontFamily:"'Inter',system-ui,-apple-system,sans-serif", color:T.text,
      display:"flex", flexDirection:"column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width:4px; background:#F1F5F9; }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:4px; }
        input::placeholder { color: #94A3B8; }

        @media(max-width:1100px) {
          .np-grid   { grid-template-columns:1fr !important; }
          .np-sidebar{ display:none !important; }
        }
        @media(max-width:720px) {
          .np-cols      { grid-template-columns:1fr !important; }
          .hero-split   { grid-template-columns:1fr !important; }
          .tab-bar      { overflow-x:auto; }
          .tab-btn      { flex-shrink:0; }
          .brief-grid   { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══ HEADER ══ */}
      <header style={{
        background:T.paper, padding:"0 clamp(16px,4vw,56px)",
        borderBottom:`1px solid ${T.border}`,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Top utility bar */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"10px 0", borderBottom:`1px solid ${T.border}`,
          flexWrap:"wrap", gap:8,
        }}>
          <span style={{ fontSize:"0.7rem", color:T.faint, fontWeight:500 }}>
            {today}
          </span>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ position:"relative" }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search news…"
                style={{
                  padding:"7px 12px 7px 32px", background:T.bg,
                  border:`1.5px solid ${T.border}`, borderRadius:8,
                  color:T.text, fontSize:"0.78rem", outline:"none",
                  fontFamily:"'Inter',system-ui,sans-serif", width:200,
                  transition:"border-color .2s",
                }}
                onFocus={e => e.target.style.borderColor = T.navy}
                onBlur={e  => e.target.style.borderColor = T.border} />
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13 }}>🔍</span>
            </div>
            <button onClick={() => fetchAll(true)}
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"7px 16px", background:T.navy, border:"none",
                borderRadius:8, color:"#fff", cursor:"pointer",
                fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.06em",
                fontFamily:"'Inter',system-ui,sans-serif",
                transition:"background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.navyDk}
              onMouseLeave={e => e.currentTarget.style.background = T.navy}>
              <span style={{ fontSize:12, display:"inline-block",
                animation: refreshing ? "spin .7s linear infinite" : "none" }}>↻</span>
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:T.green,
              animation:"blink 2s infinite", display:"inline-block" }} />
            <span style={{ fontSize:"0.66rem", color:T.faint, fontWeight:500 }}>
              {filtered.length} stories · {updated}
            </span>
          </div>
        </div>

        {/* Site title */}
        <div style={{ padding:"16px 0 14px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{
            width:44, height:44, borderRadius:12, background:T.grad,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0,
          }}>🏙️</div>
          <div>
            <h1 style={{
              fontFamily:"'Playfair Display',Georgia,serif",
              fontSize:"clamp(1.3rem,3vw,1.9rem)", fontWeight:800,
              color:T.text, lineHeight:1.1, letterSpacing:"-0.02em",
            }}>
              Telugu States Property
            </h1>
            <p style={{ fontSize:"0.68rem", color:T.sub, marginTop:3, fontWeight:500 }}>
              Real Estate News · Telangana &amp; Andhra Pradesh
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="tab-bar" style={{
          display:"flex", borderTop:`1px solid ${T.border}`,
        }}>
          {TABS.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)}
              style={{
                padding:"10px 20px", fontSize:"0.68rem", fontWeight:700,
                letterSpacing:"0.1em", textTransform:"uppercase",
                background:"transparent", border:"none", cursor:"pointer",
                fontFamily:"'Inter',system-ui,sans-serif",
                color: tab === t ? T.navy : T.sub,
                borderBottom: tab === t ? `2.5px solid ${T.gold}` : "2.5px solid transparent",
                transition:"all .2s", whiteSpace:"nowrap",
              }}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* ══ TICKER ══ */}
      <ScrollStrip news={filtered} loading={loading} />

      {/* ══ MAIN CONTENT ══ */}
      <main style={{
        flex:1, maxWidth:1440, width:"100%", margin:"0 auto",
        padding:"24px clamp(16px,4vw,56px) 60px",
      }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:T.faint, fontSize:"1rem",
            fontFamily:"'Inter',system-ui,sans-serif" }}>
            Loading latest stories…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color:T.sub }}>
              No dispatches found for <em>"{search || tab}"</em>
            </p>
          </div>
        ) : (
          <div className="np-grid" style={{
            display:"grid", gridTemplateColumns:"1fr 240px",
            gap:28, alignItems:"start",
          }}>
            {/* ── MAIN COLUMN ── */}
            <div>
              {/* Front Page Hero */}
              {hero && <HeroCard item={hero} />}

              {/* 3-column grid */}
              <Divider label="Latest Dispatches" />
              <div className="np-cols" style={{
                display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                gap:"0 24px",
              }}>
                {[col1, col2, col3].map((col, ci) => (
                  <div key={ci} style={{ borderRight: ci < 2 ? `1px solid ${T.border}` : "none", paddingRight: ci < 2 ? 24 : 0 }}>
                    {col.map((item, i) => (
                      <ColCard key={item.id} item={item} index={i + ci*3} wide={i === 0} />
                    ))}
                  </div>
                ))}
              </div>

              {/* More stories – compact list */}
              {briefs.length > 0 && (
                <>
                  <Divider label="More From Our Correspondents" />
                  <div className="brief-grid" style={{
                    display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0 32px",
                  }}>
                    {briefs.map((item, i) => (
                      <Brief key={item.id} item={item} index={i} />
                    ))}
                  </div>
                </>
              )}

              {moreList.length > 0 && (
                <>
                  <Divider label="Continued" />
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0 32px" }}>
                    {moreList.map((item, i) => (
                      <Brief key={item.id} item={item} index={i} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="np-sidebar" style={{
              position:"sticky", top:16,
              display:"flex", flexDirection:"column", gap:16,
            }}>
              {/* Sources panel */}
              <div style={{ background:T.card, borderRadius:14, padding:18,
                border:`1px solid ${T.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{
                  fontFamily:"'Inter',system-ui,sans-serif", fontSize:"0.66rem",
                  fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase",
                  color:T.sub, borderBottom:`2px solid ${T.navy}`,
                  paddingBottom:8, marginBottom:14, display:"flex", alignItems:"center", gap:8,
                }}>
                  <span>📡</span> Sources
                </div>
                {FEEDS.map(f => {
                  const count = allNews.filter(n => n.source === f.label).length;
                  const pct = allNews.length ? Math.round((count/allNews.length)*100) : 0;
                  return (
                    <div key={f.label} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:"0.72rem", fontWeight:700, color:f.color,
                          fontFamily:"'Inter',system-ui,sans-serif" }}>{f.label}</span>
                        <span style={{ fontSize:"0.66rem", color:T.sub,
                          fontFamily:"'Inter',system-ui,sans-serif" }}>{count}</span>
                      </div>
                      <div style={{ height:4, background:T.bg, borderRadius:6, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:T.grad,
                          borderRadius:6, transition:"width 1s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick search panel */}
              <div style={{ background:T.card, borderRadius:14, padding:18,
                border:`1px solid ${T.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{
                  fontFamily:"'Inter',system-ui,sans-serif", fontSize:"0.66rem",
                  fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase",
                  color:T.sub, borderBottom:`2px solid ${T.navy}`,
                  paddingBottom:8, marginBottom:14, display:"flex", alignItems:"center", gap:8,
                }}>
                  <span>🔍</span> Quick Search
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {TOPICS.map(t => (
                    <button key={t} onClick={() => setSearch(search === t ? "" : t)}
                      style={{
                        padding:"5px 11px", fontSize:"0.65rem",
                        border:`1.5px solid ${search === t ? T.navy : T.border}`,
                        background: search === t ? T.navy : "transparent",
                        color: search === t ? "#fff" : T.sub,
                        cursor:"pointer", borderRadius:7,
                        fontFamily:"'Inter',system-ui,sans-serif",
                        fontWeight:600, transition:"all .2s",
                      }}
                      onMouseEnter={e => { if(search!==t){ e.currentTarget.style.borderColor=T.navy; e.currentTarget.style.color=T.navy; }}}
                      onMouseLeave={e => { if(search!==t){ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.sub; }}}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* About panel */}
              <div style={{ background:T.navy, borderRadius:14, padding:18,
                boxShadow:"0 4px 16px rgba(30,58,138,0.2)" }}>
                <p style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"0.82rem", fontStyle:"italic",
                  lineHeight:1.7, color:"#BFDBFE",
                }}>
                  "Covering the growth and transformation of real estate across Telangana
                  and Andhra Pradesh — for investors, homebuyers, and the Telugu community."
                </p>
                <div style={{ marginTop:12, borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:10 }}>
                  <span style={{ fontSize:"0.58rem", color:"#64748B", letterSpacing:"0.06em",
                    fontFamily:"'Inter',system-ui,sans-serif" }}>
                    Auto-refreshes every 10 min · ET Realty · Google News India
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background:T.navy, color:"#94A3B8",
        padding:"18px clamp(16px,4vw,56px)",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:10,
        borderTop:`3px solid ${T.gold}`,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:T.grad,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏙️</div>
          <div>
            <p style={{ fontSize:"0.7rem", color:"#CBD5E1", fontWeight:600,
              fontFamily:"'Inter',system-ui,sans-serif" }}>Telugu States Property</p>
            <p style={{ fontSize:"0.6rem", color:"#64748B", marginTop:2,
              fontFamily:"'Inter',system-ui,sans-serif" }}>
              ET Realty · Google News India · Auto-refreshes every 10 min
            </p>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:T.green,
            animation:"blink 2s infinite", display:"inline-block" }} />
          <span style={{ fontSize:"0.66rem", color:"#94A3B8",
            fontFamily:"'Inter',system-ui,sans-serif" }}>Live · {updated}</span>
        </div>
      </footer>
    </div>
  );
}