import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/cart-slice/cartSlice'
import { toast } from 'sonner'
import { setProductDetails } from '@/store/shopProducts-slice/shopProductSlice'

const ProductDetailsModal = ({ open, setOpen, productDetails }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state?.shoppingCart)

    const handelAddToCart = (productId, getTotalStock) => {
        // debugger;
        // console.log(productId, 'cartProductId')
        let getCartItems = cartItems.items || [];
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === productId)
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast(`Only ${getQuantity} quantity can be added for this item.`)
                    return
                }
            }
        }


        dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                setOpen(false)
                toast('Product is added to cart')
            }
        })
    }

    const handleModalClose = () => {
        setOpen(false)
        dispatch(setProductDetails())
    }

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                <div className="relative overflow-hidden rounded-lg ">
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover'></img>
                </div>
                <div className=' '>
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>

                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`${productDetails?.salePrice > 0 ? 'line-through ' : ''} text-3xl font-bold text-primary `}>${productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>{productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <StarIcon className='w-5 h-5 fill-primary' />
                        <span className='text-muted-foreground'>(4.5)</span>
                    </div>

                    <div className='mt-5 w-full'>

                        {
                            productDetails?.totalStock === 0 ?
                                <Button className='w-full mb-5 opacity-60 cursor-not-allowed' >Out of stock</Button> :
                                <Button className='w-full mb-5 cursor-pointer' onClick={() => handelAddToCart(productDetails?._id, productDetails?.totalStock)}>Add to cart</Button>
                        }
                        {/* <Button className='w-full mb-5 cursor-pointer' onClick={() => handelAddToCart(productDetails?._id)}>
                            Add to cart
                        </Button> */}
                        <Separator />
                    </div>
                    <div className='max-h-[150px] overflow-auto '>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grip gap-6'>
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>SF</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1 mb-4'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sarvam Fonia</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground'>Awsome product</p>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-6 gap-2 flex mb-2">
                            <Input placeholder='Write a review ...'></Input>
                            <Button>Submit</Button>
                        </div>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsModal
