import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


export const metadata = {
  title: "DaamTrack",
  description: "Track your stuff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
