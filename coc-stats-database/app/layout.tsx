import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Clash Intel | CoC Stats Database", description: "Clash of Clans stats reference for war planning." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="id"><body>{children}</body></html>; }
