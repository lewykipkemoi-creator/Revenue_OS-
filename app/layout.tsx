import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lewy AI — Never lose a customer to a slow reply",
  description:
    "Lewy answers customers, qualifies leads, and hands sensitive conversations to your team — so revenue never waits.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('lewy-theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
