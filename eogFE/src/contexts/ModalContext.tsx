'use client'

import { createContext, useContext, useMemo, useState } from 'react'

interface ModalContextType {
    modalStates: any
    setModalStates: (values: any) => void

    openModal: (modalName: any) => void
    closeModal: (modalName: any) => void
    setModalOpen: (modalName: any, value: boolean) => void
    setModalStart: (modalName: any, values: { [x: string]: any }) => void

    toggleModal: (modalName: any) => void

    refreshData: boolean
    updateData: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {

    const [modalStates, setModalStates] = useState<any>({
                                                            modalUsuario: {
                                                                open: false
                                                            },
                                                            modalRol: {
                                                                open: false
                                                            },
                                                            modalTicket: {
                                                                open: false
                                                            },
                                                            modalLuminaria: {
                                                                open: false
                                                            }
                                                        })

    const [refreshData, setRefreshData] = useState<boolean>(false)

    const updateData = () => {
        setRefreshData(!refreshData)
    }

    const openModal = (modalName: any) => {
        setModalStates({ ...modalStates, [modalName]: { ...modalStates[modalName], open: true } })
    }

    const closeModal = (modalName: any) => {
        setModalStates({ ...modalStates, [modalName]: { ...modalStates[modalName], open: false } })
    }

    const setModalOpen = (modalName: any, value: boolean) => {
        setModalStates({ ...modalStates, [modalName]: { ...modalStates[modalName], open: value } })
    }

    const setModalStart = (modalName: any, values: { [x: string]: any }) => {
        setModalStates({ ...modalStates, [modalName]: { ...modalStates[modalName], ...values, open: true } })
    }

    const toggleModal = (modalName: any) => {
        setModalStates({ ...modalStates, [modalName]: { open: !modalStates[modalName].open } })
    }

    const contextValue = useMemo(() => ({
        modalStates,
        setModalStates,

        openModal,
        closeModal,
        setModalOpen,
        setModalStart,

        toggleModal,

        refreshData,
        updateData

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [refreshData, modalStates])

    return (
        <ModalContext.Provider value={ contextValue }>
            { children }
        </ModalContext.Provider>
    )
}

export function useModalContext() {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('useModalContext must be used within a SiFacProvider')
    }

    return context
}