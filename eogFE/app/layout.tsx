import NoSsr from "@utils/NoSsr"
import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import "../src/Amero/index.scss"
import MainProvider from "./MainProvider"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"

const nunito = Nunito_Sans({
                               weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
                               style: ["italic", "normal"],
                               subsets: ["latin"],
                               display: "swap",
                               variable: "--nunito",
                           })

export const metadata: Metadata = {
    title: "Construcciones EOG",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    return (
            <html>
            <head>
                <link rel='icon' href='/assets/images/favicon.png' type='image/x-icon' />
                <link rel='shortcut icon' href='/assets/images/favicon.png' type='image/x-icon' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
            </head>
            <body suppressHydrationWarning={true} className={`${nunito.variable}`}>
            <NoSsr>
                <SessionProvider>
                    <MainProvider>{children}</MainProvider>
                    <ToastContainer />
                </SessionProvider>
            </NoSsr>
            </body>
            </html>
    )
}
