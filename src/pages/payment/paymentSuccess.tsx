import styled from 'styled-components'
import PaymentCaution from '../../components/paymentCaution.tsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { IPaymentContext } from '../../types/context.ts'
import { VITE_SERVER_URL } from '../../config'
import { userStore } from '../../store/user.ts'
import { paymentStore } from '../../store/payment.ts'

const Layout = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    background: rgba(41, 41, 41, 0.8);
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 500;
`

function PaymentSuccess() {
    const navigate = useNavigate()
    const { backStatus, closeModal } = useOutletContext<IPaymentContext>()
    const { reservationId } = paymentStore()
    const { getToken } = userStore()
    const token = getToken()

    fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay?reservationId=${reservationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            const res = data as {
                nextRedirectMobileUrl: string
                nextRedirectPcUrl: string
            }

            const info = window.navigator.userAgent
            let isMobile = false
            if (info.indexOf('iPhone') > -1 || info.indexOf('Android') > -1 || info.indexOf('iPad') > -1 || info.indexOf('iPod') > -1) {
                isMobile = true
            }
            const urlToOpen = isMobile ? res.nextRedirectMobileUrl : res.nextRedirectPcUrl
            window.location.replace(urlToOpen)
        })

    return (
        <Layout>
            <PaymentCaution
                size={'2.4rem'}
                status={true}
                text={'결제에 성공했어요'}
                onClick={() => {
                    if (backStatus === 2) {
                        closeModal()
                    }
                    navigate('/user/search')
                }}
            />
        </Layout>
    )
}

export default PaymentSuccess
