import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <header>Navbar</header>
      <main className='main-container'>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}
export default Layout
