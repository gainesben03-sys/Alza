import { C } from "@/lib/colors";
import { Mark, ElevationRule } from "@/components/brand";
import { Reveal, Eyebrow, CTA, TextCTA, BOOKING } from "@/components/ui";
import Connect from "@/components/Connect";

const pillars = [
  ["Leadership", "Executive advisory, decision support, and leadership development that aligns the people at the top."],
  ["People", "Recruiting strategy, workforce planning, employee experience, and performance systems built to last."],
  ["Operations", "Process design, structure, documentation, and AI integration that make the work flow."],
  ["Culture", "Organizational health, communication, engagement, and change that teams actually feel."],
];

const method = [
  ["01", "Assess", "Understand leadership, people systems, operations, culture, and organizational health."],
  ["02", "Align", "Clarify priorities, roles, communication, and strategy across leadership."],
  ["03", "Build", "Design and implement the systems, processes, and people strategy."],
  ["04", "Optimize", "Improve efficiency through technology, automation, and AI."],
  ["05", "Elevate", "Strengthen leadership, culture, and long-term organizational health."],
];

const outcomes = [
  "A clear read on where you're misaligned",
  "A 90-day roadmap of what to fix first",
  "An executive presentation to align your team",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-text">
            <Reveal>
              <Eyebrow>Strategic People &amp; Organizational Advisory</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero-h">
                Elevate people.
                <br />
                <span className="hero-h-accent">Strengthen organizations.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <div className="hero-rule">
                <ElevationRule width={150} />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-sub">
                Alza helps organizations align leadership, people, operations, and
                culture — and build the systems to scale what works.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="hero-actions">
                <CTA href={BOOKING}>Book an Elevation Session</CTA>
                <TextCTA href="/assessment">Start an Assessment</TextCTA>
              </div>
            </Reveal>
          </div>
          <Reveal delay={180} className="hero-visual">
            <div className="hero-glow" />
            <div className="hero-mark">
              <Mark height={290} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem">
        <div className="wrap">
          <Reveal>
            <Eyebrow tone={C.blue}>The real problem</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <p className="problem-line">Most organizations think they have an HR problem.</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="problem-line strong">They have an alignment problem.</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="problem-body">
              Leadership, people, operations, and culture drift out of sync. Growth
              widens the gaps. The answer isn't another policy — it's intentional
              design across all four.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section mist">
        <div className="wrap">
          <Reveal className="section-head">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="section-h">Four areas. One aligned organization.</h2>
          </Reveal>
          <div className="pillars">
            {pillars.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80} className="pillar">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="pillar-t">{t}</h3>
                <p className="pillar-d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <Eyebrow tone={C.sage}>The Alza Method™</Eyebrow>
            <h2 className="section-h">How elevation happens.</h2>
          </Reveal>
          <div className="method">
            {method.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 70} className="method-row">
                <span className="method-num">{n}</span>
                <div className="method-body">
                  <h3 className="method-t">{t}</h3>
                  <p className="method-d">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENTRY OFFER */}
      <section className="section mist">
        <div className="wrap offer">
          <div className="offer-left">
            <Reveal>
              <Eyebrow tone={C.blue}>Where it begins</Eyebrow>
              <h2 className="section-h">
                The Organizational
                <br />
                Elevation Assessment™
              </h2>
              <p className="offer-body">
                A deep diagnostic of the whole organization — leadership, people,
                operations, culture, and AI readiness — built for leaders who've
                outgrown running it all themselves. You'll leave knowing exactly
                where you're misaligned and what to fix first.
              </p>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: C.body,
                  opacity: 0.78,
                  margin: "0 0 1.6rem",
                }}
              >
                Not ready for the full engagement? Start with the free 2-minute
                Pulse.
              </p>
              <CTA href="/assessment">Take the 2-minute Pulse</CTA>
            </Reveal>
          </div>
          <Reveal delay={120} className="offer-right">
            <ul className="includes" style={{ gridTemplateColumns: "1fr" }}>
              {outcomes.map((x) => (
                <li key={x}>
                  <span className="tick" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* RAPID SUPPORT */}
      <section className="section">
        <div className="wrap rapid">
          <Reveal>
            <Eyebrow tone={C.copper}>When the pressure is on</Eyebrow>
            <h2 className="section-h">Rapid Organizational Support</h2>
            <p className="rapid-body">
              Employee relations escalations. Workplace investigations. Leadership
              conflict. Urgent hiring. When something can't wait, Alza stabilizes the
              situation — then strengthens the system that caused it.
            </p>
            <p className="rapid-principle">
              We stabilize the issue, then strengthen the system behind it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHY ALZA */}
      <section className="section mist">
        <div className="wrap why">
          <Reveal className="why-head">
            <Eyebrow>Why Alza</Eyebrow>
            <h2 className="section-h">Not HR consulting. Organizational elevation.</h2>
          </Reveal>
          <div className="why-grid">
            {[
              "Strategic advisory, not transactional consulting.",
              "We solve organizational systems, not isolated issues.",
              "AI built into how your organization is designed and run.",
              "Long-term executive partnership.",
              "Bilingual capability — English and Spanish.",
            ].map((x, i) => (
              <Reveal key={i} delay={i * 60} className="why-item">
                <ElevationRule width={48} tone={C.sage} />
                <p>{x}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="why-close">
              Most organizations come to us for HR support. They stay for
              organizational elevation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="purpose">
        <div className="wrap">
          <Reveal>
            <Eyebrow tone="rgba(255,255,255,0.6)">Our purpose</Eyebrow>
            <p className="purpose-statement">
              We exist to elevate people. We do that by strengthening organizations,
              developing leaders, and creating opportunities for others to rise.
            </p>
          </Reveal>
        </div>
      </section>

      <Connect />
    </>
  );
}
