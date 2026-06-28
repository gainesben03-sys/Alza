"use client";

import { useState } from "react";
import { C } from "@/lib/colors";
import { Reveal, Eyebrow } from "@/components/ui";
import { ElevationRule } from "@/components/brand";

const BOOK_CONV = "mailto:hello@alza.group?subject=Elevation%20Conversation";
const BOOK_ASSESS =
  "mailto:hello@alza.group?subject=Organizational%20Elevation%20Assessment";

// Explicit colors so buttons are always visible regardless of CSS state.
const BTN_DARK = { backgroundColor: "#0F2747", color: "#ffffff" };
const BTN_LIGHT = { backgroundColor: "#ffffff", color: "#0F2747" };

const INTENTS = [
  "A challenge we're facing right now",
  "Growth is outpacing our systems",
  "Getting ahead of problems before they grow",
  "Something happened and we need help",
];

const CATEGORIES = [
  {
    key: "leadership",
    label: "Leadership Alignment",
    insight: "Leadership alignment",
    line: "Leadership isn't pulling in one direction. When priorities and decisions aren't shared at the top, everything downstream slows.",
    statements: [
      "Leadership isn't fully aligned on priorities",
      "Decision-making is slow or unclear",
      "There's visible tension or misalignment at the leadership level",
    ],
  },
  {
    key: "people",
    label: "People & Talent",
    insight: "People systems",
    line: "Your people operations are running reactively, with no clear owner — so hiring, retention, and everyday people issues fall through the cracks.",
    statements: [
      "Hiring is reactive rather than planned",
      "We struggle to retain key people",
      "No one clearly owns people operations",
    ],
  },
  {
    key: "operations",
    label: "Operations & Systems",
    insight: "Operational structure",
    line: "Key work lives in people, not systems. That creates fragility — and caps how far the organization can scale.",
    statements: [
      "Processes are inconsistent or undocumented",
      "Work depends heavily on specific individuals",
      "Workflows break when key people are absent",
    ],
  },
  {
    key: "culture",
    label: "Culture & Communication",
    insight: "Communication flow",
    line: "When people aren't sure who to turn to, issues go unspoken — and clarity and accountability quietly erode.",
    statements: [
      "Employees aren't sure who to go to when issues come up",
      "Teams are unclear on priorities",
      "Accountability is inconsistent across teams",
    ],
  },
];

const BANDS = [
  {
    max: 30,
    name: "Stable — On the Surface",
    tone: "#5E7C6B",
    summary:
      "Either your organization is genuinely strong here — or the strain hasn't surfaced where you can see it yet. In our experience, the most expensive problems are the ones leadership can't see from the inside. A short conversation is the fastest way to know which one you're dealing with.",
    step: "A focused Elevation Conversation to confirm what's solid — and surface the blind spots a self-assessment can't reach.",
  },
  {
    max: 60,
    name: "Alignment Risk",
    tone: "#1F6FB2",
    summary:
      "Your organization is showing real misalignment across key systems. Individually these gaps feel manageable; together they quietly tax decision speed, retention, and execution. This is the most valuable moment to intervene — before strain becomes structural.",
    step: "An Organizational Elevation Assessment to map the misalignment and realign your systems before the gaps set.",
  },
  {
    max: 100,
    name: "Organizational Strain",
    tone: "#B46A1F",
    summary:
      "Your organization is carrying real structural strain. Misalignment across leadership, people, operations, and culture is affecting performance, growth, and the people inside it. The path forward isn't more effort — it's realignment, by design, and it's worth moving on now.",
    step: "An Organizational Elevation Assessment to diagnose the structural issues and build a 90-day path back to alignment.",
  },
];

function bandFor(score) {
  return BANDS.find((b) => score <= b.max) || BANDS[BANDS.length - 1];
}

