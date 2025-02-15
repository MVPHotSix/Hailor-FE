import { create } from 'zustand/react'

interface IPaymentStore {
    navigate: string
    reservationId: number
    pgToken: string
    setReservationId: (reservationId: number) => void
    setNavigate: (navigate: string) => void
    setPgToken: (pgToken: string) => void
    getPgToken: () => string
    getReservationId: () => number
}

export const paymentStore = create<IPaymentStore>(set => ({
    reservationId: -1,
    navigate: '',
    pgToken: '',
    setNavigate: navigate => set({ navigate: navigate }),
    setReservationId: reservationId => {
        set({ reservationId: reservationId })
        sessionStorage.setItem('reservationId', `${reservationId}`)
    },
    setPgToken: (pgToken: string) => {
        set({ pgToken: pgToken })
        sessionStorage.setItem('pgToken', pgToken)
    },
    getPgToken: () => sessionStorage.getItem('pgToken') || '',
    getReservationId: () => parseInt(sessionStorage.getItem('reservationId') || '-1'),
}))
