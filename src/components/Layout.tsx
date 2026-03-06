import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:46px_46px]" />
    </div>
    <Header />
    <main className="flex-1 relative z-10">{children}</main>
    <Footer />
    <a
      href="https://wa.me/918623829117"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-white shadow-lg hover:bg-green-700 transition-colors"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M19.05 4.94A9.86 9.86 0 0 0 12.03 2C6.5 2 2 6.48 2 12c0 1.76.46 3.48 1.34 5L2 22l5.16-1.3A10.06 10.06 0 0 0 12.03 22C17.55 22 22 17.52 22 12a9.9 9.9 0 0 0-2.95-7.06zM12.03 20.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.77.82-2.98-.2-.31A8.14 8.14 0 0 1 3.8 12c0-4.54 3.69-8.2 8.23-8.2 2.2 0 4.26.85 5.8 2.4a8.12 8.12 0 0 1 2.4 5.8c0 4.53-3.7 8.2-8.2 8.2zm4.5-6.15c-.24-.12-1.42-.7-1.64-.77-.22-.08-.38-.12-.54.12-.16.24-.62.76-.76.92-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.38-1.3-1.62-.14-.24-.01-.37.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.08 3.6.57.24 1.02.38 1.37.48.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </span>
    </a>
  </div>
);

export default Layout;

