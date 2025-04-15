import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, currentSelectedAddress, setcurrentSelectedAddress }) => {
  return (
    <Card onClick={
      setcurrentSelectedAddress ?  
      () => setcurrentSelectedAddress(addressInfo) :
      null}>
      <CardContent className='grid gap-4 p-4'>
        <label >Address: {addressInfo?.address}</label>
        <label >City: {addressInfo?.city}</label>
        <label >Pincode: {addressInfo?.pincode}</label>
        <label >Phone: {addressInfo?.phone}</label>
        <label >Notes: {addressInfo?.notes}</label>
      </CardContent>
      <CardFooter className='flex justify-between p-3'>
        <Button variant='outline' onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard
