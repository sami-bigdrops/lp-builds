import { Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@workspace/ui/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans antialiased", inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
