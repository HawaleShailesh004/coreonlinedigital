"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { WhatsAppButton, CallButton } from "@/components/v3/CtaButtons";
import { homeCopy } from "@/lib/site-content";
import { useReducedMotion } from "@/lib/useReducedMotion";

type HeroScrollContextValue = {
  progress: MotionValue<number>;
  live: boolean;
};

const HeroScrollContext = createContext<HeroScrollContextValue | null>(null);

/**
 * Next section: scale 0.96 → 1 as the hero runway clears.
 * Must be a child of `Hero` (outside the 200vh wrap, inside the provider).
 */
export function HeroIncoming({ children }: { children: ReactNode }) {
  const ctx = useContext(HeroScrollContext);
  const reducedMotion = useReducedMotion();
  const fallback = useMotionValue(1);
  const scale = useTransform(ctx?.progress ?? fallback, [0, 1], [0.96, 1]);

  if (!ctx || reducedMotion) return children;

  return (
    <motion.div
      className="v3-hero-incoming"
      style={{
        scale,
        willChange: ctx.live ? "transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero({ children }: { children?: ReactNode }) {
  const [line1, line2, line3] = homeCopy.hero.lines;
  const [sub1, sub2] = homeCopy.hero.subLines;
  const wrapRef = useRef<HTMLElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [live, setLive] = useState(true);
  const [pin, setPin] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const progress = useMotionValue(0);

  const lineY = useTransform(progress, [0, 0.45], ["0%", "-120%"]);
  const lineOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const missingScale = useTransform(progress, [0, 1], [1, 0.13]);
  const missingX = useTransform(progress, [0, 1], ["0vw", "-38vw"]);
  const missingY = useTransform(progress, [0, 1], ["0vh", "-38vh"]);
  const missingOpacity = useTransform(progress, [0.97, 0.98], [1, 0]);
  const chromeOpacity = useTransform(progress, [0, 0.3], [1, 0]);

  /**
   * useScroll is attached to the wrapper (start start → end start). Its native
   * tracker stays at 0 on this sticky 200vh node, so we write the same
   * geometry into `progress` for useTransform.
   */
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reducedMotion) return;

    let frame = 0;
    const tick = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const next = rect.height <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / rect.height));
      progress.set(next);
      scrollYProgress.set(next);

      // Pin only while the runway is finishing AND still on screen. After
      // progress clamps at 1, this scroll tick is what clears the fixed label.
      const shouldPin = next >= 0.98 && rect.bottom > 8;
      if (shouldPin !== pinnedRef.current) {
        pinnedRef.current = shouldPin;
        setPin(shouldPin);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [progress, scrollYProgress, reducedMotion]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reducedMotion) return;
    const io = new IntersectionObserver(([entry]) => {
      setLive(entry.isIntersecting);
    });
    io.observe(wrap);
    return () => io.disconnect();
  }, [reducedMotion]);

  useMotionValueEvent(chromeOpacity, "change", (value) => {
    const node = chromeRef.current;
    if (!node) return;
    node.style.pointerEvents = value < 0.05 ? "none" : "";
  });

  const will = live && !reducedMotion ? "transform, opacity" : "auto";

  return (
    <HeroScrollContext.Provider value={{ progress, live }}>
      <section
        ref={wrapRef}
        className={reducedMotion ? "v3-hero-wrap v3-hero-wrap--static" : "v3-hero-wrap"}
        aria-label="Introduction"
      >
        <div className="v3-hero">
          <div className="v3-hero-inner">
            <h1 className="v3-hero-title">
              <motion.span
                className="v3-hero-line"
                style={
                  reducedMotion
                    ? undefined
                    : { y: lineY, opacity: lineOpacity, willChange: will }
                }
              >
                <span className="v3-mask-line">
                  <span
                    className="v3-hero-whisper"
                    style={{ "--v3-delay": "0ms" } as React.CSSProperties}
                  >
                    {line1}
                  </span>
                </span>
              </motion.span>
              <motion.span
                className="v3-hero-line"
                style={
                  reducedMotion
                    ? undefined
                    : { y: lineY, opacity: lineOpacity, willChange: will }
                }
              >
                <span className="v3-mask-line">
                  <span
                    className="v3-hero-whisper"
                    style={{ "--v3-delay": "90ms" } as React.CSSProperties}
                  >
                    {line2}
                  </span>
                </span>
              </motion.span>
              <motion.span
                className="v3-hero-line v3-hero-missing"
                style={
                  reducedMotion
                    ? undefined
                    : {
                        x: missingX,
                        y: missingY,
                        scale: missingScale,
                        opacity: missingOpacity,
                        willChange: will,
                      }
                }
              >
                <span className="v3-mask-line">
                  <span style={{ "--v3-delay": "180ms" } as React.CSSProperties}>
                    <span className="v3-cutout">{line3}</span>
                  </span>
                </span>
              </motion.span>
            </h1>

            <motion.div
              ref={chromeRef}
              className="v3-hero-chrome"
              style={reducedMotion ? undefined : { opacity: chromeOpacity, willChange: will }}
            >
              <div
                className="v3-hero-enter v3-hero-cta"
                style={{ "--v3-delay": "900ms" } as React.CSSProperties}
              >
                <WhatsAppButton context="the homepage" magnetic />
                <CallButton />
              </div>

              <p
                className="v3-hero-sub v3-hero-enter"
                style={{ "--v3-delay": "1020ms" } as React.CSSProperties}
              >
                <span className="block">{sub1}</span>
                <span className="block">{sub2}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {!reducedMotion && pin ? (
        <p className="v3-hero-pin" aria-hidden="true">
          <span className="v3-cutout">{line3}</span>
        </p>
      ) : null}

      {children}
    </HeroScrollContext.Provider>
  );
}
