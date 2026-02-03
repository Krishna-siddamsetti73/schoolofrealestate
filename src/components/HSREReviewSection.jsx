import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TESTIMONIALS = [
  {
    name: "Sai Kiran",
    role: "Student",
    place: "Hyderabad",
    text: "Excellent course — practical site visits and real Hyderabad market insights.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Krishna",
    role: "Student",
    place: "Gachibowli",
    text: "Clear understanding of DTCP, RERA, layouts, and real estate investing.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Harsha",
    role: "Alumni",
    place: "Kukatpally",
    text: "This training helped me start my real estate career with confidence!",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Rajesh",
    role: "Student",
    place: "Madhapur",
    text: "Outstanding mentorship and hands-on experience with property deals.",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Priya",
    role: "Investor",
    place: "Hitech City",
    text: "The course gave me the expertise to identify and invest in properties wisely.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

export default function HSREReviewSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [rotation, setRotation] = useState(0);
  const [muted, setMuted] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [pauseRotation, setPauseRotation] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const step = 360 / TESTIMONIALS.length;

  /* ================= VIDEO VISIBILITY ================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
          setMuted(true);
          setHasAnimated(true);
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= ROTATION ================= */
  useEffect(() => {
    if (pauseRotation) return;
    const id = setInterval(() => {
      setRotation((r) => r - step);
    }, 3000);
    return () => clearInterval(id);
  }, [pauseRotation, step]);

  return (
    <>
      {/* ===== SEO STRUCTURED DATA ===== */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hsre.co.in"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Student Reviews",
                    "item": "https://hsre.co.in/#student-reviews"
                  }
                ]
              },
              {
                "@type": "Course",
                "name": "Hyderabad Real Estate Training Course",
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "Hyderabad School of Real Estate",
                  "sameAs": "https://hsre.co.in"
                },
                "description":
                  "Professional real estate certification training including DTCP, RERA, property investment, and practical site visits."
              },
              {
                "@type": "LocalBusiness",
                "name": "Hyderabad School of Real Estate",
                "url": "https://hsre.co.in",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hyderabad",
                  "addressCountry": "India"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": TESTIMONIALS.map((t) => ({
                  "@type": "Question",
                  "name": "What do students say about Hyderabad School of Real Estate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.text
                  }
                }))
              }
            ]
          })}
        </script>
      </Helmet>

      {/* ===== SECTION ===== */}
      <section
        id="student-reviews"
        ref={sectionRef}
        aria-labelledby="student-review-heading"
        className="relative flex flex-col items-center justify-around gap-20 px-6 py-20 lg:flex-row lg:px-16 overflow-hidden bg-white"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017),
                linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017)
              `,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 30px 30px",
            }}
          />
        </div>

        {/* ================= VIDEO ================= */}
        <figure
          className="relative mx-auto w-full max-w-[420px]"
          aria-label="Student review video about Hyderabad real estate training"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onTouchStart={() => setShowControls(true)}
        >
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <defs>
              <path
                id="blobPath"
                d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
                transform="translate(100 100)"
              />
              <clipPath id="blobClip">
                <use href="#blobPath" />
              </clipPath>
            </defs>

            <foreignObject x="0" y="0" width="200" height="200" clipPath="url(#blobClip)">
              <video
                ref={videoRef}
                src="/videos/reviews.webm"
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                aria-label="HSRE student testimonial video"
              />
            </foreignObject>
          </svg>

          {/* MUTE BUTTON */}
          <button
            aria-label={muted ? "Unmute video" : "Mute video"}
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
            className={`absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-xl bg-white/30 border border-white/30 shadow-xl flex items-center justify-center transition-all duration-300 ${showControls ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </figure>

        {/* ================= TEXT & REVIEWS ================= */}
        <article className="relative z-10 flex flex-col justify-center w-full max-w-xl">
          <header>
            <h2
              id="student-review-heading"
              className="text-3xl font-bold lg:text-4xl"
            >
              Voices of Our Students
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hyderabad School of Real Estate student testimonials and success stories
            </p>
          </header>

          {/* ROTATING REVIEWS */}
          <div
            className="relative h-[380px] overflow-hidden"
            role="list"
            aria-label="Student testimonial reviews"
            onMouseEnter={() => setPauseRotation(true)}
            onMouseLeave={() => setPauseRotation(false)}
          >
            {TESTIMONIALS.map((t, i) => {
              const angle = rotation + i * step;
              const rad = (angle * Math.PI) / 180;

              const x = Math.sin(rad) * 180;
              const y = Math.cos(rad) * 100;
              const scale = Math.cos(rad) * 0.35 + 0.65;
              const zIndex = Math.round(scale * 90);

              return (
                <article
                  key={i}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Review"
                  className="absolute left-1/2 top-1/2 w-[260px] rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 p-4 text-center shadow-xl transition-all duration-700"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${hasAnimated ? scale : 0.3})`,
                    opacity: hasAnimated ? 1 : 0,
                    zIndex,
                    marginTop: -30
                  }}
                >
                  <img
                    src={t.avatar}
                    alt={`${t.name} HSRE Student`}
                    loading="lazy"
                    itemProp="image"
                    className="mx-auto mb-2 h-12 w-12 rounded-full border border-white/40"
                  />

                  <div className="text-sm font-semibold" itemProp="author">
                    {t.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.place}
                  </div>

                  <div className="mt-1 text-yellow-400">★★★★★</div>

                  <p className="mt-2 text-sm text-gray-800" itemProp="reviewBody">
                    “{t.text}”
                  </p>
                </article>
              );
            })}
          </div>
        </article>
      </section>
    </>
  );
}
