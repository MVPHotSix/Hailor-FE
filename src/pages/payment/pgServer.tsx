import PaymentSuccess from './paymentSuccess.tsx'
import PaymentFailure from './paymentFailure.tsx'
import PaymentCancel from './paymentCancel.tsx'

function PgServer() {
    const resultType = window.location.pathname.split('/')[2]
    return (
        <div>
            {resultType === 'success' && <PaymentSuccess />}
            {resultType === 'failure' && <PaymentFailure />}
            {resultType === 'cancel' && <PaymentCancel />}
        </div>
    )
}

export default PgServer
