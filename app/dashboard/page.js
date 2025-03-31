"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import MonthSelection from '../_components/MonthSelection';
import GradeSelection from '../_components/GradeSelection';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment';
import StatusList from './_componenets/StatusList';
function Dashboard (){
  const {setTheme} = useTheme();
  const [selectedMonth,setSelectedMonth] = useState();
  const [selectedGrade,setSelectedGrade] = useState();
  const [attendanceList,setAtendanceList] = useState([])
  useEffect(()=>{
    setTheme('light')
    getStudentAttendance();
  },[selectedMonth,selectedGrade])

  const getStudentAttendance=()=>{
    GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
    .then(resp=>{
      setAtendanceList(resp.data)
    })
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth}/>
          <GradeSelection selectedGrade={setSelectedGrade}/>
        </div>

      </div>
      <StatusList attendanceList={attendanceList}/>
      
    </div>
  )
}

export default Dashboard