import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider  } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SignIn from './Authentication/SignIn'
import Cart from './pages/Cart'
import { ProductsData } from './api/api'
import SignUp from './Authentication/SignUp'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import AllProducts from './pages/AllProducts'
import ProductDetails from './pages/ProductDetails';


const Layout = () =>{
return(
<>
<Header />
<Outlet />
<Footer />

</>
)
}

const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      {/*Layout */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader ={ProductsData}></Route>
        <Route path='/cart' element={<Cart />}></Route>
         <Route path="/Shoppage" element={<ShopPage />}></Route>
<Route path="/product" element={<ProductPage />} />
          <Route path="/shop" element={<AllProducts />}></Route>
<Route path="/product/:id" element={<ProductDetails />} />



      </Route>
      <Route path='/reg'  element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>



    </Route>
));





return (
  <div>
    <RouterProvider router={router}/>
  </div>
)
};

export default App;