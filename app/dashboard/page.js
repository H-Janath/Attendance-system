"use client"
import React, { useEffect } from 'react'
import { useTheme } from "next-themes"
function Dashboard (){
  const {setTheme} = useTheme();

  useEffect(()=>{
    setTheme('light')
  },[])
  return (
    <div>page</div>
  )
}

export default Dashboard