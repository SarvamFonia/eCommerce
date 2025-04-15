import CategoryFilter from '@/components/shopping-view/CategoryFilter'
import ProductDetailsModal from '@/components/shopping-view/ProductDetailsModal'
// import ProductDetailsModal from '@/components/shopping-view/productDetailsModal'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config/config'
import { addToCart, fetchCartItems } from '@/store/cart-slice/cartSlice'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shopProducts-slice/shopProductSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const ShopListing = () => {

  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state?.shoppingCart)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  // console.log(productList,'productsList')
  // console.log(filters)
  // console.log(productDetails, 'productDetails')
  console.log('cartItems', cartItems)
  const handelSort = (value) => {
    setSort(value)
  }

  const handelFilter = (getSectionId, getCurrentOption) => {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters };

      if (!newFilters[getSectionId]) {
        newFilters[getSectionId] = [getCurrentOption];
      } else {
        const indexOfCurrentOption = newFilters[getSectionId].indexOf(getCurrentOption);

        if (indexOfCurrentOption === -1) {
          newFilters[getSectionId] = [...newFilters[getSectionId], getCurrentOption];
        } else {
          newFilters[getSectionId] = newFilters[getSectionId].filter(item => item !== getCurrentOption);
        }
      }

      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  };


  const createSearchParamsHelper = (filterParams) => {
    const queryParams = []
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramsValue = value.join(',')
        queryParams.push(`${key} = ${encodeURIComponent(paramsValue)}`)
      }
    }
    return queryParams.join('&')
  }

  const handleGetProductDetails = (productId) => {
    // console.log(productId)
    dispatch(fetchProductDetails(productId))
  }

  const handelAddToCart = (productId, getTotalStock) => {
    // debugger
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
    // console.log(productId,'cartProductId')
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast('Product is added to cart')
      }
    })
  }

  useEffect(() => {
    // debugger;
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })).then(data => {
      })
  }, [dispatch, sort, filters])

  useEffect(() => {
    setSort("price=lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  // console.log(filters, 'filter')
  useEffect(() => {
    // debugger
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(queryString))
    }
  }, [filters])

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <CategoryFilter filters={filters} handelFilter={handelFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className='text-lg font-extrabold '>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground '>10 Products found</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDownIcon className='h-4 w-4'></ArrowUpDownIcon>
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handelSort}>
                  {
                    sortOptions.map(item => <DropdownMenuRadioItem key={item?.id} value={item?.id}>
                      {item?.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {
            productList && productList.length > 0 ?
              productList.map(item => <ShoppingProductTile productItem={item} handleGetProductDetails={handleGetProductDetails} handelAddToCart={handelAddToCart} ></ShoppingProductTile>) :
              []
          }
        </div>
      </div>
      <ProductDetailsModal
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails} />
    </div>
  )
}

export default ShopListing
