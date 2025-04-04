"use client"
import Header from "@Layout/Header"
import Sidebar from "@Layout/Sidebar"
import TapTop from "@Layout/TapTop"
import { useAppDispatch, useAppSelector } from "@Redux/Hooks"
import { addSidebarTypes, setSideBarToggle } from "@Redux/Reducers/ThemeCustomizerReducer"
import Store from "@Redux/Store"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { ModalProvider } from "@Context/ModalContext"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const { sidebar_types, sideBarToggle } = useAppSelector((state) => state.themeCustomizer)
    const dispatch = useAppDispatch()
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            console.log(session)
            router.push("/login")
        }
    }, [status, router])

    const updateSidebarBasedOnWidth = () => {
        const windowWidth = window.innerWidth
        if (sidebar_types === "compact-wrapper") {
            if (windowWidth <= 1200) {
                dispatch(setSideBarToggle(true))
            } else {
                dispatch(setSideBarToggle(false))
            }
        } else if (sidebar_types === "horizontal-wrapper") {
            if (windowWidth <= 992) {
                dispatch(setSideBarToggle(true))
                dispatch(addSidebarTypes("compact-wrapper"))
            } else {
                dispatch(setSideBarToggle(false))
                dispatch(addSidebarTypes("horizontal-wrapper"))
            }
        }
    }
    useEffect(() => {
        updateSidebarBasedOnWidth()
        window.addEventListener("resize", () => {
            updateSidebarBasedOnWidth()
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebar_types])

    if (status === "unauthenticated" || status === "loading") {
        return null
    }

    return (
        <Provider store={ Store }>
            <ModalProvider>
                <div className={ `page-wrapper ${ sideBarToggle ? "compact-wrapper" : sidebar_types } ${ sideBarToggle ? "sidebar-open" : "" }` } id="pageWrapper">
                    <Header/>
                    <div className="page-body-wrapper">
                        <Sidebar/>
                        <div className="page-body">{ children }</div>
                    </div>
                </div>
                <TapTop/>
            </ModalProvider>
        </Provider>
    )
}
