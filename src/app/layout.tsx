import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

// This is the root layout that doesn't know about locales yet
// The actual language attribute will be set in the [locale] layout
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        {/* Head elements go here */}
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}
