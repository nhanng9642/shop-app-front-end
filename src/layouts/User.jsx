import React from 'react'
import {Routes, Route} from "react-router-dom"
import { HeaderUser, FooterUser } from '../components/layout'
import { Home, ProductView, Cart } from '../pages/user'
export default function User() {
  return (
    <div>
      <HeaderUser/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product-views/:id" element={<ProductView/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <FooterUser/>
    </div>
  )
}
export {User}