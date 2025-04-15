import AdminProductTile from '@/components/admin-view/AdminProductTile'
import ImageUpload from '@/components/admin-view/ImageUpload'
import From from '@/components/comman/From'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config/config'
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from '@/store/products-slice/productsSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const AdminProducts = () => {
  const initFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''
  }
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFromData] = useState(initFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const { productList } = useSelector(state => state?.adminProducts)
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState(null)


  const dispatch = useDispatch()

  const isValidForm = () => {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    toast(currentSelectedId !== null ? 'Editing product . . .' : 'Adding product . . .')

    currentSelectedId !== null ?
      dispatch(editProduct({
        id: currentSelectedId,
        formData
      })).then(data => {
        console.log(data)
        if (data?.payload?.success) {
          setImageFile(null)
          setFromData(initFormData)
          dispatch(fetchAllProduct())
          toast('Product editted successfully.')
          setOpenCreateProductsDialog(false)
          setCurrentSelectedId(null)

        }
      }) :
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then(data => {
        console.log(data)
        if (data?.payload?.success) {
          setImageFile(null)
          setFromData(initFormData)
          dispatch(fetchAllProduct())
          toast('Product added successfully.')
          setOpenCreateProductsDialog(false)
        }
      })

  }

  const handelDelete = (productId) => {
    // debugger
    dispatch(deleteProduct(productId)).then(data => {
      if(data?.payload?.success){
        dispatch(fetchAllProduct());
        toast('Product deleted successfully.');
      }
    }).catch(err => {
      console.log(err);
      toast('Something went wrong');
    })
  }

  useEffect(() => {
    console.log('product list', productList)
    dispatch(fetchAllProduct())
  }, [dispatch])

  return (
    <>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => {
          setOpenCreateProductsDialog(true);
          setCurrentSelectedId(null);
          setFromData(initFormData)
        }} >Add new product</Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => 
            <AdminProductTile product={productItem} 
              setFromData={setFromData} 
              setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
              setCurrentSelectedId={setCurrentSelectedId}
              handelDelete = {handelDelete}
              ></AdminProductTile>) :
            null
        }
      </div>


      <Sheet open={openCreateProductsDialog} onOpenChange={() => { setOpenCreateProductsDialog(false) }} >
        <SheetContent side='right' className='overflow-auto'>
          <div className="px-4 py-4">
            <SheetHeader>
              <SheetTitle>
                {
                  currentSelectedId !== null ?
                    'Edit product' :
                    'Add new product'
                }
              </SheetTitle>
            </SheetHeader>

            <ImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} isEditMode={currentSelectedId !== null}></ImageUpload>

            <div className='py-6'>
              <From formControls={addProductFormElements}
                formData={formData}
                setFromData={setFromData}
                buttonText={currentSelectedId !== null ? 'Edit product' : 'Add product'}
                onSubmit={onSubmit}
                isBtnDisabled = {!isValidForm()}
              ></From>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
