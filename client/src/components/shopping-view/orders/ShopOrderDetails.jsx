import React, { useState } from 'react'

import From from '@/components/comman/From'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useSelector } from 'react-redux'


const ShopOrderDetails = ({ orderDetails }) => {
    const initForm = {
        status: ''
    }

    const {user} = useSelector(state => state.auth)

    const [formData, setFormData] = useState(initForm)

    // const handleUpdateStatus = (event) => {
    //     event.preventDefault()
    // }
    return (
        <div className='sm:max-w-[600px]'>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className='font-medium'>Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='font-medium'>Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='font-medium'>Order status</p>
                        <Label>
                            <Badge className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-600' : 'bg-black'}`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='font-medium'>Order price</p>
                        <Label>${orderDetails?.totalAmmount}</Label>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='font-medium'>Payment method</p>
                        <Label>{orderDetails?.paymentMethods}</Label>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='font-medium'>Paymant Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                </div>
                <Separator></Separator>
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems?.length> 0 ?
                                orderDetails?.cartItems.map(item => <li className='flex items-center justify-between'>
                                    <span>{item.title}</span>
                                    <span> {item.quantity} X ${item.price}</span>
                                </li>) :
                                null
                            }
                            
                        </ul>
                    </div>
                </div>
                <Separator></Separator>
                <div className="grid gap-4">
                    <div className='grid gap-2'>
                        <div className='font-medium'>Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>Name : {user.userName}</span>
                            <span>Address : {orderDetails?.addressInfo?.address}</span>
                            <span>city : {orderDetails?.addressInfo?.city}</span>
                            <span>Pincode : {orderDetails?.addressInfo?.pincode}</span>
                            <span>Phone : {orderDetails?.addressInfo?.phone}</span>
                            <span>Description : {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <Separator></Separator>
                {/* <div>
                    <From formControls={[
                        {
                            label: 'Order Status',
                            name: 'status',
                            componentType: 'select',
                            options: [
                                { id: 'pending', label: 'Pending' },
                                { id: 'inProcess', label: 'In process' },
                                { id: 'inShipping', label: 'In shipping' },
                                { id: 'rejected', label: 'Rejected' },
                                { id: 'delivered', label: 'Delivered' },

                            ]
                        }
                    ]}
                        formData={formData}
                        setFromData={setFormData}
                        buttonText={'Update Order Status'}
                        onSubmit={handleUpdateStatus}
                    ></From>
                </div> */}
            </div>
        </div>
    )
}

export default ShopOrderDetails
