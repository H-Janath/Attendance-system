"use client"
import React, { useEffect, useState } from 'react'
import AddNewStudent from './_componenets/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_componenets/StudentListTable';

function Student(){

  const [studentList, setStudentLis] = useState([]);
  
  useEffect(()=>{
    GetAllStudents()
  },[])
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudent().then(resp=>{
      setStudentLis(resp.data)
    })
  }

  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between items-center'>Students
      <AddNewStudent/>
      </h2>
      <StudentListTable studentList={studentList}/>
    </div>
  )
}

export default Student