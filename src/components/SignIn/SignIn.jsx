import React from 'react'

const SignIn = () => {
  return (
    <div className='text-3xl'>
      <div className='mt-8 flex justify-between items-center'>
        <div className=''>
          <input type='checkbox' id='remember' />
          <label htmlFor='remember' className='ml-2 font-light text-sm'>
            Remember me
          </label>
        </div>
        <button className='font-light text-sm text-accent'>
          Forgot password
        </button>
      </div>
    </div>
  )
}

export default SignIn
