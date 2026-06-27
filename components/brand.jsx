import { C } from "@/lib/colors";

export function Mark({ height = 40, variant = "color" }) {
  let navy = C.navy,
    blue = C.blue,
    sage = C.sage;
  if (variant === "navy") {
    navy = blue = sage = C.navy;
  }
  if (variant === "white") {
    navy = blue = "#FFFFFF";
    sage = "rgba(255,255,255,0.55)";
  }
  return (
    <svg
      height={height}
      viewBox="0 0 120 108"
      role="img"
      aria-label="Alza mark"
      style={{ display: "block" }}
    >
      <polygon points="12,98 33,98 59,10 42,10" fill={navy} />
      <polygon points="108,98 88,98 64,22 81,22" fill={blue} />
      <polygon points="60,55 46,98 74,98" fill={sage} />
    </svg>
  );
}

export function Wordmark({ height = 22, color = C.navy }) {
  return (
    <svg
      height={height}
      viewBox="-3 -3 310 76"
      role="img"
      aria-label="ALZA"
      style={{ display: "block", overflow: "visible" }}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={3.4}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M0,70 L25,0 L50,70" />
        <path d="M90,0 L90,70 L128,70" />
        <path d="M168,0 L214,0 L168,70 L214,70" />
        <path d="M254,70 L279,0 L304,70" />
      </g>
    </svg>
  );
}

export function ElevationRule({ width = 132, tone = C.copper }) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 132 14"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="100" y2="12" stroke={C.line} strokeWidth="1.4" />
      <line x1="100" y1="12" x2="132" y2="2" stroke={tone} strokeWidth="1.4" />
    </svg>
  );
}
