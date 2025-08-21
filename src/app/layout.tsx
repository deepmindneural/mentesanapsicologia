import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mente Sana Psicología - Plataforma de Psicología con IA",
  description: "Plataforma integral de servicios psicológicos que combina inteligencia artificial, avatares personalizables y comunicación por voz/texto para brindar una experiencia terapéutica innovadora.",
  keywords: ["psicología", "inteligencia artificial", "terapia", "bienestar mental", "avatar", "chat"],
  authors: [{ name: "Mente Sana Psicología" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
