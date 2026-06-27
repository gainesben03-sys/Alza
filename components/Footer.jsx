import Link from "next/link";
import { Wordmark } from "@/components/brand";

const LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/philosophy", "Philosophy"],
  ["/services", "Services"],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Wordmark height={20} color="#FFFFFF" />
          <p className="footer-desc">Strategic People &amp; Organizational Advisory</p>
          <p className="footer-sig">Elevate People. Strengthen Organizations.</p>
        </div>
        <div className="footer-nav">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="wrap footer-base">
        <span>Serving organizations in English &amp; Spanish.</span>
        <span>© {new Date().getFullYear()} Alza. All rights reserved.</span>
      </div>
    </footer>
  );
}
