import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Kate Holterhoff",
  description: "Kate Holterhoff - Analyst at RedMonk and Affiliated Researcher at Georgia Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