export default function Assessment() {
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState("");
  const [sel, setSel] = useState({});
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const top = () => window.scrollTo({ top: 0, behavior: "auto" });
  const toggle = (k) => setSel((s) => ({ ...s, [k]: !s[k] }));

  const total = Object.values(sel).filter(Boolean).length;
  const score = Math.round((total / 12) * 100);
  const band = bandFor(score);
  const catCount = (c) =>
    c.statements.reduce((n, _, i) => n + (sel[c.key + ":" + i] ? 1 : 0), 0);
  const flagged = CATEGORIES.filter((c) => catCount(c) > 0).map((c) => {
    const n = catCount(c);
    return {
      insight: c.insight,
      line: c.line,
      tag: n >= 3 ? "Priority" : n >= 2 ? "At risk" : "Monitor",
      count: n,
    };
  });
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const next = () => {
    if (step < CATEGORIES.length - 1) setStep((v) => v + 1);
    else setStage("results");
    top();
  };
  const back = () => {
    if (step > 0) setStep((v) => v - 1);
    else setStage("intent");
    top();
  };
  const restart = () => {
    setSel({});
    setStep(0);
    setIntent("");
    setReason("");
    setUnlocked(false);
    setEmail("");
    setTouched(false);
    setStage("intro");
    top();
  };

  const unlock = async () => {
    setTouched(true);
    if (!emailValid) return;
    setSubmitting(true);
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          score,
          band: { name: band.name, summary: band.summary, step: band.step },
          flagged,
          intent,
          reason,
        }),
      });
    } catch (e) {
      // results compute client-side; unlock regardless
    } finally {
      setSubmitting(false);
      setUnlocked(true);
    }
  };

  if (stage === "intro") {
    return (
      <section className="asmt asmt-intro">
        <div className="asmt-wrap">
          <Reveal>
            <Eyebrow tone={C.blue}>Organizational Diagnostic</Eyebrow>
            <h1 className="asmt-title">Organizational Pulse Assessment&#8482;</h1>
            <p className="asmt-sub">
              Built for leaders carrying people operations on top of everything
              else. A 2-minute read on where your organization is quietly straining
              — across leadership, people, operations, and culture.
            </p>
            <div className="asmt-rule">
              <ElevationRule width={150} />
            </div>
            <div className="asmt-meta">
              <span>12 statements</span>
              <span className="dot" />
              <span>~2 minutes</span>
              <span className="dot" />
              <span>Confidential</span>
            </div>
            <button
              className="btn btn-primary asmt-start"
              style={BTN_DARK}
              onClick={() => {
                setStage("intent");
                top();
              }}
            >
              Start Assessment
            </button>
          </Reveal>
        </div>
      </section>
    );
  }

  if (stage === "intent") {
    return (
      <section className="asmt asmt-q">
        <div className="asmt-wrap">
          <div className="asmt-step-head">
            <span className="asmt-step-count">First</span>
            <h2 className="asmt-step-title">What brought you here today?</h2>
            <p className="asmt-step-hint">
              Pick the closest. It helps frame your results.
            </p>
          </div>
          <div className="asmt-options">
            {INTENTS.map((t) => (
              <button
                key={t}
                className="asmt-opt"
                onClick={() => {
                  setIntent(t);
                  setStage("questions");
                  top();
                }}
              >
                <span>{t}</span>
                <span style={{ marginLeft: "auto", color: C.copper }}>&#8594;</span>
              </button>
            ))}
          </div>
          <div className="asmt-nav">
            <button
              className="asmt-back"
              onClick={() => {
                setStage("intro");
                top();
              }}
            >
              &#8592; Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (stage === "questions") {
    const c = CATEGORIES[step];
    return (
      <section className="asmt asmt-q">
        <div className="asmt-progress">
          <div
            className="asmt-progress-bar"
            style={{
              width: ((step + 1) / CATEGORIES.length) * 100 + "%",
              backgroundColor: "#1F6FB2",
            }}
          />
        </div>
        <div className="asmt-wrap">
          <div className="asmt-step-head">
            <span className="asmt-step-count">
              {String(step + 1).padStart(2, "0")} /{" "}
              {String(CATEGORIES.length).padStart(2, "0")}
            </span>
            <h2 className="asmt-step-title">{c.label}</h2>
            <p className="asmt-step-hint">
              Select the statements that sound true for your organization. Skip any
              that don't.
            </p>
          </div>
          <div className="asmt-options">
            {c.statements.map((t, i) => {
              const k = c.key + ":" + i;
              const on = !!sel[k];
              return (
                <button
                  key={k}
                  className={"asmt-opt " + (on ? "on" : "")}
                  onClick={() => toggle(k)}
                  aria-pressed={on}
                >
                  <span className="asmt-check" aria-hidden="true" />
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
          <div className="asmt-nav">
            <button className="asmt-back" onClick={back}>
              &#8592; Back
            </button>
            <button className="btn btn-primary" style={BTN_DARK} onClick={next}>
              {step < CATEGORIES.length - 1 ? "Continue" : "See your results"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="asmt asmt-results">
      <div className="asmt-wrap">
        <Reveal>
          <Eyebrow tone={band.tone}>Your result</Eyebrow>
          <div className="score-row">
            <div className="score-num" style={{ color: band.tone }}>
              {score}
            </div>
            <div className="score-meta">
              <div className="score-band">{band.name}</div>
              <div className="score-track">
                <span
                  className="score-marker"
                  style={{ left: score + "%", background: band.tone }}
                />
              </div>
              <div className="score-labels">
                <span>Stable</span>
                <span>Alignment Risk</span>
                <span>Strain</span>
              </div>
            </div>
          </div>
        </Reveal>

        {!unlocked ? (
          <Reveal className="gate">
            <p className="gate-lead">
              Get your full organizational profile and recommendations.
            </p>
            <textarea
              className="gate-input"
              style={{
                width: "100%",
                display: "block",
                minHeight: "64px",
                resize: "vertical",
                marginBottom: "12px",
              }}
              placeholder="Optional: in a sentence, what prompted you to look?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="gate-form">
              <input
                type="email"
                className={"gate-input " + (touched && !emailValid ? "err" : "")}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
              />
              <button
                className="btn btn-primary"
                style={BTN_DARK}
                onClick={unlock}
                disabled={submitting}
              >
                {submitting ? "Sending\u2026" : "Unlock full results"}
              </button>
            </div>
            {touched && !emailValid && (
              <p className="gate-err">Enter a valid email address.</p>
            )}
            <p className="gate-fine">
              Your full profile, summary, and next-step recommendations.
            </p>
          </Reveal>
        ) : (
          <div className="results-full">
            <Reveal className="rf-block">
              <h3 className="rf-h">What this indicates</h3>
              <p className="rf-summary">{band.summary}</p>
            </Reveal>

            <Reveal className="rf-block">
              <h3 className="rf-h">Where the strain shows</h3>
              {flagged.length === 0 ? (
                <p className="rf-summary">
                  Nothing surfaced sharply across the four systems — but that rarely
                  means everything is fine. More often, the real strain sits
                  somewhere a self-assessment can't reach. That's exactly what an
                  outside diagnostic is built to find.
                </p>
              ) : (
                <div className="breakdown">
                  {flagged.map((f) => {
                    const tone =
                      f.count >= 3 ? C.copper : f.count >= 2 ? C.blue : C.sage;
                    return (
                      <div key={f.insight} className="bd-row">
                        <div className="bd-head">
                          <span className="bd-name">{f.insight}</span>
                          <span
                            className="bd-tag"
                            style={{ color: tone, borderColor: tone }}
                          >
                            {f.tag}
                          </span>
                        </div>
                        <p className="bd-line">{f.line}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Reveal>

            <Reveal className="rf-reco">
              <Eyebrow tone={C.copper}>Recommended next step</Eyebrow>
              <p className="reco-step">{band.step}</p>
              <div className="reco-actions">
                <a className="btn btn-primary" style={BTN_LIGHT} href={BOOK_CONV}>
                  Book an Elevation Conversation
                </a>
                <a className="textlink" style={{ color: "#fff" }} href={BOOK_ASSESS}>
                  Request the Organizational Elevation Assessment
                  <span className="textlink-arrow">&#8594;</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="rf-restart">
              <button className="asmt-back" onClick={restart}>
                &#8634; Retake assessment
              </button>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
