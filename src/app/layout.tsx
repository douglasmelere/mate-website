import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { LanguageProvider } from "@/lib/i18n/context";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://labmate.com.br"),
  title: {
    default: "LabMate — Dashboards Industriais e IoT em Tempo Real",
    template: "%s | LabMate by Mate",
  },
  description:
    "Plataforma SaaS para criação de dashboards industriais inteligentes. Conecte CLPs, sensores e dispositivos IoT a painéis visuais dinâmicos — com IA generativa ou drag-and-drop. Feito para automação industrial de verdade.",
  keywords: [
    "dashboards industriais",
    "IoT",
    "CLPs",
    "Controladores Lógicos Programáveis",
    "automação industrial",
    "SCADA web",
    "monitoramento em tempo real",
    "Indústria 4.0",
    "sensores industriais",
    "SaaS industrial",
    "LabMate",
    "Mate",
    "dashboards IoT",
    "integração CLP",
    "visualização de dados industriais",
  ],
  authors: [{ name: "Mate", url: "https://labmate.com.br" }],
  creator: "Mate",
  publisher: "Mate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://labmate.com.br",
    siteName: "LabMate by Mate",
    title: "LabMate — Dashboards Industriais e IoT em Tempo Real",
    description:
      "Conecte CLPs e sensores a painéis visuais dinâmicos. IA generativa + drag-and-drop para automação industrial.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LabMate — Dashboards Industriais Inteligentes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LabMate — Dashboards Industriais e IoT em Tempo Real",
    description:
      "Conecte CLPs e sensores a painéis visuais dinâmicos. IA generativa + drag-and-drop.",
    images: ["/og-image.png"],
    creator: "@mateapp",
  },
  alternates: {
    canonical: "https://labmate.com.br",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-brand-bg font-sans antialiased">
        {/* Film grain noise overlay for premium texture */}
        <div className="noise-overlay" aria-hidden="true" />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
