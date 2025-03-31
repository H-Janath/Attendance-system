import { getUniqueRecord } from '@/app/_services/services';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({attendanceList}){

  const [totalStudent,setTotalStudent] = useState(0);
  const [presentPerc,setPresentPerc] = useState(0);

  
  useEffect(() => {
      console.log(attendanceList);
  
      if (Array.isArray(attendanceList) && attendanceList.length > 0) {
          const totalSt = getUniqueRecord(attendanceList);
          setTotalStudent(totalSt.length);
          
          const today = Number(moment().format('D')); // Get the day as a number
          if (totalSt.length > 0 && today > 0) { // Prevent division by zero
              const PresentPrec = (attendanceList.length / (totalSt.length * today)) * 100;
              setPresentPerc(PresentPrec);
          } else {
              console.warn("Invalid calculation: totalSt.length or today is zero");
          }
      }
  }, [attendanceList]);
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap/>} title="Total Student" value={totalStudent}/>
      <Card icon={<TrendingUp/>} title="% Present" value={presentPerc.toFixed(1)+'%'}/>
      <Card icon={<TrendingDown/>} title="Total % Absent" value={(100-presentPerc).toFixed(1)+'%'}/>

    </div>
  )
}

export default StatusList