import { House, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice/authSlice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/cart-slice/cartSlice'

const MenuItems = () => {
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>
    {
      shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path} >{menuItem.label}</Link>)
    }
  </nav>
}

const HeaderRightContent = ({ handleLogout }) => {

  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state?.shoppingCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  return <div className=' lg:items-center lg:flex-row flex-col gap-4 hidden lg:flex'>
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)} >
      <Button variant='outline' size='icon' onClick={() => setOpenCartSheet(true)}>
        <ShoppingCart className='w-6 h-6' />
        <span className='sr-only'>User cart</span>
      </Button>
      <CartWrapper cartItems={cartItems && cartItems?.items?.length > 0 ? cartItems?.items : []} setOpenCartSheet={setOpenCartSheet}></CartWrapper>
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className='bg-black text-white font-extrabold cursor-pointer'>{user?.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56'>
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem onClick={() => navigate('/shop/account')}>
          <UserCog className='mr-2 h-4 w-4'></UserCog>
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4'  ></LogOut>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
}

const ShopHeader = () => {

  const { isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutUser({})).then(data => {
    })
  }


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 px-4 md:px-6 justify-between items-center">
        <Link to='/shop/home' className='flex items-center gap-2'>
          <House className='h-6 w-6' />
          <span className='font-bold'>Ecommerce </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs p-6 flex flex-col justify-between'>

            <MenuItems></MenuItems>
            <div className='flex flex-col border-t pt-3'>
              <div onClick={() => navigate('/shop/account')} className='cursor-pointer flex w-full'>
                <UserCog className='mr-2 h-6 w-6 mb-2'></UserCog>
                Account
              </div>
              <div onClick={handleLogout} className='cursor-pointer flex w-full py-2'>
                <LogOut className='mr-2 h-6 w-6 '  ></LogOut>
                Logout
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <HeaderRightContent handleLogout={handleLogout}></HeaderRightContent>

      </div>

    </header>
  )
}

export default ShopHeader
