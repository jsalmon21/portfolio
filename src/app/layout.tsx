import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/assets/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Jason Vincent | Web Designer & Developer",
  description:
    "Colorado based web designer and developer focused on delivering beautiful, minimal, and user-friendly design with interactive experiences for all mediums.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.className} bg-black`}>
        {children}
      </body>
    </html>
  );
}
