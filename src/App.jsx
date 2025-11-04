import React from 'react'
import {ToastContainer} from "react-toastify";
import {Route , Routes} from "react-router-dom"
import Home from './Pages/Home';
import MyList from './Pages/MyList';
import Details from './Pages/Details';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import { ProductProvider } from './context/ProductContext/ProductProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <ToastContainer/>
          <Routes>
            <Route path='/' element ={< Home/>} />
            <Route path='/details' element = { <Details/> }/> 
            <Route path='/my-ads' element={ < MyList/>} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}

export default App