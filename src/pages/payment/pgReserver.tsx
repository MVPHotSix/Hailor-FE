import { useNavigate, useSearchParams } from 'react-router-dom'
import { paymentStore } from '../../store/payment.ts'
import { VITE_SERVER_URL } from '../../config'
import { userStore } from '../../store/user.ts'
import PaymentSuccess from './paymentSuccess.tsx'

function PgReserver() {
    console.log(window.location.href)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { getReservationId, setPgToken } = paymentStore()
    const { getToken } = userStore()
    const token = getToken()
    const reservationId = getReservationId()
    const pg_token = searchParams.get('pg_token')

    if (pg_token) {
        setPgToken(pg_token)
        fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay/confirm?reservationId=${reservationId}&token=${pg_token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            navigate('user/payment/success')
        })
    }
    return (
        <div>
            <PaymentSuccess />
        </div>
    )
}

export default PgReserver
