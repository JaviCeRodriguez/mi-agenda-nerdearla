import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { SavedTalksProvider } from "@/contexts/saved-talks-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nerdearla 2025 - Agenda de Charlas",
  description:
    "Descubre todas las charlas de Nerdearla 2025, la conferencia tech más grande de Latinoamérica. Filtra por día, track y encuentra las charlas que más te interesan.",
  keywords: [
    "nerdearla",
    "conferencia",
    "tech",
    "charlas",
    "agenda",
    "argentina",
    "desarrollo",
    "tecnologia",
    "programacion",
    "IA",
    "datascience",
  ],
  authors: [{ name: "Nerdearla Team" }],
  creator: "Nerdearla",
  publisher: "Nerdearla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nerdear.la"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nerdearla 2025 - Agenda de Charlas",
    description:
      "Descubre todas las charlas de Nerdearla 2025, la conferencia tech más grande de Latinoamérica.",
    url: "https://nerdear.la",
    siteName: "Nerdearla",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/nerdearla-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Nerdearla 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nerdearla 2025 - Agenda de Charlas",
    description:
      "Descubre todas las charlas de Nerdearla 2025, la conferencia tech más grande de Latinoamérica.",
    images: ["/nerdearla-logo.jpg"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SavedTalksProvider>
          {children}
          <Analytics />
          <Toaster />
        </SavedTalksProvider>
      </body>
    </html>
  );
}
