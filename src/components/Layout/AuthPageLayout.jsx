import React from 'react'

const AuthPageLayout = ({ children }) => {
  const bgImage =
    children.props.id === 'notfound'
      ? 'bg-notfound'
      : children.props.id === 'login'
      ? 'bg-login'
      : 'bg-register'

  return (
    <div className='flex w-full h-screen'>
      <div
        className={`hidden lg:flex items-center justify-center lg:w-1/2 h-full ${bgImage} bg-cover bg-no-repeat bg-center`}
      />
      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}
export default AuthPageLayout
