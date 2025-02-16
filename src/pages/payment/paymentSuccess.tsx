import styled from 'styled-components'
import PaymentCaution from '../../components/payment/paymentCaution.tsx'
import { useNavigate } from 'react-router-dom'
import { VITE_SERVER_URL } from '../../config'
import { paymentStore } from '../../store/payment.ts'
import { userStore } from '../../store/user.ts'

const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(41, 41, 41, 0.8);
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 500;
`

function PaymentSuccess() {
    const navigate = useNavigate()
    const { getReservationId, getReservationType } = paymentStore()
    const { getToken } = userStore()

    const token = getToken()
    const reservationId = getReservationId()
    const reservationType = getReservationType()
    const onClick = () => {
        if (reservationType === 'OFFLINE') {
            fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    reservationId: reservationId,
                }),
            }).then(() => {
                navigate('/user')
            })
        }
    }

    return (
        <Layout>
            <PaymentCaution
                size={'2.4rem'}
                status={true}
                text={'결제에 성공했어요'}
                onClick={() => {
                    onClick()
                }}
            />
        </Layout>
    )
}

export default PaymentSuccess
