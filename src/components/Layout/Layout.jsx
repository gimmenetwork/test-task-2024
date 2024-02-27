import React from 'react'

const AuthPageLayout = ({ children }) => {
  return (
    <div className='layout'>
      <header>Navbar</header>
      <main className='main-container'>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}
export default AuthPageLayout
