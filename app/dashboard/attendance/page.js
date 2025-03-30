"use client"
import GradeSelection from '@/app/_components/GradeSelection'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_componenets/AttendanceGrid'

function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade,setSelectedGrade] = useState();
  const [attendanceList,setAttendanceList] = useState();
  const onSearchHandler=()=>{
      const month = moment(selectedMonth).format('MM/YYYY');
      GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
        console.log(resp.data)
        setAttendanceList(resp.data);
      })
  }
  return (
    <div className='p-7'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)}/>
        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Grade:</label>
          <GradeSelection selectedGrade={(v)=>setSelectedGrade(v)}/>
        </div>
        <Button
          onClick={()=>onSearchHandler()} 
        >Search</Button>
      </div>
      <AttendanceGrid 
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
        />
    </div>
  )
}

export default Attendance