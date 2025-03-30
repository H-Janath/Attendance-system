import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = useState([]);
    const [colDef, setColDef] = useState([
        { field: 'studentId', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
    ]);

    // calculate days in the selected month
    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const year = moment(selectedMonth).year();
    const month = moment(selectedMonth).month() + 1;
    const numberOfDays = daysInMonth(year, month);
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    useEffect(() => {
        if(attendanceList){
            const userList = getUniqueRecord();
            setRowData(userList);
            daysArray.forEach((date)=>{
                setColDef(prevData=>[...prevData,{
                    field:date.toString(),width:50,editable:true
                }])
                userList.forEach(obj=>{
                    obj[date] = isPresent(obj.studentId,date);
                })
            })

        }
       
        
    }, [attendanceList, selectedMonth]);

    const isPresent=(studentId,day)=>{
        const result = attendanceList.find(item=>item.day===day&&item.studentId===studentId);
        return result?true:false;
    }
    console.log(attendanceList)
    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();

        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });

        return uniqueRecord;
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <h2>Users</h2>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDef}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    );
}

export default AttendanceGrid;
