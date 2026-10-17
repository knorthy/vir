import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Kalam, Red_Hat_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const redHatMono = Red_Hat_Mono({
  variable: "--font-red-hat-mono",
  subsets: ["latin"],
  weight: "500",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Jasmine Vir · Electrical Engineer",
  description:
    "Portfolio of Jasmine Vir, electrical engineer: power systems, electrical design, AutoCAD drafting, electronics, and embedded systems.",
};

export const viewport: Viewport = {
  themeColor: "#0f3a72",
};

// Runs before first paint so the saved theme and motion-only start states never flash.
const motionScript = `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme=t}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${redHatMono.variable} ${kalam.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
