import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { RangeProvider } from "@/components/RangeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pulsely — Demo de dashboard de analítica SaaS",
  description:
    "Proyecto de portfolio: dashboard de analítica de producto ficticio, sin backend ni datos reales.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-200">
        <LanguageProvider>
          <RangeProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </RangeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
