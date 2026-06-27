import { Reveal, Eyebrow, BOOKING } from "@/components/ui";

export default function Connect() {
  return (
    <section id="connect" className="connect">
      <div className="wrap connect-inner">
        <Reveal>
          <Eyebrow tone="rgba(255,255,255,0.6)">Let's build together</Eyebrow>
          <h2 className="connect-h">Let's build a stronger organization.</h2>
          <p className="connect-sub">
            Start with a conversation. We'll talk through where your organization is,
            where it's headed, and whether Alza is the right partner for the next step.
          </p>
          <div className="connect-actions">
            <a className="btn btn-light" href={BOOKING}>
              Book an Elevation Session
            </a>
            <a
              className="textlink light"
              href="mailto:hello@alza.group?subject=Leadership%20Conversation"
            >
              Schedule a Leadership Conversation
              <span className="textlink-arrow">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
