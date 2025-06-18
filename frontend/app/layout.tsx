import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Impor Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiagnosApps",
  description: "Sistem Cerdas untuk Analisis Kesehatan Awal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Tempatkan Toaster di sini agar tersedia di seluruh aplikasi */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}