import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQty } from '@/store/cart-slice/cartSlice'
import { toast } from 'sonner'

const CartItemContent = ({ cartItem }) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state?.shoppingCart)
  const { productList, productDetails } = useSelector(state => state.shopProducts)

  const handleCartItemDelete = (item) => {
    // console.log(item, 'del')
    dispatch(deleteCartItem({ userId: user?.id, productId: item?.productId }))
      .then(data => {
        if (data?.payload?.success) {
          toast('Cart item deleted successfully')
        }
      })
  }
  const handleUpdateQty = (item, type) => {

    if (type === 'add') {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(i => i.productId === item.productId)
        const getCurrentProductIndex = productList.findIndex(product => product._id === item.productId)
        const getTotalStock = productList[getCurrentProductIndex].totalStock
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast(`Only ${getQuantity} quantity can be added for this item.`)
            return
          }
        }
      }
    }

    dispatch(updateCartQty({ userId: user?.id, productId: item?.productId, quantity: type === 'add' ? item?.quantity + 1 : item?.quantity - 1 }))
      .then(data => {
        if (data?.payload?.success) {
          toast('Cart item updated successfully')
        }
      })
  }
  return (
    <div className='flex items-center x-4'>
      <img src={cartItem?.image} alt={cartItem?.title} className='w-20 h-20 rounded object-cover'></img>
      <div className="flex-1">
        <h3 className='font-extrabold'>{cartItem?.title}</h3>
        <div className='flex items-center mt-1 gap-2'>
          <Button variant='outline'
            size='icon'
            className='h-8 w-8 rounded-full cursor-pointer'
            onClick={() => handleUpdateQty(cartItem, 'sub')}
            disabled={cartItem?.quantity === 1} >
            <Minus className='w-4 h-4'></Minus>
            <span className="sr-only">Decrease</span>
          </Button>

          <span className='font-semibold'>{cartItem?.quantity}</span>

          <Button variant='outline' size='icon' className='h-8 w-8 rounded-full cursor-pointer' onClick={() => handleUpdateQty(cartItem, 'add')}>
            <Plus className='w-4 h-4'></Plus>
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${((cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash className='cursor-pointer mt-1 ' size={20} onClick={() => handleCartItemDelete(cartItem)}></Trash>
      </div>
    </div>
  )
}

export default CartItemContent
