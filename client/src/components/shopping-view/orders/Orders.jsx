import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// import { Table } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ShopOrderDetails from './ShopOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from '@/store/order-Slice.js/orderSlice'
import { Badge } from '@/components/ui/badge'

const Orders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orderList, orderDetails } = useSelector(state => state.shopOrder)
  console.log(orderList,orderDetails)
  // console.log(user?.id)

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetails(id))
  }

  useEffect(() => {
    if(orderDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[orderDetails])

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id))
  }, [dispatch])
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
                        <ShopOrderDetails orderDetails={orderDetails}></ShopOrderDetails>
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

export default Orders
