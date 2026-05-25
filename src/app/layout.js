import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Navbar } from "../components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "EstateStager AI - Virtual Home Staging SaaS",
  description: "Upload room photos, select room types and templates, and virtually stage vacant spaces instantly with photorealistic AI designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full" style={{ colorScheme: "light" }}>
      <body className={`${inter.variable} ${outfit.variable} h-full w-full flex flex-col antialiased bg-slate-50 text-slate-900 font-sans overflow-hidden`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
