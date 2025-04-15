
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminOrders from './pages/admin-view/AdminOrders'
import ShopLayout from './components/shopping-view/ShopLayout'
import FileNotFound from './pages/FileNotFound/FileNotFound'
import ShopDashboard from './pages/shopping-view/ShopDashboard'
import ShopAccount from './pages/shopping-view/ShopAccount'
import ShopCheckout from './pages/shopping-view/ShopCheckout'
import ShopListing from './pages/shopping-view/ShopListing'
import CheckAuth from './components/comman/CheckAuth'
import UnauthPage from './pages/unauth-page/UnauthPage'
import { Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice/authSlice'
import PaypalReturn from './pages/shopping-view/paypalReturn/PaypalReturn'
import PaymentSuccess from './pages/shopping-view/PaymentSuccess'


function App() {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // console.log(user,isAuthenticated)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <div className='flex flex-col overflow-x-hidden bg-white'>
        <h1>Header component</h1>

        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <Layout />
            </CheckAuth>
          }>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Route>
          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='products' element={<AdminProducts />}></Route>
            <Route path='orders' element={<AdminOrders />}></Route>
          </Route>
          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <ShopLayout />
            </CheckAuth>
          }>
            <Route path='home' element={<ShopDashboard />}></Route>
            <Route path='account' element={<ShopAccount />}></Route>
            <Route path='checkout' element={<ShopCheckout />}></Route>
            <Route path='listing' element={<ShopListing />}></Route>
            <Route path='paypal-return' element={<PaypalReturn />}></Route>
            <Route path='payment-success' element={<PaymentSuccess />} ></Route>
          </Route>
          <Route path='/unauth-page' element={<UnauthPage />}></Route>
          <Route path='*' element={<FileNotFound />}></Route>
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App
