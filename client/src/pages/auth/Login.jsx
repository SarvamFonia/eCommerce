import From from '@/components/comman/From'
import { loginFormControls } from '@/config/config'
import { loginUser } from '@/store/auth-slice/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const initialState = {
    userName: '',
    email: '',
    password: ''
  }

  const [formData, setFromData] = useState(initialState)
const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData)).then(data=>{
      // console.log(data)
      if(data?.payload?.success){
        toast(data?.payload?.message)
        
      }else{
        toast(data?.payload?.message)
      }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center ">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In to your account</h1>
        <p className='mt-2'>Don't have an account?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>Register</Link>
        </p>
      </div>
      <From formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFromData={setFromData}
        onSubmit={onSubmit}
      ></From>
    </div>
  )
}

export default Login
