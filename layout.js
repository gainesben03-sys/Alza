import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://alza.group"),
  title: {
    default: "Alza — Strategic People & Organizational Advisory",
    template: "%s — Alza",
  },
  description:
    "Alza helps organizations align leadership, people, operations, and culture — and build the systems to scale what works.",
  openGraph: {
    title: "Alza — Strategic People & Organizational Advisory",
    description:
      "Elevate people. Strengthen organizations. Strategic advisory across leadership, people, operations, culture, and AI.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
