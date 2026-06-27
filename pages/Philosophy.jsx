import { Reveal, Eyebrow } from "@/components/ui";
import { ElevationRule } from "@/components/brand";
import Connect from "@/components/Connect";

const principles = [
  ["Systems over symptoms", "A problem you can see is usually a symptom of a system you can't. We fix the system."],
  ["Leadership shapes everything", "Every organization rises or stalls at the level of its leadership. Align the top, and the rest follows."],
  ["Simplicity creates scale", "Complexity is easy. Clarity is hard. Simple systems are the ones that actually scale."],
  ["AI should amplify people", "Technology is here to extend human capability, not replace it. We design AI around people."],
  ["Growth requires alignment", "Sustainable growth isn't doing more. It's aligning leadership, people, operations, and culture."],
  ["Organizations rise when people rise", "Strengthen the people, and the organization strengthens itself. That's the whole point."],
];

export default function Philosophy() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Philosophy</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="pagehead-h">The principles behind the work.</h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="pagehead-rule">
              <ElevationRule width={150} />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="pagehead-sub">
              How Alza thinks about organizations, leadership, and change.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap principles">
          {principles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 60} className="principle">
              <span className="principle-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="principle-t">{t}</h2>
                <p className="principle-d">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Connect />
    </>
  );
}
