import styled from 'styled-components'
import { useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'

import { googleClientId, VITE_SERVER_URL } from '../../config'
import { FailureIcon, SuccessIcon } from '../icon'
import { paymentStore } from '../../store/payment.ts'
import { userStore } from '../../store/user.ts'

interface Props {
    status: boolean | null
    text: string
    onClick: () => void
    size: string
}

const Modal = styled.div`
    background-color: #fafcfe;
    padding: 2.4rem 3.2rem;
    border-radius: 1.6rem;
    min-width: 50%;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
`

const StatusImage = styled.div`
    margin: 2rem;
`

const Text = styled.span<{ size: string }>`
    font-size: ${props => props.size};
    font-weight: 600;
    text-align: center;
    white-space: pre-line;
    width: 100%;
`

function MakeMeet({ id, onClose }: { id: number; onClose: () => void }) {
    const { getToken } = userStore()
    const token = getToken()
    const onClick = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly',
        onSuccess: codeResponse => {
            console.log(codeResponse.access_token)
            fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    reservationId: id,
                    googleAuthCode: codeResponse.access_token,
                }),
            }).then(() => {
                onClose()
            })
        },
        onError: errorResponse => {
            console.log(errorResponse)
        },
    })

    return <div onClick={onClick}>구글 미팅 만들기</div>
}

function PaymentCaution({ status, text, onClick, size }: Props) {
    const { getReservationId, getReservationType } = paymentStore()
    const reservationId = getReservationId()
    const reservationType = getReservationType()
    useEffect(() => {
        if (status != true || reservationType === 'OFFLINE') {
            setTimeout(() => onClick(), 3000)
        }
    }, [status])

    return (
        <Modal>
            <ContentContainer>
                <StatusImage>
                    {status === true ? (
                        <SuccessIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    ) : status === false ? (
                        <FailureIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    ) : (
                        <PropagateLoader color={'#35376E'} loading={true} size={'2rem'} />
                    )}
                </StatusImage>
                <Text size={size}>{text}</Text>
                {status === true && reservationType === 'ONLINE' && (
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <MakeMeet id={reservationId} onClose={onClick} />
                    </GoogleOAuthProvider>
                )}
            </ContentContainer>
        </Modal>
    )
}

export default PaymentCaution
