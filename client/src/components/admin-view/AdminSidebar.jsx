import { ChartBar } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, LayoutDashboard, ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icons: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icons: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icons: <ClipboardList />
  }
]

const MenuItems = ({setOpen}) => {
  const navigate = useNavigate()
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map(menuItems => <div key={menuItems.id} onClick={() => {
        navigate(menuItems?.path)
        setOpen ? setOpen(false) : null
        }} className='flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
        {menuItems?.icons}
        <span>{menuItems?.label}</span>
      </div>)
    }
  </nav>
}

const AdminSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className="flex flex-col h-full">
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 mt-5 mb-5'>
                <ChartBar className='' size={30} />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen = {setOpen}></MenuItems>
          </div>
        </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div className='flex items-center gap-2' onClick={() => navigate('/admin/dashboard')}>
          <ChartBar className='' size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>

    </>
  )
}

export default AdminSidebar
