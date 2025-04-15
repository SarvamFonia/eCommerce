import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemContent from './CartItemContent'
import { useNavigate } from 'react-router-dom'

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {

  const navigate = useNavigate()

  const totalCartAmmount = cartItems && cartItems?.length > 0 ?
    cartItems.reduce((sum, item) => sum + (
      item?.salePrice > 0 ? item?.salePrice : item?.price
    ) * item?.quantity, 0)
    : 0

  return (
    <SheetContent className='sm:max-w-md '>
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {
          cartItems && cartItems.length > 0 ?
            cartItems.map(item => <CartItemContent cartItem={item} />) :
            null
        }
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex justify-baseline">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmmount}</span>
        </div>
      </div>
      <Button className='w-full mt-6'
        onClick={() => {
          navigate('/shop/checkout')
          setOpenCartSheet(false)
        }}>Checkout</Button>
    </SheetContent>
  )
}

export default CartWrapper
