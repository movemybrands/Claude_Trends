import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mead Framework Screener',
  description: 'Value investing analysis using the Mead Framework — ROCE, Owner Earnings, Moat, Management, Balance Sheet, Valuation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  )
}
