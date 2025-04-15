import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/headPhone.jpg'
import bannerTwo from '../../assets/laptop.jpg'
import bannerThree from '../../assets/mobile.jpg'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shopProducts-slice/shopProductSlice'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { useNavigate } from 'react-router-dom'


const ShopDashboard = () => {

  const slides = [bannerOne, bannerTwo, bannerThree];
  const categories = [
    { id: 'Men', label: 'Men', icon: ShirtIcon },
    { id: 'Women', label: 'Women', icon: CloudLightning },
    { id: 'Kids', label: 'Kids', icon: BabyIcon },
    { id: 'Acessories', label: 'Acessories', icon: WatchIcon },
    { id: 'Footwear', label: 'Footwear', icon: UmbrellaIcon },
  ]

  const brands = [
    { id: 'Nike', label: 'Nike', icon: ShirtIcon },
    { id: 'Adidas', label: 'Adidas', icon: ShirtIcon },
    { id: 'Puma', label: 'Puma', icon: ShirtIcon },
    { id: "Levi's", label: "Levi's", icon: ShirtIcon },
    { id: 'Zara', label: 'Zara', icon: ShirtIcon },
    { id: 'H&M', label: 'H&M', icon: ShirtIcon }
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.shopProducts)
  console.log(productList, 'products')

  const handelNavigateToListingPage = (currentitem, section) => {
    sessionStorage.removeItem('filters');
    const currFilter = {
      [section]: currentitem.id
    }

    sessionStorage.setItem('filters', JSON.stringify(currFilter))
    navigate('/shop/listing')
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000);

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])

  const [currentSlide, setCurrentSlide] = useState(0)
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide, index) => (
            <img src={slide} key={index} className={` ${index === currentSlide ? 'opacity-100 ' : 'opacity-0 '} absolute top-0 w-full left-0 h-full object-cover transition-opacity duration-1000`}></img>
          ))
        }
        <Button variant='outline' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80' onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button variant='outline' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80' onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}>
          <ChevronRightIcon></ChevronRightIcon>
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className="contaienr mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categories.map(item => <Card className='cursor-pointer hover:shadow-lg transition-shadow' onClick={() => handelNavigateToListingPage(item, 'category')}>
                <CardContent className='flex flex-col justify-center items-center p-6'>
                  <item.icon className='w-12 h-12 mb-4 text-primary'> </item.icon>
                  <span className='font-bold'>{item.label}</span>

                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12 '>
        <h2 className='text-3xl font-bold text-center mb-8'>Feature products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            productList && productList?.length > 0 ?
              productList.map(item => <ShoppingProductTile product={item}></ShoppingProductTile>)
              : null
          }
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className="contaienr mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brands.map(item => <Card className='cursor-pointer hover:shadow-lg transition-shadow' onClick={() => handelNavigateToListingPage(item, 'brand')}>
                <CardContent className='flex flex-col justify-center items-center p-6'>
                  <item.icon className='w-12 h-12 mb-4 text-primary'> </item.icon>
                  <span className='font-bold'>{item.label}</span>

                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default ShopDashboard
