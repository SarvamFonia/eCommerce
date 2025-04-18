import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/order-Slice.js/orderSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturn = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(() => { 
        // debugger
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            dispatch(capturePayment({ paymentId, payerId, orderId })).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }
    }, [paymentId, payerId])

    return (
        <><Card>
            <CardHeader>
                <CardTitle>Processing Payment ...</CardTitle>
            </CardHeader>
        </Card>
        </>
    )
}

export default PaypalReturn
