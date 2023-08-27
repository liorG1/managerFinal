import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ChakraProvider ,Flex} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { createBrowserRouter,Route,createRoutesFromElements ,RouterProvider} from 'react-router-dom'
import Links from './components/Links'
import AllProducts from './Products/getAllProducts'
import Login from './components/login'
import Registrate from './components/registrate'
import AddProduct from './Products/addProduct'
import AllOrders from '../src/orders/orders'

import DoneOrders from '../src/orders/DoneOrders'
import ProgressOrders from './orders/ProgressOrders'
import OrderExample from './orders/orderExample'
import AllProductsClient from './Products/allProductsClient'
import ProductById from './Products/ProductById'
import AllUsers from './users/allUsers'




function App() {
const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<Links/>}>
      <Route  path='allProducts' element={<AllProducts/>}></Route>
      <Route  path='/allUsers' element={<AllUsers/>}></Route>
      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/registrate' element={<Registrate/>}></Route>
      <Route path='/addProduct' element={<AddProduct/>}></Route>
      <Route path='/orders/all' element={<AllOrders/>}></Route>
      <Route path='/orders/done' element={<DoneOrders/>}></Route>
      <Route path='/orders/progress' element={<ProgressOrders/>}></Route>
      <Route path='/orders/example/:id' element={<OrderExample />}/>
      <Route path='products/all' element={<AllProductsClient/>}/>
      <Route path='/products/byId/:id' element={<ProductById/>}/>
    </Route>
    <Route path='/user' element={<div>user page</div>}/>
    </>
  )
)

  return (
    <ChakraProvider >
    
     <RouterProvider router={router}>   
    </RouterProvider> 
    </ChakraProvider>
   
  )
}

export default App
