import React from 'react'
import SideNav from './_componenets/SideNav'
import Header from './_componenets/Header'
import { ToastContainer } from 'react-toastify'

function layout ({children}){
  return (
    <div>
      <div className='md:w-64 fixed hidden md:block'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header/>
      {children}
      </div>
      <ToastContainer />
    </div>
  )
}

export default layout