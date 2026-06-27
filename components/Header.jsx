"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark, Wordmark } from "@/components/brand";
import { BOOKING } from "@/components/ui";

const LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/philosophy", "Philosophy"],
  ["/services", "Services"],
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Alza home">
          <Mark height={30} />
          <span className="brand-divider" />
          <Wordmark height={16} />
        </Link>

        <nav className="nav-desktop">
          {LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`navlink ${isActive(href) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <a href={BOOKING} className="btn btn-primary btn-sm">
            Book an Elevation Session
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`bar ${open ? "x1" : ""}`} />
          <span className={`bar ${open ? "x2" : ""}`} />
        </button>
      </div>

      <div className={`nav-mobile ${open ? "show" : ""}`}>
        {LINKS.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={`navlink-m ${isActive(href) ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}
        <a href={BOOKING} className="btn btn-primary">
          Book an Elevation Session
        </a>
      </div>
    </header>
  );
}
