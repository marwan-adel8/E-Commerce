import React from 'react'
import Banner from '../pages/Banner'
import Products from '../pages/Products'
import CategorySection from '../pages/CategorySection'
import PromoSection from '../pages/PromoSection'
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <Banner />
      <Products />
      <CategorySection/>
      <PromoSection/>
    </div>
  )
}

export default Home