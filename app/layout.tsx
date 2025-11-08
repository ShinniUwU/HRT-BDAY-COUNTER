import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hana's Personal Dashboard",
  description: "A personal tracker dashboard with important dates and countdowns",
  icons: {
    icon: [
      { url: "/ico.png", rel: "icon", sizes: "any" },
    ]
  }
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



// (duplicate import removed)
