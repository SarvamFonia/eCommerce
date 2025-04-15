import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ShoppingProductTile = ({ productItem, handleGetProductDetails, handelAddToCart }) => {
    // console.log(productItem)
    return (
        <Card className='w-full max-w-sm mx-auto p-0 gap-0'>
            <div onClick={() => handleGetProductDetails(productItem?._id)}>
                <div className='relative'>
                    <img src={productItem?.image} alt={productItem?.title} className='w-full h-[300px] object-cover rounded-t-lg'></img>
                    {
                        productItem?.salePrice ?
                            <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> :
                            null
                    }
                    <CardContent className='p-4 pb-2 '>
                        <h2 className='text-xl font-bold mb-2'>{productItem?.title}</h2>
                        <span className='text-sm text-muted-foreground'>{
                            productItem?.totalStock === 0 ? 'Out Of Stock' :  productItem?.totalStock < 11 ? `Only ${productItem?.totalStock} items left ` : ''
                        }</span>
                        <div className='flex justify-between items-center mb-2'>
                            <span className=' text-sm text-muted-foreground'>{productItem?.category}</span>
                            <span className=' text-sm text-muted-foreground'>{productItem?.brand}</span>
                        </div>

                        <div className='flex justify-between items-center mb-2'>
                            <span className={` ${productItem?.salePrice > 0 ? 'line-through ' : ''} text-lg font-semibold text-primary`}>{productItem?.price}</span>
                            {
                                productItem?.salePrice > 0
                                    ? <span className=' text-lg font-semibold text-primary'>${productItem?.salePrice}</span>
                                    : null
                            }

                        </div>
                    </CardContent>

                </div>

            </div>
            <CardFooter>

                {
                    productItem?.totalStock === 0 ? 
                    <Button className='w-full mb-4 opacity-60 cursor-not-allowed' >Out of stock</Button> :
                    <Button className='w-full mb-4' onClick={() => handelAddToCart(productItem?._id, productItem?.totalStock)}>Add to cart</Button>
                }
                
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile
