import type { Metadata } from "next"
import { Roboto_Condensed } from "next/font/google"
import "./globals.css"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"

const font = Roboto_Condensed({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body className={font.className}>
                    <ConvexClientProvider>{children}</ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    )
}
