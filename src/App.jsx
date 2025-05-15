import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SignIn from './Authentication/SignIn'
import Cart from './pages/Cart'
import { ProductsData } from './api/api'
import SignUp from './Authentication/SignUp'

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