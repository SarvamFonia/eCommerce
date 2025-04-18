import React from 'react'
import accImg from '../../assets/laptop.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/orders/Orders'
import Addresses from '@/components/shopping-view/addresses/Addresses'

const ShopAccount = () => {
  return (
    <div className='flex flex-col '>
      <div className="relative h-[350px] w-full overflow-hidden">
        <img src={accImg} className='h-full w-full object-cover object-center'></img>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='addresses'>Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <Orders />
            </TabsContent>
            <TabsContent value='addresses'>
              <Addresses />
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </div>
  )
}

export default ShopAccount
