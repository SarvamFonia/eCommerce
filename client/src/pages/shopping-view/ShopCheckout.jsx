import React, { useState } from 'react'
import accImg from '../../assets/laptop.jpg'
import Addresses from '@/components/shopping-view/addresses/Addresses'
import { useDispatch, useSelector } from 'react-redux'
import CartItemContent from '@/components/shopping-view/CartItemContent'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/order-Slice.js/orderSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ShopCheckout = () => {
  const { cartItems } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state => state.auth)
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null)
  const [isPaymentStarted, setIsPaymentStarted] = useState(false)
  const { approval_url } = useSelector(state => state.shopOrder)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const totalCartAmmount = cartItems && cartItems?.items && cartItems?.items?.length > 0 ?
    cartItems.items.reduce((sum, item) => sum + (
      item?.salePrice > 0 ? item?.salePrice : item?.price
    ) * item?.quantity, 0)
    : 0;


  const handleInitiatePaypalPayment = () => {

    if(cartItems?.items?.length === 0){
      toast('Your Cart is empty please add items to continue')
    }

if(currentSelectedAddress === null){
  toast('Please select address to proceed')
  return
}
    
    const orderData = {
      userId: user.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(item => ({
        productId: item?.productId,
        image: item?.image,
        title: item?.title,
        price: item?.salePrice > 0 ? item?.salePrice : item.price,
        quantity: item?.quantity

      })),
      payerId: '',
      paymentId: '',
      orderUpdateDate: new Date(),
      orderDate: new Date(),
      totalAmmount: totalCartAmmount,
      paymentStatus: 'pending',
      paymentMethods: 'paypal',
      orderStatus: 'pending',
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      }
    }

    console.log(orderData, 'orderData')

    dispatch(createNewOrder(orderData)).then(data => {
      if (data?.payload?.success) {
        setIsPaymentStarted(true)
      } else {
        setIsPaymentStarted(false)
      }
      console.log(approval_url, "approval_url")
      // navigate(approval_url)
    });
  };

  // if(approval_url) 
  // {
  //   <Navigate to={approval_url} />
  // }
  if (approval_url) window.location.href = approval_url

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accImg} className='h-full w-full object-cover object-center'></img>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2  mt-5 p-5 gap-5'>
        <Addresses currentSelectedAddress={currentSelectedAddress} setcurrentSelectedAddress={setcurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          <h1 className='font-bold text-xl '>Products</h1>
          {
            cartItems && cartItems?.items && cartItems?.items?.length > 0 ?
              cartItems.items.map(item => <CartItemContent cartItem={item} />)
              : null
          }

          <div className="mt-5 space-y-4">
            <div className="flex justify-end">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmmount}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button onClick={handleInitiatePaypalPayment} className='w-full'>Checkout with paypal</Button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ShopCheckout
