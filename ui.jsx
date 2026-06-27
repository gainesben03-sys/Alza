"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BOOKING = "mailto:hello@alza.group?subject=Elevation%20Session";

export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, tone }) {
  return (
    <span className="eyebrow" style={{ color: tone || "#5E7C6B" }}>
      {children}
    </span>
  );
}

/* Primary button that links somewhere (internal route or mailto) */
export function CTA({ children, href = BOOKING, className = "btn btn-primary" }) {
  const internal = href.startsWith("/");
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/* Text link with the copper arrow */
export function TextCTA({ children, href = BOOKING, light = false }) {
  const internal = href.startsWith("/");
  const cls = `textlink ${light ? "light" : ""}`;
  const inner = (
    <>
      {children}
      <span className="textlink-arrow">→</span>
    </>
  );
  return internal ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

export { BOOKING };
