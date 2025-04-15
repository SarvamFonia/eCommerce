import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {

  const [openSidebar, setopenSidebar] = useState()
  return (
    <div className='flex min-h-screen w-full'>
        {/* Sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setopenSidebar}/>
        <div className='flex flex-1 flex-col'>
            {/* Admin header */}
            <AdminHeader setOpen={setopenSidebar} />
            <main className='flex flex-1 flex-col bg-muted/40 p-4 md:p-6'>
                <Outlet />
            </main>
        </div>
      
    </div>
  )
}

export default AdminLayout
