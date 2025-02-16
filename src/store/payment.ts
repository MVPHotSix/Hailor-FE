import { create } from 'zustand/react'

interface IPaymentStore {
    reservationId: number
    reservationType: string
    setReservationId: (reservationId: number) => void
    setReservationType: (reservationType: string) => void
    getReservationId: () => number
    getReservationType: () => string
}

export const paymentStore = create<IPaymentStore>(set => ({
    reservationId: -1,
    reservationType: '',
    setReservationType: reservationType => {
        set({ reservationType: reservationType })
        sessionStorage.setItem('reservationType', reservationType)
    },
    setReservationId: reservationId => {
        set({ reservationId: reservationId })
        sessionStorage.setItem('reservationId', `${reservationId}`)
    },
    getReservationId: () => parseInt(sessionStorage.getItem('reservationId') || '-1'),
    getReservationType: () => sessionStorage.getItem('reservationType') || '',
}))
