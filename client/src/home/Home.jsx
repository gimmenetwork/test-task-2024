import React from 'react'
import Banner from '../components/Banner'
import BestSellerBooks from './BestSellerBooks'
import FavBook from './FavBook'

export const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellerBooks />
      <FavBook />
    </div>
  )
}

export default Home