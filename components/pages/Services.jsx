import { Reveal, Eyebrow, TextCTA } from "@/components/ui";
import { ElevationRule } from "@/components/brand";
import Connect from "@/components/Connect";

const services = [
  [
    "Organizational Elevation Assessment™",
    "The entry point. A structured diagnostic across leadership, people, operations, culture, and AI readiness — ending in a 90-day roadmap and executive presentation.",
    "/assessment",
    "Start an Assessment",
  ],
  [
    "Advisory Partnership",
    "Ongoing executive advisory. A trusted partner in the room as you lead, decide, and grow.",
  ],
  [
    "Leadership & Organizational Design",
    "Align leadership teams, clarify roles and structure, and design the organization for what's next.",
  ],
  [
    "AI & Operational Modernization",
    "Process design, automation, and AI integration that make operations faster, clearer, and more resilient.",
  ],
  [
    "Rapid Organizational Support",
    "Immediate stabilization for urgent, high-pressure situations — followed by the work to prevent the next one.",
  ],
];

export default function Services() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="pagehead-h">How we partner with organizations.</h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="pagehead-rule">
              <ElevationRule width={150} />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="pagehead-sub">
              Every engagement is a partnership, not a transaction. Most begin with an
              assessment and grow from there.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap services">
          {services.map(([t, d, href, cta], i) => (
            <Reveal key={t} delay={i * 60} className="service">
              <div className="service-index">
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="service-body">
                <h2 className="service-t">{t}</h2>
                <p className="service-d">{d}</p>
                {cta && <TextCTA href={href}>{cta}</TextCTA>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Connect />
    </>
  );
}
