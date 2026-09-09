import { DM_Sans, JetBrains_Mono } from "next/font/google"

import { cn } from "@workspace/ui/lib/utils"

import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        dmSans.variable,
        jetbrainsMono.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
