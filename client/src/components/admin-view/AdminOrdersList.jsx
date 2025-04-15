import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import AdminOrderDetailsModal from './AdminOrderDetailsModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/adminOrders-slice/adminOrderSlice'
import { Badge } from '../ui/badge'

const AdminOrdersList = () => {

    const { orderList, orderDetails } = useSelector(state => state.adminOrder)
    console.log(orderList, orderDetails)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()

    const handleFetchOrderDetails = (id) => {
        dispatch(getOrderDetailsForAdmin(id))
    }

    useEffect(() => {
        dispatch(getAllOrdersForAdmin())
    }, [dispatch])

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className='sr-only'>Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            orderList && orderList?.length > 0 ?
                                orderList.map(orderItem => <TableRow>
                                    <TableCell>{orderItem?._id}</TableCell>
                                    <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-600' : 'bg-black'}`}>
                                            {orderItem?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${orderItem?.totalAmmount}</TableCell>
                                    <TableCell>

                                        <Dialog open={openDetailsDialog} onOpenChange={() => {
                                            setOpenDetailsDialog(false)
                                            dispatch(resetOrderDetails())
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <AdminOrderDetailsModal orderDetails={orderDetails} />
                                            </DialogContent>

                                        </Dialog>
                                    </TableCell>
                                </TableRow>) :
                                null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersList
