import From from '@/components/comman/From'
import { registerFormControls } from '@/config/config'
import { registerUser } from '@/store/auth-slice/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const Register = () => {

  const initialState = {
    userName: '',
    email: '',
    password: ''
  }

  const [formData, setFromData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message)
        navigate('/auth/login')
      }else{
        toast(data?.payload?.message)
      }
    })

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center ">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already have Account.
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Sign In</Link>
        </p>
      </div>
      <From formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFromData={setFromData}
        onSubmit={onSubmit}
      ></From>
    </div>
  )
}

export default Register
