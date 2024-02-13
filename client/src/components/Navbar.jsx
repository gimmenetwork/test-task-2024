import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FaBlog } from "react-icons/fa6"

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.addEventListener('scroll', handleScroll)
        }
    })

    // navItems here
    const navItems = [
        {
            link: 'Home',
            path: '/'
        },
        {
            link: 'About',
            path: '/about'
        },
        {
            link: 'Shop',
            path: '/shop'
        },
        {
            link: 'Sell Your Book',
            path: '/admin/dashboard'
        },
        {
            link: 'Blog',
            path: '/blog'
        }
    ]

  return (
    <header>
        <nav>
            <div>
                {/*LOGO*/}
                <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block'/>Books</Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar