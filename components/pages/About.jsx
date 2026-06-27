import Image from "next/image";
import { Reveal, Eyebrow } from "@/components/ui";
import { Wordmark, ElevationRule } from "@/components/brand";
import Connect from "@/components/Connect";

function PageHead({ eyebrow, title, sub }) {
  return (
    <section className="pagehead">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="pagehead-h">{title}</h1>
        </Reveal>
        <Reveal delay={140}>
          <div className="pagehead-rule">
            <ElevationRule width={150} />
          </div>
        </Reveal>
        {sub && (
          <Reveal delay={180}>
            <p className="pagehead-sub">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="Built to elevate organizations — and the people inside them."
      />
      <section className="section">
        <div className="wrap prose">
          <Reveal className="prose-block">
            <h2 className="prose-h">Why Alza exists</h2>
            <p>
              Alza was created from a simple observation: most organizations don't
              struggle because of HR problems. They struggle because leadership,
              people, operations, and culture fall out of alignment. HR is where the
              symptoms show up. Alignment is where the work actually is.
            </p>
          </Reveal>

          <Reveal className="prose-block">
            <h2 className="prose-h">From HR to organizational advisory</h2>
            <p>
              Many engagements begin the same way — a people challenge, a hiring need,
              a difficult situation. But the real value isn't fixing one issue. It's
              strengthening the system so the issue doesn't return. Most clients come
              for HR support and stay for organizational elevation.
            </p>
          </Reveal>

          <Reveal className="prose-block">
            <h2 className="prose-h">What we believe</h2>
            <p>
              Sustainable growth requires intentional design across leadership, people,
              operations, and culture. When those four move together, organizations
              become clear, capable, and ready for what's next.
            </p>
          </Reveal>

          <Reveal className="prose-block">
            <h2 className="prose-h">How we work</h2>
            <p>
              We work as long-term executive partners, not hourly consultants. Calm,
              direct, and practical — strategy paired with real operational execution.
            </p>
          </Reveal>

          <Reveal className="prose-block">
            <h2 className="prose-h">Bilingual by design</h2>
            <p>
              We believe great leadership transcends language. Alza proudly serves
              organizations and teams in both English and Spanish.
            </p>
          </Reveal>

          <Reveal className="founder">
            <div className="founder-photo">
              <Image
                src="/headshot.jpg"
                alt="Founder of Alza"
                width={560}
                height={560}
                priority
              />
            </div>
            <div className="founder-note">
              <Wordmark height={18} />
              <p>
                A short founder note lives here — who you are, why you started Alza,
                and the kind of partner you set out to be. Replace this text with your
                name, title, and two or three sentences.
              </p>
            </div>
          </Reveal>

          <Reveal className="purpose-inline">
            <ElevationRule width={132} />
            <p className="purpose-inline-text">
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
