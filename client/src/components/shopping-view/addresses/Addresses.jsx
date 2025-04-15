import From from '@/components/comman/From'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addressFormControls } from '@/config/config'
import { addAddress, deleteAddress, fetchAddress, updateAddress } from '@/store/address-slice/addressSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddressCard from './AddressCard'
import { toast } from 'sonner'

const initialForm = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

const Addresses = ({ currentSelectedAddress, setcurrentSelectedAddress }) => {

    const [formData, setFormData] = useState(initialForm)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.address)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    // console.log(addressList)
    const handleManageAddress = (event) => {
        event.preventDefault()
        if (addressList.length >= 3 && currentEditedId === null) {
            toast('Max 3 address can be added')
            setFormData(initialForm)
            return;
        }

        currentEditedId !== null ?
            dispatch(updateAddress({ userId: user.id, addressId: currentEditedId, formData }))
                .then(data => {
                    if (data?.payload?.success) {
                        dispatch(fetchAddress(user.id))
                        setCurrentEditedId(null)
                        setFormData(initialForm)
                        toast('Address updated successfully.')
                    }
                })
            : dispatch(addAddress({
                ...formData,
                userId: user?.id
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAddress(user?.id))
                    setFormData(initialForm)
                    toast('Address added successfully.')
                }
            })
    }

    const isFormValid = () => {
        return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
    }

    const handleEditAddress = (addressInfo) => {
        setCurrentEditedId(addressInfo?._id)
        setFormData({
            ...formData,
            address: addressInfo?.address,
            city: addressInfo?.city,
            phone: addressInfo?.phone,
            pincode: addressInfo?.pincode,
            notes: addressInfo?.notes
        })
    }

    const handleDeleteAddress = (addressInfo) => {
        dispatch(deleteAddress({ userId: user.id, addressId: addressInfo?._id }))
            .then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAddress(user?.id))
                    // setFormData(initialForm)
                    toast('Address deleted successfully')
                }
            })
    }

    useEffect(() => {
        dispatch(fetchAddress(user?.id))
    }, [dispatch])

    // console.log(formData)

    return (
        <Card>
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2'>
                {
                    addressList && addressList?.length > 0 ?
                        addressList.map(item => <AddressCard addressInfo={item}
                            handleDeleteAddress={handleDeleteAddress}
                            handleEditAddress={handleEditAddress}
                            currentSelectedAddress={currentSelectedAddress}
                            setcurrentSelectedAddress={setcurrentSelectedAddress}
                        />)
                        : null
                }
            </div>

            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ? 'Edit Address' : 'Add new Address'
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <From formControls={addressFormControls}
                    formData={formData}
                    setFromData={setFormData}
                    onSubmit={handleManageAddress}
                    buttonText={
                        currentEditedId !== null ? 'Edit' : 'Add'
                    }
                    isBtnDisabled={!isFormValid()}></From>
            </CardContent>
        </Card>
    )
}

export default Addresses
