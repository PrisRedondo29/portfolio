import { useRef, useState, useEffect } from "react";

/* ─── Constants (identical to reference) ──────────────────────────────────── */
const ORBIT_R      = 230;
const CARD_W       = 192;
const CARD_H       = 108;
const TITLE_H      = 28;
const IDLE_SPD     = 0.22;
const MAX_SPD      = 16;
const FAST_FRAMES  = 60;
const DECEL_FRAMES = 72;

/**
 * OrbitalRoulette
 * Props:
 *  - projects           : array of { id, shortTitle, image, title }
 *  - onProjectSelected  : (project) => void  — called when spin resolves or card clicked
 */
export default function OrbitalRoulette({ projects, onProjectSelected }) {
  const N = projects.length;

  /* ── React state — only drives CSS visual changes ── */
  const [phase,      setPhase]      = useState("rotating");
  const [hoveredId,  setHoveredId]  = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  /* ── Stable refs so the RAF loop never needs to re-run ── */
  const projectsRef          = useRef(projects);
  const onProjectSelectedRef = useRef(onProjectSelected);
  useEffect(() => { projectsRef.current          = projects;          }, [projects]);
  useEffect(() => { onProjectSelectedRef.current = onProjectSelected; }, [onProjectSelected]);

  /* ── Animation refs ── */
  const angleRef     = useRef(0);
  const speedRef     = useRef(IDLE_SPD);
  const rafRef       = useRef(0);
  const pausedRef    = useRef(false);
  const cardPosRefs  = useRef([]);

  /* ── Spin state-machine refs ── */
  const spinPhaseRef   = useRef("idle");
  const fastFrameRef   = useRef(0);
  const decelFrameRef  = useRef(0);
  const decelStartRef  = useRef(0);
  const targetAngleRef = useRef(0);
  const selectedIdRef  = useRef(null);
  const phaseRef       = useRef("rotating");
  const NRef           = useRef(N);
  useEffect(() => { NRef.current = N; }, [N]);

  /* ── Responsive scale ── */
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const resize = () => {
      const available = Math.min(window.innerWidth - 32, 720);
      setScale(available / 720);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── RAF loop — runs ONCE on mount, updates DOM directly ── */
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        const sp = spinPhaseRef.current;
        const n  = NRef.current;

        if (sp === "idle") {
          angleRef.current += speedRef.current;

        } else if (sp === "fast") {
          speedRef.current = Math.min(speedRef.current + 0.55, MAX_SPD);
          angleRef.current += speedRef.current;
          fastFrameRef.current += 1;

          if (fastFrameRef.current >= FAST_FRAMES) {
            spinPhaseRef.current  = "decelerating";
            decelFrameRef.current = 0;
            decelStartRef.current = angleRef.current;

            /* Target: chosen card lands at 270° (12-o'clock) */
            const sel  = selectedIdRef.current ?? 0;
            const base = 270 - (sel * 360) / n;
            let target = base;
            while (target <= angleRef.current + 200) target += 360;
            targetAngleRef.current = target;
          }

        } else if (sp === "decelerating") {
          decelFrameRef.current += 1;
          const t     = decelFrameRef.current / DECEL_FRAMES;
          const eased = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
          angleRef.current =
            decelStartRef.current +
            (targetAngleRef.current - decelStartRef.current) * eased;

          if (decelFrameRef.current >= DECEL_FRAMES) {
            angleRef.current     = targetAngleRef.current;
            spinPhaseRef.current = "idle";
            speedRef.current     = 0;

            const sel  = selectedIdRef.current;
            const proj = projectsRef.current;

            setSelectedId(sel);
            setPhase("loading");
            phaseRef.current = "loading";

            /* Show "Abriendo..." badge briefly, then open modal */
            setTimeout(() => {
              if (proj[sel]) {
                onProjectSelectedRef.current(proj[sel]);
              }

              setTimeout(() => {
                speedRef.current      = IDLE_SPD;
                pausedRef.current     = false;
                selectedIdRef.current = null;
                setSelectedId(null);
                setPhase("rotating");
                phaseRef.current = "rotating";
              }, 500);
            }, 1200);
          }
        }
      }

      /* Update each card's orbital position directly in DOM */
      cardPosRefs.current.forEach((el, i) => {
        if (!el) return;
        const n   = NRef.current || 1;
        const rad = ((angleRef.current + (i * 360) / n) * Math.PI) / 180;
        const x   = Math.cos(rad) * ORBIT_R;
        const y   = Math.sin(rad) * ORBIT_R;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Handlers ── */
  const handleSpin = () => {
    const ph = phaseRef.current;
    if (ph === "spinning" || ph === "loading" || NRef.current === 0) return;

    const randomCard = Math.floor(Math.random() * NRef.current);
    selectedIdRef.current = randomCard;
    spinPhaseRef.current  = "fast";
    fastFrameRef.current  = 0;
    speedRef.current      = IDLE_SPD;
    pausedRef.current     = false;

    setPhase("spinning");
    phaseRef.current = "spinning";
    setHoveredId(null);
  };

  const handleCardClick = (project) => {
    if (phaseRef.current === "spinning" || phaseRef.current === "loading") return;
    onProjectSelected(project);
  };

  const handleEnter = (id) => {
    if (phaseRef.current === "spinning" || phaseRef.current === "loading") return;
    pausedRef.current = true;
    setHoveredId(id);
    setPhase("card_active");
    phaseRef.current = "card_active";
  };

  const handleLeave = () => {
    if (phaseRef.current === "spinning" || phaseRef.current === "loading") return;
    pausedRef.current = false;
    setHoveredId(null);
    setPhase("rotating");
    phaseRef.current = "rotating";
  };

  const handleTouchStart = (id) => {
    if (phaseRef.current === "spinning" || phaseRef.current === "loading") return;
    pausedRef.current = true;
    setHoveredId(id);
    setPhase("card_active");
    phaseRef.current = "card_active";
  };

  const handleTouchEnd = () => {
    if (phaseRef.current === "spinning" || phaseRef.current === "loading") return;
    pausedRef.current = false;
    setHoveredId(null);
    setPhase("rotating");
    phaseRef.current = "rotating";
  };

  /* ── Render ── */
  const isInteractive = phase !== "spinning" && phase !== "loading";
  const anyHovered    = hoveredId !== null;
  const STAGE         = 720;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="flex flex-col items-center select-none">

      {/* Outer wrapper — shrinks to viewport width while keeping aspect ratio */}
      <div style={{ width: STAGE * scale, height: STAGE * scale, flexShrink: 0 }}>
        <div
          style={{
            width:           STAGE,
            height:          STAGE,
            transform:       `scale(${scale})`,
            transformOrigin: "top left",
            position:        "relative",
          }}
        >

          {/* ── Orbit rings SVG ── */}
          <svg
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            width={STAGE}
            height={STAGE}
          >
            <circle cx="360" cy="360" r={ORBIT_R}      fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx="360" cy="360" r={ORBIT_R + 68} fill="none" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
            <circle cx="360" cy="360" r={ORBIT_R - 68} fill="none" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
            <circle
              cx="360"
              cy={360 - ORBIT_R}
              r="3"
              fill={phase === "spinning" || phase === "loading" ? "rgba(99,102,241,0.7)" : "rgba(99,102,241,0.25)"}
              style={{ transition: "fill 0.4s ease" }}
            />
          </svg>

          {/* ── Cards container ── */}
          <div
            style={{
              position: "absolute",
              inset:    0,
            }}
          >
            {projects.map((project, i) => {
              const isHovered  = hoveredId  === i;
              const isSelected = selectedId === i;

              let opacity = 1;
              if (anyHovered && !isHovered)           opacity = 0.42;
              if (phase === "loading" && !isSelected) opacity = 0.28;

              const glow = isSelected
                ? "0 0 32px rgba(99,102,241,0.65), 0 0 64px rgba(99,102,241,0.28)"
                : isHovered
                ? "0 0 20px rgba(129,140,248,0.5),  0 0 40px rgba(99,102,241,0.2)"
                : "0 4px 20px rgba(0,0,0,0.55)";

              const borderColor = isSelected
                ? "rgba(99,102,241,0.9)"
                : isHovered
                ? "rgba(129,140,248,0.75)"
                : "rgba(255,255,255,0.07)";

              /* Initial position for initial render before RAF ticks */
              const initRad = ((angleRef.current + (i * 360) / (N || 1)) * Math.PI) / 180;
              const initX   = Math.cos(initRad) * ORBIT_R;
              const initY   = Math.sin(initRad) * ORBIT_R;

              return (
                <div
                  key={project.id}
                  ref={(el) => { cardPosRefs.current[i] = el; }}
                  style={{
                    position:   "absolute",
                    left:       "50%",
                    top:        "50%",
                    width:      CARD_W,
                    height:     CARD_H + TITLE_H,
                    marginLeft: -(CARD_W / 2),
                    marginTop:  -((CARD_H + TITLE_H) / 2),
                    transform:  `translate(${initX}px, ${initY}px)`,
                    zIndex:     isHovered || isSelected ? 20 : 5,
                    cursor:     isInteractive ? "pointer" : "default",
                  }}
                  onClick={() => handleCardClick(project)}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                  onTouchStart={(e) => { e.preventDefault(); handleTouchStart(i); }}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    style={{
                      transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
                      transform:  isHovered || isSelected ? "scale(1.12)" : "scale(1)",
                      opacity,
                      userSelect: "none",
                    }}
                  >
                    {/* Image card */}
                    <div
                      style={{
                        width:        CARD_W,
                        height:       CARD_H,
                        borderRadius: 12,
                        overflow:     "hidden",
                        border:       `1px solid ${borderColor}`,
                        boxShadow:    glow,
                        transition:   "border-color 0.25s ease, box-shadow 0.3s ease",
                        position:     "relative",
                        background:   "#1a1b24",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.shortTitle ?? project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        draggable={false}
                      />
                      <div
                        style={{
                          position:      "absolute",
                          inset:         0,
                          background:    "linear-gradient(to bottom, rgba(7,8,13,0.0) 30%, rgba(7,8,13,0.55) 100%)",
                          pointerEvents: "none",
                        }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position:      "absolute",
                            inset:         -4,
                            borderRadius:  15,
                            border:        "2px solid rgba(99,102,241,0.75)",
                            animation:     "roulette-pulse 1.1s ease-out infinite",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        marginTop:     7,
                        textAlign:     "center",
                        fontSize:      12,
                        fontWeight:    500,
                        letterSpacing: "0.04em",
                        color:         isHovered || isSelected ? "rgba(199,210,254,0.95)" : "rgba(255,255,255,0.38)",
                        transition:    "color 0.22s ease",
                        fontFamily:    "'DM Mono', monospace",
                        whiteSpace:    "nowrap",
                        overflow:      "hidden",
                        textOverflow:  "ellipsis",
                        paddingInline: 4,
                      }}
                    >
                      {project.shortTitle ?? project.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Center hub ── */}
          <div
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              zIndex:         30,
              pointerEvents:  "none",
            }}
          >
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 0, pointerEvents: "auto" }}>

              {/* Loading badge */}
              <div style={{ marginBottom: 14, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {phase === "loading" && (
                  <div
                    style={{
                      background:    "rgba(79,70,229,0.14)",
                      border:        "1px solid rgba(99,102,241,0.38)",
                      borderRadius:  20,
                      padding:       "5px 14px",
                      fontSize:      11,
                      fontFamily:    "'DM Mono', monospace",
                      color:         "#a5b4fc",
                      whiteSpace:    "nowrap",
                      letterSpacing: "0.05em",
                      animation:     "roulette-fadein 0.3s ease",
                      display:       "flex",
                      alignItems:    "center",
                      gap:           7,
                    }}
                  >
                    <span style={{ animation: "roulette-blink 1s ease infinite" }}>◌</span>
                    Abriendo proyecto...
                  </div>
                )}
              </div>

              {/* Spin button */}
              <button
                onClick={handleSpin}
                disabled={!isInteractive}
                style={{
                  background:    isInteractive ? "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)" : "rgba(67,56,202,0.18)",
                  border:        "1px solid rgba(129,140,248,0.28)",
                  borderRadius:  40,
                  padding:       "13px 24px",
                  color:         isInteractive ? "#f0f0f8" : "rgba(165,180,252,0.4)",
                  fontSize:      13,
                  fontWeight:    600,
                  fontFamily:    "'DM Sans', sans-serif",
                  letterSpacing: "0.01em",
                  cursor:        isInteractive ? "pointer" : "default",
                  display:       "flex",
                  alignItems:    "center",
                  gap:           9,
                  transition:    "all 0.25s ease",
                  boxShadow:     isInteractive ? "0 0 24px rgba(79,70,229,0.38), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
                  whiteSpace:    "nowrap",
                  outline:       "none",
                }}
              >
                <DiceIcon spinning={phase === "spinning"} />
                Abrir una al azar
              </button>

              {/* Center glow */}
              <div
                style={{
                  position:      "absolute",
                  inset:         -30,
                  borderRadius:  "50%",
                  background:    "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)",
                  zIndex:        -1,
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

        </div>{/* end scaled stage */}
      </div>{/* end outer wrapper */}

      {/* State label */}
      <div
        style={{
          marginTop:     8,
          fontFamily:    "'DM Mono', monospace",
          fontSize:      10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.16)",
          userSelect:    "none",
        }}
      >
        {phase === "rotating"    && "Default · Rotating"}
        {phase === "card_active" && "Card_Active · Hover Paused"}
        {phase === "spinning"    && "Random_Spin · High Speed"}
        {phase === "loading"     && "Project_Resolved · Loading"}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes roulette-pulse {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.22); }
        }
        @keyframes roulette-fadein {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes roulette-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @keyframes roulette-diceSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Dice Icon ─────────────────────────────────────────────────────────────── */
function DiceIcon({ spinning }) {
  return (
    <svg
      width="15" height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={spinning ? { animation: "roulette-diceSpin 0.38s linear infinite" } : undefined}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="8.5"  cy="8.5"  r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5"  r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8.5"  cy="15.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12"   cy="12"   r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
