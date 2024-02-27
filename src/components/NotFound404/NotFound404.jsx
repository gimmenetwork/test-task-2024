import React from 'react'

import { Link } from 'react-router-dom'

import AuthPageLayout from '../Layout/AuthPageLayout'

const NotFound404 = () => {
  return (
    <AuthPageLayout>
      <section
        id='notfound'
        className='relative w-[100%] max-w-[420px] min-h-[400px] flex flex-col justify-center items-center gap-y-5 bg-white shadow-bshadow2 px-10 py-12 rounded-3xl'
      >
        <h2 className='text-3xl font-semibold'>404 Error</h2>
        <p className='font-medium text-md text-gray-400'>Page Not Found</p>

        <Link to='/' className='btn px-4 py-2 btn-accent'>
          Go back to Home
        </Link>
      </section>
    </AuthPageLayout>
  )
}

export default NotFound404
